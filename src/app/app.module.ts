import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { HomeResolver } from './routing/resolvers/home.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth/auth.service';
import { SidebarModule } from './modules/layout/sidebar/sidebar.module';
import { HeaderModule } from './modules/layout/header/header.module';
import { ToolbarModule } from './modules/layout/toolbar/toolbar.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    SidebarModule,
    HeaderModule,
    ToolbarModule,
    LoginModule
  ],
  providers: [
    HomeResolver,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
