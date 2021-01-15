import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceComponent } from './trace/trace.component';
import { TranslationsComponent } from './translations/translations.component';
import { WordsComponent } from './words/words.component';

const routes: Routes = [
  { path: 'trace', component: TraceComponent },
  { path: 'words/:word', component: WordsComponent },
  { path: 'words', component: WordsComponent },
  { path: 'translations', component: TranslationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
