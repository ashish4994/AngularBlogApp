import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogPost } from '../interfaces/blog-post';
import { Comment } from '../interfaces/comments';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  private apiUrl = environment.blogServiceApiUrl + 'api/blogposts';
  private blogPostBaseUrl;
  //private apiUrl = 'http://localhost:8080/api/blogposts'; 
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogPosts$ = this.blogPostsSubject.asObservable();
  //private commentsServiceBaseUrl = environment.commentsServiceUrl;
  private commentsServiceBaseUrl;
  private likesCountSubject = new BehaviorSubject<number>(0);
  public likesCount$ = this.likesCountSubject.asObservable();

  constructor(private http: HttpClient, private envService : EnvService) {
      this.blogPostBaseUrl = envService.blogServiceApiUrl;
      this.commentsServiceBaseUrl = envService.commentsServiceUrl
   }

  getTokenHeader(){
    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return headers;
  }
  createPost(postData: any): Observable<any> {
    let headers = this.getTokenHeader();
    const url = `${this.blogPostBaseUrl}/api/blogposts`;
    return this.http.post(url, postData, { headers});
  }

  getAllPosts(): Observable<BlogPost[]> {
    const url = `${this.blogPostBaseUrl}/api/blogposts`;
    return this.http.get<BlogPost[]>(url).pipe(
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

  likePost(postId: number) {
    let headers = this.getTokenHeader();
    const url = `${this.commentsServiceBaseUrl}/api/posts/${postId}/likes`;
    return this.http.post(url,{}, { headers});
  }

  saveComment(postId: number, content: string): Observable<any> {
    const url = `${this.commentsServiceBaseUrl}/api/posts/${postId}/comments`;
    const body = { content };
    const headers = this.getTokenHeader();
    const options = { headers: headers };

    return this.http.post(url, body, options);
  }

  // Method to get the total like count for a post
  getAllLikesCountForPost(postId: number): Observable<any> {
    const url = `${this.commentsServiceBaseUrl}/api/posts/${postId}/likes/count`;
    return this.http.get<{ total_likes: number }>(url);
  }


getAllCommentsForPost(postId: number): Observable<any> {
    const url = `${this.commentsServiceBaseUrl}/api/posts/${postId}/comments`;
    return this.http.get<Comment[]>(url);
  }
}
