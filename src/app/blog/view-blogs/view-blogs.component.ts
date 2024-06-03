import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogPost } from '../../interfaces/blog-post';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-blogs',
  standalone: true,
  templateUrl: './view-blogs.component.html',
  styleUrl: './view-blogs.component.css',
  imports: [MatCardModule, MatIconModule, CommonModule,MatButtonModule] 
})
export class ViewBlogsComponent {

  blogPosts: BlogPost[] | undefined;

  constructor(private blogService: BlogService,  private router: Router){

  }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        console.log(this.blogPosts)
      },
      error: (error) => {
        console.error('Error fetching blog posts:', error);
      }
    });
  }

  viewPost(postId: number){
    this.router.navigate(['/blog-post', postId]);
  }

  likePost(postId: number): void {
    // Logic to handle liking a post
    // This could involve updating the post's likes property and making an API call
  }

  viewLikes(postId: number): void {
    // Logic to handle viewing likes
    // This could involve navigating to a different view or displaying a modal
  }

}
