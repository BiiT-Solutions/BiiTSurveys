import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderInterceptor} from "./config/header-interceptor";
import {TranslocoRootModule} from "@biit-solutions/wizardry-theme/i18n";
import {registerLocaleData} from "@angular/common";

import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeNL from '@angular/common/locales/nl';
import {BiitSnackbarModule} from "@biit-solutions/wizardry-theme/info";
import {TRANSLOCO_CONFIG, translocoConfig} from "@ngneat/transloco";

registerLocaleData(localeEn, 'en')
registerLocaleData(localeEs, 'es');
registerLocaleData(localeNL, 'nl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TranslocoRootModule,
    BiitSnackbarModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'nl'],
        defaultLang: 'en',
        fallbackLang: 'en',
        missingHandler: {
          useFallbackTranslation: true
        },
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      })
    },
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
