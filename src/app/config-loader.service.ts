// src/app/config-loader.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigLoaderService {
  //constructor(private http: HttpClient) {}

  async loadConfigWithFetch() {
    try {
      const response = await fetch('/assets/config.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const config = await response.json();
      // Override compile-time environment variables with runtime values
      if (config.authApiUrl) {
        environment.authApiUrl = config.authApiUrl;
      }
      if (config.blogServiceApiUrl) {
        environment.blogServiceApiUrl = config.blogServiceApiUrl;
      }
      if (config.commentsServiceUrl) {
        environment.commentsServiceUrl = config.commentsServiceUrl;
      }
      // Return the loaded config in case it needs to be used
      return config;
    } catch (error) {
      console.error('Failed to load config:', error);
      // Handle the error appropriately, e.g., by re-throwing, returning a default config, etc.
      throw error;
    }
  }

  // loadConfig() {
  //   // Replace 'config.json' with the path to your runtime configuration file or API endpoint
  //   return this.http.get('/assets/config.json').pipe(
  //     tap((config: any) => {
  //       // Override compile-time environment variables with runtime values
  //       if (config.authApiUrl) {
  //         environment.authApiUrl = config.authApiUrl;
  //       }
  //       if (config.blogServiceApiUrl) {
  //         environment.blogServiceApiUrl = config.blogServiceApiUrl;
  //       }
  //       if (config.commentsServiceUrl) {
  //         environment.commentsServiceUrl = config.commentsServiceUrl;
  //       }
  //     })
  //   );
  // }
}
