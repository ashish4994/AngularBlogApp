import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogPost } from '../../interfaces/blog-post';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, MatIcon, MatChipsModule,MatButtonModule, MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent {

  blogPosts: BlogPost[] = [];
  selectedPost ?: BlogPost;
  commentForm = new FormGroup({
    commentContent: new FormControl('')
  });
  constructor(private route: ActivatedRoute, private blogService: BlogService) {}
 
  ngOnInit() {
    this.blogService.blogPosts$.subscribe({
      next: (posts) => {
        this.blogPosts = posts;
      },
      error: (error) => {
        console.error('Error subscribing to blog posts', error);
      }
    })

    this.route.params.subscribe(params => {
      const postId = +params['id']; 
      if(postId){
        this.selectedPost = this.blogPosts.find(x => x.id == postId)
      }

    });
  }

  publishComment() {
    // Implement the logic to handle comment publishing
    console.log('Comment content:', this.commentForm.value.commentContent);
    // Clear the comment input field after publishing
    this.commentForm.reset();
  }

  likePost(postId: number) {
    // Implement the logic to handle liking a post
  }
  
  viewPost(postId: number) {
    // Implement the logic to handle viewing a post
  }

}
