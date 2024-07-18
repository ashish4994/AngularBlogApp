import { Injectable } from '@angular/core';

export interface IAppConfig {
  authApiUrl: string;
  blogServiceApiUrl: string;
  commentsServiceUrl: string;
}

declare global {
  interface Window {
    __env: IAppConfig;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private env: IAppConfig;

  constructor() {
    this.env = this.getEnv();
  }

  public getEnv(): IAppConfig {
    // Access the global __env object defined in the env.js file
    return window.__env
    // || {
    //   authApiUrl: window.__env || 'http://localhost:3005/', // Default value
    //   blogServiceApiUrl: 'http://localhost:8085/', // Default value
    //   commentsServiceUrl: 'http://localhost:5005/' // Default value
    // };
  }

  get authApiUrl(): string {
    return this.env.authApiUrl;
  }

  get blogServiceApiUrl(): string {
    return this.env.blogServiceApiUrl;
  }

  get commentsServiceUrl(): string {
    return this.env.commentsServiceUrl;
  }
}
