import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tn-thread-header',
  templateUrl: './thread-header.component.html',
  styleUrls: ['./thread-header.component.css']
})
export class ThreadHeaderComponent implements OnInit {
@Input() title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkLoggedIn(){
    if(localStorage.getItem('token')) return
    this.router.navigate(['/login']);
  }

}
