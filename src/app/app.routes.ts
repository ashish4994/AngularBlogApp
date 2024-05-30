import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
export const routes: Routes = [
{path: 'register', component: RegisterComponent },
{path: 'login', component: LoginComponent},
{ path: '', component: HomepageComponent },

];
