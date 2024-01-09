import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'tn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ThreadNet';
  isLoggedIn = false;

  baseMargin = 50;

  constructor(private http: HttpClient){}

}
