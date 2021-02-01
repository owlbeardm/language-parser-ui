import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceComponent } from './trace/trace.component';
import { TranslationsComponent } from './translations/translations.component';
import { WordsComponent } from './words/words.component';
import { WordsListComponent } from './words-list/words-list.component';
import { LanguagesComponent } from './languages/languages.component';
import { ClustersComponent } from './languages/clusters/clusters.component';
import { LawsComponent } from './evolution/laws/laws.component';

const routes: Routes = [
  { path: 'trace', component: TraceComponent },
  { path: 'words/:word', component: WordsComponent },
  { path: 'words', component: WordsListComponent },
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
