import { Component, Input, OnInit } from '@angular/core';
import { ThreadsService } from 'src/app/services/threads.service';
import { IThread } from '../../../interfaces/IThread';
import { Observable } from 'rxjs';
import { ThreadMarginService } from 'src/app/services/thread-margin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Array<IThread>;
  title: string;

  leftComponentWidth = 200;

  constructor(private threadsService: ThreadsService, private marginService: ThreadMarginService,
              private route: ActivatedRoute) {
    this.threads = []; 
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.title = params['category_name'];
      if(!this.title) 
        this.threads = this.threadsService.getAllThreads();
      else 
        this.threads = this.threadsService.getAllThreadsByCategory(this.title);
    });
  }
}
