import { Component, Input, OnInit } from '@angular/core';
import { ThreadsService } from 'src/app/services/threads.service';
import { IThread } from '../IThread';
import { Observable } from 'rxjs';
import { ThreadMarginService } from 'src/app/services/thread-margin.service';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Array<IThread>;

  leftComponentWidth = 200;

  constructor(private threadsService: ThreadsService, private marginService: ThreadMarginService) {
    this.threads = []; 
  }

  ngOnInit() {
    this.threadsService.getAllThreads().subscribe(
      data => {
        this.threads = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
    this.marginService.isLeftComponentOpen$.subscribe((isOpen) => {
      this.leftComponentWidth = isOpen ? 200 : 0;
    });
  }
}
