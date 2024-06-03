import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    HttpClientModule
  ],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  providers: [BlogService]
  
})
export class CreateBlogComponent {
  newPostForm: FormGroup;
  tagsControl = new FormControl('');
  tagsArray: string[] = [];

  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;

  constructor(private fb: FormBuilder, private blogService: BlogService,  private snackBar: MatSnackBar,
    private router: Router) {
    this.newPostForm = this.fb.group({
      name: ['', Validators.required],
      image_url: [''],
      content: ['', Validators.required],
      posted_by: ['', Validators.required],
      tags: this.tagsControl
    });
  }

  onSubmit() {
    if (this.newPostForm.valid) {

      // Process the tags input and split into an array
      const tagsInput: string = this.tagsControl.value || ''; // Ensure it's a string

      this.tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length);


      const formData = {
        ...this.newPostForm.value,
        tags: this.tags
      };

      this.blogService.createPost(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Blog Post saved successfully.', 'Close', {
            duration: 33000
          });      
          this.router.navigate(['/all-blogs']);

        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });

    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTags(): void {
    const tagInput = this.tagsControl.value;
    if (tagInput) {
      const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag.length);
      this.tags = [...this.tags, ...newTags];
      this.tagsControl.setValue('');
    }
  }

}
