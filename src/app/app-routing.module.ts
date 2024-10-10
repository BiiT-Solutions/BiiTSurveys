import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";

const login = import('./views/biit-login-page/biit-login-page.module').then(m => m.BiitLoginPageModule);
const routes: Routes = [
  {
    path: '',
    loadChildren: () => login
  },
  {
    path: 'login',
    loadChildren: () => login
  },
  {
    path: 'nca',
    loadChildren: () => import('./views/single-survey-board/single-survey-board.module').then(m => m.SingleSurveyBoardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'haw',
    loadChildren: () => import('./views/vertical-survey-board/vertical-survey-board.module').then(m => m.VerticalSurveyBoardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'multi',
    loadChildren: () => import('./views/multi-survey-board/multi-survey-board.module').then(m => m.MultiSurveyBoardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'credibility',
    loadChildren: () => import('./views/multi-survey-board/multi-survey-board.module').then(m => m.MultiSurveyBoardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
