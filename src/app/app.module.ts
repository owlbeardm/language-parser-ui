import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { AppServiceModule } from './services/app-service.module';
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
import { TabRoutesComponent } from './components/tab-routes/tab-routes.component';
import { TraceComponent } from './pages/trace/trace.component';
import { WordsDetailComponent } from './pages/words-detail/words-detail.component';
import { TranslationsComponent } from './pages/translations/translations.component';
import { WordsListComponent } from './pages/words-list/words-list.component';
import { AddTranslationComponent } from './pages/translations/add-translation/add-translation.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { ClustersComponent } from './pages/languages/clusters/clusters.component';
import { EvolutionComponent } from './pages/evolution/evolution.component';
import { LawsComponent } from './pages/evolution/laws/laws.component';
import { WordsComponent } from './pages/words/words.component';


@NgModule({
  declarations: [
    AppComponent,
    TraceComponent,
    WordsDetailComponent,
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
    LawsComponent,
    WordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppServiceModule,
    ApiModule.forRoot({ rootUrl: 'http://api.lang.lo' }),
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
