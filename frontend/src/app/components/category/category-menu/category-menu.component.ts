import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThreadMarginService } from 'src/app/services/thread-margin.service';

@Component({
  selector: 'tn-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css'],
  // animations: [
  //   trigger('fadeInOut', [
  //     state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
  //     transition(':enter', [
  //       animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
  //     ])
  //   ])
  // ]
})
export class CategoryMenuComponent implements OnInit {
  isOpen = true;
  btnHide = 25;

  constructor(private marginService: ThreadMarginService) { }

  ngOnInit() {
  }

  public toggleCategory(){
    this.isOpen = !this.isOpen;
    this.marginService.toggleLeftComponent();
  }

}
