import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdateThreadDto } from 'src/app/interfaces/Dto/IUpdateThreadDto';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { InteractionsService } from 'src/app/services/interactions.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-edit-thread',
  templateUrl: './edit-thread.component.html',
  styleUrls: ['./edit-thread.component.css']
})
export class EditThreadComponent implements OnInit {
@Input()thread: IThread;
  user: IUser;

  editForm: FormGroup;
  submit: boolean;
  newThread: IUpdateThreadDto;

  get threadTitle(){
    return this.editForm.get('threadTitle') as FormControl;
  }
  get content(){
    return this.editForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder,
              private threadService: ThreadsService, private userService: UserService, private interaction: InteractionsService) { }

  ngOnInit() {
    this.userService.getOne(this.thread.userId).subscribe(data => {
      this.user = data;
    });
    this.createEditForm();
  }

  createEditForm(){
    this.editForm = this.fb.group({
      threadTitle: [this.thread.title, [Validators.required, Validators.minLength(5)]],
      content: [this.thread.content, [Validators.required, Validators.minLength(5)]],
    })
  }

  onCreate(){
    this.submit = true;

    if(!this.editForm.valid) return

    this.threadService.putThread(this.threadData());
    this.interaction.setThreadEdit(false);
    this.submit = false;

    let url = this.router.url;
    if(url == "/category/My%20Threads") url = "/category/My Threads";
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([url]);
    });
  }

  threadData(): IUpdateThreadDto{
    return this.newThread = {
      id: this.thread.id,
      title: this.threadTitle.value,
      content: this.content.value,
    }
  }

}
