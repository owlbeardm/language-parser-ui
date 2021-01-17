import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraceComponent } from './trace/trace.component';
import { HttpClientModule } from '@angular/common/http';
import { WordsComponent } from './words/words.component';
import { LoadingComponent } from './loading/loading.component';
import { TranslationsComponent } from './translations/translations.component';
import { WordsListComponent } from './words-list/words-list.component';
import { AppServiceModule } from './service/app-service.module';
import { AddTranslationComponent } from './translations/add-translation/add-translation.component';


@NgModule({
  declarations: [
    AppComponent,
    TraceComponent,
    WordsComponent,
    LoadingComponent,
    TranslationsComponent,
    WordsListComponent,
    AddTranslationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
