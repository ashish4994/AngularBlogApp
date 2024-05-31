import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewBlogsComponent } from './view-blogs/view-blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
export const routes: Routes = [
{path: 'register', component: RegisterComponent },
{path: 'login', component: LoginComponent},
{path: 'all-blogs', component: ViewBlogsComponent},
{path: 'create-blog', component: CreateBlogComponent},
{ path: '', component: HomepageComponent },


];
