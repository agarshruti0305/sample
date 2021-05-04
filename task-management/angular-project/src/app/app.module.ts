import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { TaskModule } from './task/task.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Auth0Interceptor } from './interceptor/auth0Interceptor';
import { DatePipe } from '@angular/common';
import {FormsModule } from '@angular/forms';
import { StatusPipe } from './shared/pipes/status.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TaskModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:Auth0Interceptor,multi:true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
