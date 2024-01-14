import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, of, switchMap } from 'rxjs';
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
  categoryOptions: Observable<ICategory[]>
  presetCategory: ICategory;

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
      if(!params['category_name']) this.presetCategory = { id: 2, name: 'Other'};
      this.categoryService.getAll().pipe(
        map(data => {
          this.categoryOptions = of(data);
        }),
        finalize(() => {
          if(!this.presetCategory)
            this.categoryOptions.subscribe(data => {
              this.presetCategory = data.find(category => category.name == params['category_name']);
            })
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

    this.threadService.postThread(this.threadData()).subscribe(data => {
      if(!data){
        console.log("Unsuccesful request");
        return;
      }

      this.submit = false;

      this.router.navigate(["/thread", data.id]);
    })
  }

  threadData(): ICreateThreadDto{
    return this.thread = {
      userId: this.userId,
      categoryId: this.category.value.id,
      uploadDate: new Date(),
      isEdited: 0,
      title: this.threadTitle.value,
      content: this.content.value,
    }
  }


}
