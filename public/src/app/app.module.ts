import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http'
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
