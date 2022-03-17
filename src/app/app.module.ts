import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from './components/loading/loading.component';
import {AppServiceModule} from './services/app-service.module';
import {ShortPosPipe} from './pipes/short-pos.pipe';
import {HrComponent} from './components/hr/hr.component';
import {FooterComponent} from './components/footer/footer.component';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {ErrorService} from './services/error.service';
import {ApiModule} from './api/api.module';
import {AbstractHasLanguageComponent} from './components/abstract/abstract-has-language/abstract-has-language.component';
import {HorizontalDashComponent} from './components/spacer/horizontal-dash/horizontal-dash.component';
import {VerticalDashComponent} from './components/spacer/vertical-dash/vertical-dash.component';
import {LanguageSelectComponent} from './components/forms/language-select/language-select.component';
import {HeaderComponent} from './components/header/header.component';
import {NavLinkComponent} from './components/header/nav-link/nav-link.component';
import {KeySymbolsPipe} from './pipes/key-symbols.pipe';
import {TabRoutesComponent} from './components/tab-routes/tab-routes.component';
import {TraceComponent} from './pages/trace/trace.component';
import {LanguagesComponent} from './pages/languages/languages.component';
import {ClustersComponent} from './pages/languages/clusters/clusters.component';
import {EvolutionComponent} from './pages/evolution/evolution.component';
import {LawsComponent} from './pages/evolution/laws/laws.component';
import {WordsComponent} from './pages/words/words.component';
import {WordsDetailComponent} from './pages/words/words-detail/words-detail.component';
import {WordsListComponent} from './pages/words/words-list/words-list.component';
import {TranslationsComponent} from './pages/words/translations/translations.component';
import {AddTranslationComponent} from './pages/words/translations/add-translation/add-translation.component';
import { AllLanguagesComponent } from './components/selectors/all-languages/all-languages.component';
import { TraceLanguageRecursiveComponent } from './components/selectors/trace-language-recursive/trace-language-recursive.component';
import { TraceResultComponent } from './pages/trace/trace-result/trace-result.component';
import { LanguageConnectionsComponent } from './pages/evolution/language-connections/language-connections.component';
import { SoundChangesTableComponent } from './pages/evolution/language-connections/sound-changes-table/sound-changes-table.component';
import { SoundChangesEditComponent } from './pages/evolution/language-connections/sound-changes-edit/sound-changes-edit.component';
import { LanguageConnectionComponent } from './components/selectors/language-connection/language-connection.component';
import { SoundChangesTableRowComponent } from './pages/evolution/language-connections/sound-changes-table/sound-changes-table-row/sound-changes-table-row.component';
import { LanguageDescriptionComponent } from './pages/languages/language-description/language-description.component';
import { LanguageTabsComponent } from './pages/languages/language-tabs/language-tabs.component';
import { LanguagePosComponent } from './pages/languages/language-pos/language-pos.component';
import { LanguagePhoneticsComponent } from './pages/languages/language-phonetics/language-phonetics.component';
import { PulmonicConsonantsComponent } from './pages/languages/language-phonetics/pulmonic-consonants/pulmonic-consonants.component';
import { PhoneticBtnComponent } from './components/sound/phonetic-btn/phonetic-btn.component';
import { VowelsComponent } from './pages/languages/language-phonetics/vowels/vowels.component';
import { OtherPhonemesComponent } from './pages/languages/language-phonetics/other-phonemes/other-phonemes.component';
import { NonPulmonicConsonantsComponent } from './pages/languages/language-phonetics/non-pulmonic-consonants/non-pulmonic-consonants.component';
import { PosDetailsComponent } from './pages/languages/language-pos/pos-details/pos-details.component';
import { WordAddLineComponent } from './pages/words/word-add-line/word-add-line.component';
import { ListPaginatorComponent } from './components/list/list-paginator/list-paginator.component';


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
    WordsComponent,
    AllLanguagesComponent,
    TraceLanguageRecursiveComponent,
    TraceResultComponent,
    LanguageConnectionsComponent,
    SoundChangesTableComponent,
    SoundChangesEditComponent,
    LanguageConnectionComponent,
    SoundChangesTableRowComponent,
    LanguageDescriptionComponent,
    AbstractHasLanguageComponent,
    LanguageTabsComponent,
    LanguagePosComponent,
    LanguagePhoneticsComponent,
    PulmonicConsonantsComponent,
    PhoneticBtnComponent,
    VowelsComponent,
    OtherPhonemesComponent,
    NonPulmonicConsonantsComponent,
    PosDetailsComponent,
    WordAddLineComponent,
    ListPaginatorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppServiceModule,
    ApiModule.forRoot({rootUrl: 'http://localhost:8080'}),
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
export class AppModule {
}
