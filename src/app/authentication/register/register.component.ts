import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  fieldRequired: string = "This field is required"
   constructor(private auth: AuthService) { }
 
   ngOnInit() {
     this.createForm();
   }
   createForm(){
       let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     this.registerForm = new FormGroup(
       {'username': new FormControl(null,[Validators.required]),
       'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
       'password': new FormControl(null, [Validators.required, this.checkPassword]),
      }
     )
   
 
   }
     emaiErrors() {
      if(!this.registerForm) return;

     return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
       this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :''
   }
 checkPassword(control: { value: any; }) {
     let enteredPassword = control.value
     let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
     return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
   }
   getErrorPassword() {
    if(!this.registerForm) return;
     return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
       this.registerForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
   }
   checkValidation(input: string){
    if(!this.registerForm) return;
     const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched)
     return validation;
   }
  
   onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    
     const email = formData.value.email;
     const password = formData.value.password;
     const username = formData.value.username;
     //this.auth.registerUSer(email, password, username);
      formDirective.resetForm();
     if(this.registerForm)
      this.registerForm.reset();
 }
}
