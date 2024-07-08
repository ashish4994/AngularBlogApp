import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogPost } from '../interfaces/blog-post';
import { Comment } from '../interfaces/comments';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})

export class BlogService {

  private apiUrl = environment.blogServiceApiUrl + 'api/blogposts';
  //private apiUrl = 'http://localhost:8080/api/blogposts'; 
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogPosts$ = this.blogPostsSubject.asObservable();
  private commentsServiceBaseUrl = environment.commentsServiceUrl;
  private likesCountSubject = new BehaviorSubject<number>(0);
  public likesCount$ = this.likesCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTokenHeader(){
    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return headers;
  }
  createPost(postData: any): Observable<any> {
    let headers = this.getTokenHeader();
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
