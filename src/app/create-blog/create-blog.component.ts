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
    MatChipsModule
  ],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
  
})
export class CreateBlogComponent {
  newPostForm: FormGroup;
  tagsControl = new FormControl('');
  tagsArray: string[] = [];

  tags: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;

  constructor(private fb: FormBuilder) {
    this.newPostForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      content: ['', Validators.required],
      postedBy: ['', Validators.required],
      tags: [this.tags]
    });
  }

  onSubmit() {
    if (this.newPostForm.valid) {
      // Process the tags input and split into an array
      const tagsInput: string = this.newPostForm.value.tags;
      if (tagsInput) {
        this.tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length);
      }

      console.log(this.newPostForm.value);
      // Process your form submission here (e.g., send to backend)
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
