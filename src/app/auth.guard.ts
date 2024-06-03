import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  // Retrieve the JWT token from local storage or your authentication service
  const token = localStorage.getItem('auth-token');
  const router = Inject(Router)

  // Check if the token exists
  if (token) {
    // Token exists, user is considered authenticated
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
