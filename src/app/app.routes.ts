import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewBlogsComponent } from './blog/view-blogs/view-blogs.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
{path: 'register', component: RegisterComponent },
{path: 'login', component: LoginComponent},
{path: 'all-blogs', component: ViewBlogsComponent,  canActivate: [authGuard]},
{path: 'create-blog', component: CreateBlogComponent, canActivate: [authGuard]},
{ path: '', component: HomepageComponent }
];
