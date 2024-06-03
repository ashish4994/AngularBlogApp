import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogService {

  private apiUrl = environment.blogServiceApiUrl + 'api/blogposts';
  //private apiUrl = 'http://localhost:8080/api/blogposts'; 


  constructor(private http: HttpClient) { }

  createPost(postData: any): Observable<any> {

    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, postData, { headers});
  }

}
