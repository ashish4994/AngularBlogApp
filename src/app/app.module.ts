// src/app/app.module.ts
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConfigLoaderService } from './config-loader.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function initializeApp(configLoaderService: ConfigLoaderService) {
    return () => configLoaderService.loadconfig();
  //return () => configLoaderService.loadConfigWithFetch();
}

@NgModule({
  declarations: [
    AppComponent
    // ... any other components, pipes, or directives
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    CommonModule, 
    RouterOutlet, 
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ConfigLoaderService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigLoaderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
