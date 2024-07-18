import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  private baseApiUrl = environment.authApiUrl;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$ = this.isAuthenticated.asObservable();


  constructor(private http: HttpClient, private envService: EnvService) {
      //this.baseApiUrl = this.envService.authApiUrl;
   }

 registerUser(email: string, username: string, password: string) {
  let registerUrl = this.baseApiUrl + 'register';
    const body = { email, username, password };
    return this.http.post(registerUrl, body).pipe(
      catchError(this.handleError)
    )
  }

  loginUser(username: string, password: string): Observable<any> {
    let loginUrl = this.baseApiUrl + 'login';
    const body = { username, password };
    console.log(loginUrl)
    return this.http.post(loginUrl, body).pipe(
      tap((response : any) => {
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('auth-token', response.token);
          // Update the isAuthenticated BehaviorSubject
          this.isAuthenticated.next(true);
          console.log('isAuthenticated BehaviorSubject updated to true');

        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.isAuthenticated.next(false);

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
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth-token');
    return !!token;
  }

}
