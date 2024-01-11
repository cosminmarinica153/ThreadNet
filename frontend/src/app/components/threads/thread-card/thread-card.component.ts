import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { IThread } from '../../../interfaces/TableInterfaces/IThread';

import { UserService } from 'src/app/services/user.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: IThread;
  user: IUser;
  isEditable: boolean;

  isEditing: boolean;

  constructor(private router: Router, private authService: AuthentificationService,
              private userService: UserService, private interaction: InteractionsService) {
    this.isEditable = false;
    this.isEditing = false;
  }

  ngOnInit() {
    this.userService.getOne(this.thread.userId).subscribe(
      data => {
        this.user = data;
      });
    this.interaction.getThreadEdit().subscribe(value =>{
      this.isEditing = value;
    });
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  loadThread(id: number){
    this.router.navigate(['/thread', id]);
  }
}
