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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { Comment } from '../../interfaces/comments';

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

  likesCount$: Observable<{ total_likes: number; }> = of({total_likes:0});
  comments$: Observable<Comment[]> | undefined;

  constructor(private route: ActivatedRoute, private blogService: BlogService,private snackBar: MatSnackBar) {}
  
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

    if (this.selectedPost) {
      this.loadComments(this.selectedPost.id);
      this.getLikesCount(this.selectedPost.id);
    }

  }

  publishComment(postId: number) {
    // Implement the logic to handle comment publishing
    console.log('Comment content:', this.commentForm.value.commentContent);
    let content = this.commentForm.value.commentContent;

    if(content){
      this.blogService.saveComment(postId,content).subscribe({
        next: (response) => {
          this.snackBar.open('Comment saved.', 'Close', {
            duration: 33000,
            panelClass: ['snackbar-success']
          });     
          //Load new comments
          this.loadComments(postId); 
        },
        error: (error) => {
          this.snackBar.open('Error saving comment.', 'Close', {
            duration: 33000,
            panelClass: ['snackbar-error']
          }); 
          console.error('Error saving comment:', error);
        }
    });

    }
    // Clear the comment input field after publishing
    this.commentForm.reset();
  }

  likePost(postId: number) {
    this.blogService.likePost(postId).subscribe({
      next: (response) => {
        this.snackBar.open('Like saved successfully.', 'Close', {
          duration: 33000,
          panelClass: ['snackbar-success']
        }); 
        this.getLikesCount(postId); 
      },
      error: (error) => {
        this.snackBar.open('Error saving like.', 'Close', {
          duration: 33000,
          panelClass: ['snackbar-error']
        }); 
        console.error('Error saving comment:', error);
      }
    });
  }

  loadComments(postId: number) {
    this.comments$ = this.blogService.getAllCommentsForPost(postId);
  }
  
  viewPost(postId: number) {
    // Implement the logic to handle viewing a post
  }

  getLikesCount(postId: number) {
    this.likesCount$ = this.blogService.getAllLikesCountForPost(postId);
  }

}
