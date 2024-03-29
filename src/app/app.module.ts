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
import { AbstractSoundChanges } from './components/sound-changes/sound-chages-abstract.component.spec';
import { SoundChangesTableComponent } from './components/sound-changes/sound-changes-table/sound-changes-table.component';
import { SoundChangesEditComponent } from './components/sound-changes/sound-changes-edit/sound-changes-edit.component';
import { LanguageConnectionComponent } from './components/selectors/language-connection/language-connection.component';
import { SoundChangesTableRowComponent } from './components/sound-changes/sound-changes-table-row/sound-changes-table-row.component';
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
import { ListEvolutionComponent } from './pages/evolution/list-evolution/list-evolution.component';
import { LanguageWritingComponent } from './pages/languages/language-writing/language-writing.component';
import { TranslationTypePipe } from './pipes/translation-type.pipe';
import { TranslationLineComponent } from './pages/words/translations/translation-line/translation-line.component';
import { WordNewComponent } from './pages/words/word-new/word-new.component';
import { NewComponent } from './pages/words/word-new/new/new.component';
import { DerivedComponent } from './pages/words/word-new/derived/derived.component';
import { TranslationWordComponent } from './components/translation-word/translation-word.component';
import { WordWrittenWithTranslationsComponent } from './components/word-written-with-translations/word-written-with-translations.component';
import { WordDetailTranslationsComponent } from './pages/words/words-detail/word-detail-translations/word-detail-translations.component';
import { WordDetailListComponent } from './pages/words/words-detail/word-detail-list/word-detail-list.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {FireAuthService} from './services/fire-auth.service';
import {FirebaseAuthInterceptor} from './interceptors/firebase-auth.interceptor';
import { VersionFooterComponent } from './components/version-footer/version-footer.component';
import { BorrowedComponent } from './pages/words/word-new/borrowed/borrowed.component';
import { WordDetailDescendantsComponent } from './pages/words/words-detail/word-detail-descendants/word-detail-descendants.component';
import { WrittenWordPipe } from './pipes/written-word.pipe';
import { WordGrammarComponent } from './pages/words/words-detail/word-grammar/word-grammar.component';
import { LanguageCategoryComponent } from './pages/languages/language-category/language-category.component';
import { LanguageCategoryDetailsComponent } from './pages/languages/language-category/language-category-details/language-category-details.component';
import { LanguageCategoryValueDetailsComponent } from './pages/languages/language-category/language-category-value-details/language-category-value-details.component';
import { WordGrammarCategoryComponent } from './pages/words/words-detail/word-grammar/word-grammar-category/word-grammar-category.component';
import { CategoryEvolutionComponent } from './pages/evolution/category-evolution/category-evolution.component';
import { CategoryEvolutionTableComponent } from './pages/evolution/category-evolution/category-evolution-table/category-evolution-table.component';
import { CategoryEvolutionInputComponent } from './pages/evolution/category-evolution/category-evolution-table/category-evolution-input/category-evolution-input.component';
import { LanguageDeclensionComponent } from './pages/languages/language-declension/language-declension.component';
import { LanguageDeclensionRulesComponent } from './pages/languages/language-declension/language-declension-rules/language-declension-rules.component';
import { DeclensionRuleComponent } from './pages/languages/language-declension/language-declension-rules/declension-rule/declension-rule.component';
import { RuleValuesComponent } from './pages/languages/language-declension/language-declension-rules/declension-rule/rule-values/rule-values.component';
import { RuleSoundChangesComponent } from './pages/languages/language-declension/language-declension-rules/declension-rule/rule-sound-changes/rule-sound-changes.component';
import { WordDeclensionsComponent } from './pages/words/words-detail/word-grammar/word-declensions/word-declensions.component';
import { WordDeclensionTableComponent } from './pages/words/words-detail/word-grammar/word-declensions/word-declension-table/word-declension-table.component';


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
    ListEvolutionComponent,
    LanguageWritingComponent,
    TranslationTypePipe,
    TranslationLineComponent,
    WordNewComponent,
    NewComponent,
    DerivedComponent,
    TranslationWordComponent,
    WordWrittenWithTranslationsComponent,
    WordDetailTranslationsComponent,
    WordDetailListComponent,
    LoginComponent,
    VersionFooterComponent,
    BorrowedComponent,
    WordDetailDescendantsComponent,
    WrittenWordPipe,
    WordGrammarComponent,
    LanguageCategoryComponent,
    LanguageCategoryDetailsComponent,
    LanguageCategoryValueDetailsComponent,
    WordGrammarCategoryComponent,
    CategoryEvolutionComponent,
    CategoryEvolutionTableComponent,
    CategoryEvolutionInputComponent,
    LanguageDeclensionComponent,
    LanguageDeclensionRulesComponent,
    DeclensionRuleComponent,
    RuleValuesComponent,
    RuleSoundChangesComponent,
    WordDeclensionsComponent,
    WordDeclensionTableComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    AppServiceModule,
    ApiModule.forRoot({rootUrl: environment.rootUrl}),
  ],
  providers: [
    FireAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirebaseAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('457941235931-ta7f430pcvim9inavtg97ngqav65394i.apps.googleusercontent.com'),
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    ErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
