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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppServiceModule
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
