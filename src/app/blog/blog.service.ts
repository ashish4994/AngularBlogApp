import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogPost } from '../interfaces/blog-post';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})

export class BlogService {

  private apiUrl = environment.blogServiceApiUrl + 'api/blogposts';
  //private apiUrl = 'http://localhost:8080/api/blogposts'; 
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogPosts$ = this.blogPostsSubject.asObservable();


  constructor(private http: HttpClient) { }

  createPost(postData: any): Observable<any> {

    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, postData, { headers});
  }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl).pipe(
      tap({
        next: (posts) => {
          this.blogPostsSubject.next(posts); 
        },
        error: (error) => {
          console.error('Error fetching blog posts', error);
          this.blogPostsSubject.next([]); 
        }
      })
    );
  }

}
