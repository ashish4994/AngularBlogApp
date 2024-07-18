import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { EnvService } from './app/env.service';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigLoaderService } from './app/config-loader.service';
import { config, firstValueFrom } from 'rxjs';

// export function initializeApp(envService : EnvService){
//   return () => new Promise<void>((resolve) => {
//     envService.getEnv();
//     resolve();
//   })
// }

export function initializeApp(configLoaderService: ConfigLoaderService) {
  return () => configLoaderService.loadConfigWithFetch();
}

bootstrapApplication(AppComponent, {
  providers: [
    ConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory : initializeApp,
      deps: [ConfigLoaderService],
      multi: true
    },
    { provide: 'APP_CONFIG', useValue: appConfig },
  ]
}).catch((err) => console.error(err))
