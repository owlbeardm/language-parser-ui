import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpBackend, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ROUTES } from './app.routes';
import { provideRouter, withRouterConfig } from '@angular/router';
import { ShortPosPipe } from './pipes/short-pos.pipe';
import { KeySymbolsPipe } from './pipes/key-symbols.pipe';
import { WrittenWordPipe } from './pipes/written-word.pipe';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor'
import { firebaseAuthInterceptor } from './interceptors/firebase-auth.interceptor'
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from './api/api.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export const APPLICATION_CONFIGURATION: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpErrorInterceptor, firebaseAuthInterceptor]), withInterceptorsFromDi()),
    provideRouter(ROUTES, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    importProvidersFrom(
      BrowserModule,
      // NgSelectModule,
      ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' }),
      ApiModule.forRoot({ rootUrl: environment.rootUrl }),
      // NgOptimizedImage,
      // CKEditorModule,
      // NgbModule,
      FormsModule,
      // ClipboardModule
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
    ),
    // { provide: APP_INITIALIZER, useFactory: initializeApplication, deps: [ApplicationSettings], multi: true },
    // { provide: Document, useExisting: DOCUMENT },
    ShortPosPipe,
    KeySymbolsPipe,
    WrittenWordPipe,
  ]
};
