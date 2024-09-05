import { Routes } from '@angular/router';
import { WorldDetailsResolver } from './resolvers/world-details.resolver';

// const routerOptions: ExtraOptions = {
//   scrollPositionRestoration: 'enabled',
//   anchorScrolling: 'enabled',
//   // scrollOffset: [0, 64],
// };
export const ROUTES: Routes = [
  { path: 'trace', loadComponent: () => import('./pages/trace/trace.component').then((c) => c.TraceComponent) },
  {
    path: 'words', loadComponent: () => import('./pages/words/words.component').then((c) => c.WordsComponent),
    children: [
      { path: 'new', loadComponent: () => import('./pages/words/word-new/word-new.component').then((c) => c.WordNewComponent), },
      { path: 'list', loadComponent: () => import('./pages/words/words-list/words-list.component').then((c) => c.WordsListComponent), },
      { path: 'translations', loadComponent: () => import('./pages/words/translations/translations.component').then((c) => c.TranslationsComponent), },
      {
        path: 'word/:word',
        loadComponent: () => import('./pages/words/words-detail/words-detail.component').then((c) => c.WordsDetailComponent),
        pathMatch: 'full',
        resolve: { wordDetails: WorldDetailsResolver }
      }]
  },
  {
    path: 'evolutions', loadComponent: () => import('./pages/evolution/evolution.component').then((c) => c.EvolutionComponent),
    children: [
      { path: 'connections', loadComponent: () => import('./pages/evolution/language-connections/language-connections.component').then((c) => c.LanguageConnectionsComponent), },
      { path: 'category', loadComponent: () => import('./pages/evolution/category-evolution/category-evolution.component').then((c) => c.CategoryEvolutionComponent), },
      { path: 'list', loadComponent: () => import('./pages/evolution/list-evolution/list-evolution.component').then((c) => c.ListEvolutionComponent), }]
  },
  {
    path: 'language', loadComponent: () => import('./pages/languages/languages.component').then((c) => c.LanguagesComponent),
    children: [
      { path: 'description', loadComponent: () => import('./pages/languages/language-description/language-description.component').then((c) => c.LanguageDescriptionComponent), },
      { path: 'clusters', loadComponent: () => import('./pages/languages/clusters/clusters.component').then((c) => c.ClustersComponent), },
      { path: 'laws', loadComponent: () => import('./pages/evolution/laws/laws.component').then((c) => c.LawsComponent), }]
  },
];
