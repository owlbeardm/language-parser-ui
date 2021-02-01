import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraceComponent } from './trace/trace.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WordsComponent } from './words/words.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TranslationsComponent } from './translations/translations.component';
import { WordsListComponent } from './words-list/words-list.component';
import { AppServiceModule } from './services/app-service.module';
import { AddTranslationComponent } from './translations/add-translation/add-translation.component';
import { ShortPosPipe } from './pipes/short-pos.pipe';
import { HrComponent } from './components/hr/hr.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ErrorService } from './services/error.service';
import { ApiModule } from './api/api.module';
import { HorizontalDashComponent } from './components/spacer/horizontal-dash/horizontal-dash.component';
import { VerticalDashComponent } from './components/spacer/vertical-dash/vertical-dash.component';
import { LanguageSelectComponent } from './components/forms/language-select/language-select.component';
import { HeaderComponent } from './components/header/header.component';
import { NavLinkComponent } from './components/header/nav-link/nav-link.component';
import { KeySymbolsPipe } from './pipes/key-symbols.pipe';
import { LanguagesComponent } from './languages/languages.component';
import { TabRoutesComponent } from './components/tab-routes/tab-routes.component';
import { ClustersComponent } from './languages/clusters/clusters.component';
import { EvolutionComponent } from './evolution/evolution.component';
import { LawsComponent } from './evolution/laws/laws.component';


@NgModule({
  declarations: [
    AppComponent,
    TraceComponent,
    WordsComponent,
    LoadingComponent,
    TranslationsComponent,
    WordsListComponent,
    AddTranslationComponent,
    ShortPosPipe,
    HrComponent,
    FooterComponent,
    HorizontalDashComponent,
    VerticalDashComponent,
    LanguageSelectComponent,
    HeaderComponent,
    NavLinkComponent,
    KeySymbolsPipe,
    LanguagesComponent,
    TabRoutesComponent,
    ClustersComponent,
    EvolutionComponent,
    LawsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppServiceModule,
    ApiModule.forRoot({rootUrl: 'http://api.lang.lo'}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
