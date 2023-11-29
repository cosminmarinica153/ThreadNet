import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IThread } from 'src/app/interfaces/IThread';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { ThreadsService } from 'src/app/services/threads.service';

@Component({
  selector: 'tn-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit {
  threadForm: FormGroup;
  submit: boolean;
  thread: IThread;
  thread_id: number;
  user_id: number;
  category_id: number;
  categoryOptions: Array<string>

  get threadTitle(){
    return this.threadForm.get('threadTitle') as FormControl;
  }
  get content(){
    return this.threadForm.get('content') as FormControl;
  }
  get category() {
    return this.threadForm.get('category') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private categoryService: CategoryService,
              private threadService: ThreadsService, private authService: AuthentificationService) {
    this.submit = false
    if(localStorage.getItem('token'))
      this.user_id = authService.getUserId();
    this.thread_id = threadService.getLastId();
    this.categoryOptions = categoryService.getAllCategoryNames();
  }

  ngOnInit() {
    this.createThreadForm();
  }

  createThreadForm(){
    this.threadForm = this.fb.group({
      threadTitle: [null, [Validators.required, Validators.minLength(5)]],
      content: [null, [Validators.required, Validators.minLength(5)]],
      category: ['Other']
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.threadForm.valid) return

    this.category_id = +this.categoryService.getCategoryId(this.category.value);

    this.threadService.addThread(this.threadData());
    this.submit = false;

    this.router.navigate(['/thread', this.thread_id]);
  }

  threadData(): IThread{
    return this.thread = {
      id: this.thread_id,
      user_id: this.user_id,
      category_id: this.category_id,
      thread_date: new Date(),
      is_edited: false,
      title: this.threadTitle.value,
      content: this.content.value,
      up_votes: 0,
      down_votes: 0
    }
  }


}
