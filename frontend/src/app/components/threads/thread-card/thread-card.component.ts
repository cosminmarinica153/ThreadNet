import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { IThread } from '../../../interfaces/TableInterfaces/IThread';

import { UserService } from 'src/app/services/user.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: Observable<IThread>;
  threadId: number;
  user: Observable<IUser>;
  isEditable: boolean;

  isEditing: boolean;

  constructor(private router: Router, private authService: AuthentificationService,
              private userService: UserService, private interaction: InteractionsService) {
    this.isEditable = false;
    this.isEditing = false;
  }

  ngOnInit() {
    this.thread.subscribe(data => {
      console.log("Succesful subscribe");
      this.userService.getOne(data.userId).subscribe(
        data => {
          this.user = of(data);
        });
      this.interaction.getThreadEdit().subscribe(value =>{
        this.isEditing = value;
      });
      this.threadId = data.id;
    });
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  loadThread(){
    this.router.navigate(['/thread', this.threadId]);
  }
}
