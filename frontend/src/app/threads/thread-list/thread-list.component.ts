import { Component, OnInit } from '@angular/core';
import { ThreadsService } from 'src/app/services/threads.service';
import { IThread } from '../IThread';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  threads: Array<IThread>;

  constructor(private threadsService: ThreadsService) { this.threads = []; }

  ngOnInit() {
    this.threadsService.getAllThreads().subscribe(
      data => {
        this.threads = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

}
