import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawsComponent } from './pages/evolution/laws/laws.component';
import { ClustersComponent } from './pages/languages/clusters/clusters.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { TraceComponent } from './pages/trace/trace.component';
import { TranslationsComponent } from './pages/translations/translations.component';
import { WordsListComponent } from './pages/words-list/words-list.component';
import { WordsDetailComponent } from './pages/words-detail/words-detail.component';
import { WordsComponent } from './pages/words/words.component';

const routes: Routes = [
  { path: 'trace', component: TraceComponent },
  {
    path: 'words', component: WordsComponent,
    children: [
      { path: 'list', component: WordsListComponent },
      { path: ':word', component: WordsDetailComponent }]
  },
  { path: 'translations', component: TranslationsComponent },
  {
    path: 'language', component: LanguagesComponent,
    children: [
      { path: 'clusters', component: ClustersComponent },
      { path: 'laws', component: LawsComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
