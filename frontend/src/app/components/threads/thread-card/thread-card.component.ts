import { Component, Input, OnInit } from '@angular/core';
import { IThread } from '../../../interfaces/IThread';
import { Router } from '@angular/router';

@Component({
  selector: 'tn-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
@Input() thread: IThread;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadThread(id: number){
    console.log(`Thread id: ${id}`);
  }

}
