import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IThread } from '../../../interfaces/TableInterfaces/IThread';

import { ThreadMarginService } from 'src/app/services/thread-margin.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';
import { ThreadsService } from 'src/app/services/threads.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Observable<IThread[]>;
  title: string;
  id: number;
  leftComponentWidth: number;

@Input() promt: string;
  sortObj: Object;

  constructor(private route: ActivatedRoute, private authService: AuthentificationService,
              private threadsService: ThreadsService, private interaction: InteractionsService,
              private marginService: ThreadMarginService, private userService: UserService) {
    this.leftComponentWidth = 200;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.title = params['category_name'];
      this.authService.getUserId().subscribe((userId: number) => {
        if(!this.title)
          this.threadsService.getAll().subscribe(data => {
              this.threads = of(data);
          });
        else if(this.title == "My Threads"){
          this.userService.getThreads(userId).subscribe(data => {
              this.threads = of(data);
              this.title = "My Threads";
          });
        }
        else if(this.title == "My Favourites")
          this.userService.getFavouriteThreads(userId).subscribe(data => {
              this.threads = of(data);
              this.title = "Favourites";
        });
      })

      if(!this.promt) this.promt = '';

      this.sortObj = this.interaction.getSort();
      if(this.sortObj['type'] === 'date') this.sortObj['propertyName'] = 'thread_date';
      else this.sortObj['propertyName'] = 'engagement';

      this.marginService.isLeftComponentOpen$.subscribe(
        isOpen => {
          if(isOpen) this.leftComponentWidth = 200;
          else this.leftComponentWidth = 0;
      });
    });
  }
}
