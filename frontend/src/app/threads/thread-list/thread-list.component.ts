import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tn-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('data/threads.json').subscribe(
      data=>{
        this.threads = data;
        console.log(data);
      }
    );
  }

}
