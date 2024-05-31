import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule,MatFormFieldModule, CommonModule,MatInputModule,MatButtonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]

})
export class LoginComponent {
  
  constructor(private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  
   ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      this.authService.loginUser(username, password).subscribe({
        next: (response) => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 33000
          }); 
          this.router.navigate(['/all-blogs']);
        },
        error: (error) => {
          console.error('Login failed', error);
           this.snackBar.open('Login failed', 'Close', {
            duration: 33000
          });
        }
      });    }
  }
  @Input() error !: string | null;

}
