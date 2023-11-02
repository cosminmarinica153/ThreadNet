import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread : any;

  constructor() { }

  ngOnInit() {
  }

}
