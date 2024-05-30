import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  private registerUrl = environment.baseApiUrl + 'register';
  private loginUrl = environment.baseApiUrl + 'login';
  //private loginUrl = window.env.baseApiUrl + 'login';
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

 registerUser(email: string, username: string, password: string) {
    const body = { email, username, password };
    return this.http.post(this.registerUrl, body).pipe(
      catchError(this.handleError)
    )
  }

  loginUser(username: string, password: string) {
    const body = { username, password };
    return this.http.post(this.loginUrl, body).pipe(
      tap(response => {
        if(response){
          this.isAuthenticated.next(true)
        }
      })
    );

  }

   // Observable to expose the authentication status
   get isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }

   // Error handling method
   private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
}
