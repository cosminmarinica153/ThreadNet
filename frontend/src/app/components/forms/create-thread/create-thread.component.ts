import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, of } from 'rxjs';
import { ICreateThreadDto } from 'src/app/interfaces/Dto/ICreateThreadDto';
import { ICategory } from 'src/app/interfaces/TableInterfaces/ICategory';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';
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
  thread: ICreateThreadDto;
  userId: number;
  findCategory: ICategory;
  categoryOptions: Observable<ICategory[]>
  presetCategory: string;

  get threadTitle(){
    return this.threadForm.get('threadTitle') as FormControl;
  }
  get content(){
    return this.threadForm.get('content') as FormControl;
  }
  get category() {
    return this.threadForm.get('category') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
              private categoryService: CategoryService, private threadService: ThreadsService,
              private authService: AuthentificationService) {
    this.submit = false

    this.authService.getUserId().subscribe(userId => {
        this.userId = userId;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!params['category_name']) this.presetCategory = 'Other';
      else this.presetCategory = params['category_name'];
      this.categoryService.getAll().pipe(
        map(data => {
          this.categoryOptions = of(data);
        })).subscribe();
      })
    this.createThreadForm();
  }

  createThreadForm(){
    this.threadForm = this.fb.group({
      threadTitle: [null, [Validators.required, Validators.minLength(5)]],
      content: [null, [Validators.required, Validators.minLength(5)]],
      category: [this.presetCategory]
    });
  }

  onCreate(){
    this.submit = true;

    if(!this.threadForm.valid) return

    this.categoryOptions.pipe(
      map(categories => {
        this.findCategory = categories.find(c => c.name == this.category.value);
      }),
      finalize(() => {
        this.threadService.postThread(this.threadData()).pipe(
          map(data => {

          }),
          finalize(() => {

          })).subscribe();
      })).subscribe();
  }

  threadData(): ICreateThreadDto{
    return this.thread = {
      userId: this.userId,
      categoryId: this.findCategory.id,
      uploadDate: new Date(),
      isEdited: 0,
      title: this.threadTitle.value,
      content: this.content.value,
    }
  }


}
