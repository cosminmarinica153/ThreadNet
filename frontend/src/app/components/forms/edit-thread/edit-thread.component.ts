import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IThread } from 'src/app/interfaces/IThread';
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
  username: string;

  editForm: FormGroup;
  submit: boolean;
  newThread: IThread;

  get threadTitle(){
    return this.editForm.get('threadTitle') as FormControl;
  }
  get content(){
    return this.editForm.get('content') as FormControl;
  }

  constructor(private router: Router, private fb: FormBuilder,
              private threadService: ThreadsService, private userService: UserService, private interaction: InteractionsService) { }

  ngOnInit() {
    this.createEditForm();
    this.username = this.userService.getUsernameById(this.thread.user_id);
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

    this.threadService.editThread(this.threadData());
    this.interaction.setThreadEdit(false);
    this.submit = false;

    let url = this.router.url;
    if(url == "/category/My%20Threads") url = "/category/My Threads";
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([url]);
    });
  }

  threadData(): IThread{
    return this.newThread = {
      id: this.thread.id,
      user_id: this.thread.user_id,
      category_id: this.thread.category_id,
      thread_date: new Date(),
      is_edited: true,
      title: this.threadTitle.value,
      content: this.content.value,
      up_votes: this.thread.up_votes,
      down_votes: this.thread.down_votes
    }
  }

}
