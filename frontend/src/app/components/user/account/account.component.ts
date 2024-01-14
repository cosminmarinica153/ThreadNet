import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from 'src/app/interfaces/TableInterfaces/IUser';
import { IThread } from 'src/app/interfaces/TableInterfaces/IThread';
import { IUserComment } from 'src/app/interfaces/MiscInterfaces/IUserComment';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

import { NotFoundError, Observable, map, of } from 'rxjs';

@Component({
  selector: 'tn-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  threads: Observable<IThread[]>
  comments: Array<IUserComment>

  user: IUser

  constructor(private route: ActivatedRoute, private authService: AuthentificationService,
              private userService: UserService) {
    this.comments = [];
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      //this.user = this.userService.getUserByUsername(params['username']);
      this.userService.getThreads(this.user.id).subscribe(data => {
        this.threads = of(data);
      })
    });

  }

  isUserProfile(): Observable<boolean>{
    return this.authService.getUserId().pipe(
      map((userId: number) => userId === this.user.id)
    );
  }
}
