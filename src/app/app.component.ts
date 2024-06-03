import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule,MatButtonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //providers: [AuthService]
})


export class AppComponent implements OnInit {
  title = 'my-angular-app';
  isLoggedIn: boolean = false;

  //isAuthenticated$ = this.authService.isAuthenticated$;
  private authSubscription: Subscription | undefined;


  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {

     }

     ngOnInit() {
      this.authSubscription = this.authService.isAuthenticated$.subscribe(
        isAuthenticated => {
          this.isLoggedIn = isAuthenticated;
        }
      );
    }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']); // Navigate to the home route
  }

  navigateToCreateBlog(){
    this.router.navigate(['/create-blog']);

  }

  navigateToViewBlogs(){
    this.router.navigate(['/all-blogs']);

  }

  logout() {
    // Call the logout method in your AuthService
    this.authService.logout();
    // Optionally navigate to the login or home page
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
