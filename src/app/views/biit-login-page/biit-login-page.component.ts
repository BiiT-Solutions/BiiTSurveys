import {Component, OnInit} from '@angular/core';
import {BiitLogin} from "@biit-solutions/wizardry-theme/models";
import {Constants} from "../../shared/constants";
import {HttpResponse} from "@angular/common/http";
import {
  BiitProgressBarType,
  BiitSnackbarHorizontalPosition,
  BiitSnackbarService,
  BiitSnackbarVerticalPosition,
  NotificationType
} from "@biit-solutions/wizardry-theme/info";
import {TRANSLOCO_SCOPE, TranslocoService} from "@ngneat/transloco";
import {BiitIconService} from "@biit-solutions/wizardry-theme/icon";
import {completeIconSet} from "@biit-solutions/biit-icons-collection";
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LoginRequest, User} from "@biit-solutions/authorization-services";
import {AuthService} from "@biit-solutions/kafka-event-structure"
import {UserService, SignupRequestConverter, TeamService} from "@biit-solutions/user-manager-structure";
import {ErrorHandler} from "@biit-solutions/wizardry-theme/utils";
import {BiitLoginServiceSupport, SignUpRequest} from "@biit-solutions/wizardry-theme/login";
import {Environment} from "../../../environments/environment";
import {ItemMap} from "../../models/item-map";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'biit-login-page',
  templateUrl: './biit-login-page.component.html',
  styleUrls: ['./biit-login-page.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      multi:true,
      useValue: {scope: 'components/login', alias: 'errors'}
    }
  ]
})
export class BiitLoginPageComponent implements OnInit, BiitLoginServiceSupport {

  protected readonly BiitProgressBarType = BiitProgressBarType;
  protected waiting: boolean = true;
  protected teams: ItemMap[] = [];
  protected organization: string;

  constructor(private authService: AuthService,
              private sessionService: SessionService,
              private biitSnackbarService: BiitSnackbarService,
              private userService: UserService,
              biitIconService: BiitIconService,
              private activateRoute: ActivatedRoute,
              private teamService: TeamService,
              private router: Router,
              private translocoService: TranslocoService) {
    biitIconService.registerIcons(completeIconSet);
    biitSnackbarService.setPosition(BiitSnackbarVerticalPosition.TOP, BiitSnackbarHorizontalPosition.CENTER);
  }

  ngOnInit(): void {
    this.managePathQueries();
    if (!SessionService.isTokenExpired()) {
      this.router.navigate([Constants.PATHS.NCA]);
    } else {
      this.waiting = false;
    }
    this.loadTeams();
  }

  login(login: BiitLogin): void {
    this.waiting = true;
    this.authService.login(new LoginRequest(login.username, login.password)).subscribe({
      next: (response: HttpResponse<User>) => {
        const user: User = User.clone(response.body);
        if (!this.canAccess(user)) {
          this.waiting = false;
          this.translocoService.selectTranslate('access_denied_permissions').subscribe(msg => {
            this.biitSnackbarService.showNotification(msg, NotificationType.ERROR, null, 10);
          });
          return;
        }
        const token: string = response.headers.get(Constants.HEADERS.AUTHORIZATION_RESPONSE);
        const expiration: number = +response.headers.get(Constants.HEADERS.EXPIRES);
        this.sessionService.setToken(token, expiration, login.remember, true);
        this.sessionService.setUser(user);

        this.activateRoute.queryParams.subscribe(params => {
          if (params[Constants.PATHS.QUERY.REDIRECT] !== undefined) {
            const routerLink = params[Constants.PATHS.QUERY.REDIRECT];
            this.router.navigate([routerLink]);
          } else {
            this.router.navigate([Constants.PATHS.NCA]);
          }
        });

        this.waiting = false;
      },
      error: (response: HttpResponse<void>) => {
        const error: string = response.status.toString();
        // Transloco does not load translation files. We need to load it manually;
        this.translocoService.selectTranslate(error, {},  {scope: 'components/login'}).subscribe(msg => {
          this.biitSnackbarService.showNotification(msg, NotificationType.ERROR, null, 5);
        });
        this.waiting = false;
      }
    });
  }

  private async loadTeams(): Promise<void> {
    const params: Params = await firstValueFrom(this.activateRoute.queryParams);
    this.organization = params['organization'];

    if (!Environment.SIGNUP_HIDE_TEAM && this.organization) {
      this.teamService.getAllByOrganizationPublic(this.organization).subscribe({
        next: (teams: string[]) => {
          this.teams = teams.map(team => new ItemMap(team, team));
        },
        error: error => console.error(error)
      });
    }
  }

  private canAccess(user: User): boolean {
    return user.applicationRoles && user.applicationRoles.some(value => value.startsWith(Constants.APP.APP_PERMISSION_NAME));
  }

  private managePathQueries(): void {
    this.activateRoute.queryParams.subscribe(params => {
      const queryParams: {[key: string]: string} = {};
      if (params[Constants.PATHS.QUERY.EXPIRED] !== undefined) {
        this.translocoService.selectTranslate(Constants.PATHS.QUERY.EXPIRED, {},  {scope: 'components/login'}).subscribe(msg => {
          this.biitSnackbarService.showNotification(msg, NotificationType.INFO, null, 5);
        });
        queryParams[Constants.PATHS.QUERY.EXPIRED] = null;
      }
      if (params[Constants.PATHS.QUERY.LOGOUT] !== undefined) {
        this.sessionService.clearToken();
        this.translocoService.selectTranslate(Constants.PATHS.QUERY.LOGOUT, {},  {scope: 'components/login'}).subscribe(msg => {
          this.biitSnackbarService.showNotification(msg, NotificationType.SUCCESS, null, 5);
        });
        queryParams[Constants.PATHS.QUERY.LOGOUT] = null;
      }
      this.router.navigate([], {queryParams: queryParams, queryParamsHandling: 'merge'});
    });
  }

  protected onResetPassword(email: string) {
    this.userService.resetPassword(email).subscribe({
      next: () => {
        this.translocoService.selectTranslate('success', {},  {scope: 'biit-ui/login'}).subscribe(msg => {
          this.biitSnackbarService.showNotification(msg, NotificationType.SUCCESS, null, 5);
        });
      },
      error: () => {
        this.translocoService.selectTranslate('error', {},  {scope: 'biit-ui/login'}).subscribe(msg => {
          this.biitSnackbarService.showNotification(msg, NotificationType.ERROR, null, 5);
        });
      }
    })
  }

  onSignUp(data: SignUpRequest): void {
    this.userService.signup(SignupRequestConverter.convertSignUpRequest(data)).subscribe({
      next: response => {
        const login = new BiitLogin(response.username, data.password)
        this.login(login);
      },
      error: err => ErrorHandler.notify(err, this.translocoService, this.biitSnackbarService)
    });
  }

  checkUserName(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userService.checkUserName(username).subscribe({
        next: () => resolve(false),
        error: (error) => reject(error)
      });
    });
  }

  protected readonly Environment = Environment;
}
