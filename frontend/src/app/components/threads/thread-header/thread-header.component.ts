import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tn-thread-header',
  templateUrl: './thread-header.component.html',
  styleUrls: ['./thread-header.component.css']
})
export class ThreadHeaderComponent implements OnInit {
@Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
