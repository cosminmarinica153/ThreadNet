import { Component, Input, OnInit } from '@angular/core';
import { ThreadsService } from 'src/app/services/threads.service';
import { IThread } from '../../../interfaces/IThread';
import { ThreadMarginService } from 'src/app/services/thread-margin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InteractionsService } from 'src/app/services/interactions.service';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Array<IThread>;
  title: string;
  leftComponentWidth: number;

  constructor(private route: ActivatedRoute, private authService: AuthentificationService,
              private threadsService: ThreadsService, private interaction: InteractionsService,
              private marginService: ThreadMarginService) {
    this.threads = []; 
    this.leftComponentWidth = 200;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.title = params['category_name'];
      if(!this.title) 
        this.threads = this.threadsService.getAllThreads();
      else if(this.title == "My Threads")
        this.threads = this.threadsService.getUserThreads(this.authService.getUserId());
      else if(this.title == "My Favourites")
        this.interaction.getFavouriteThreads().forEach(thread_id => {
          this.threads.push(this.threadsService.getThreadById(thread_id));
        });
      else
        this.threads = this.threadsService.getAllThreadsByCategory(this.title);

      this.marginService.isLeftComponentOpen$.subscribe(
        isOpen => {
          if(isOpen) this.leftComponentWidth = 200;
          else this.leftComponentWidth = 0;
      })
    });
  }
}
