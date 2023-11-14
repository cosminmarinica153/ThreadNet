import { Component, HostListener, ElementRef, Input } from "@angular/core";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'tn-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    animations: [
    trigger('fadeInOut', [
        state('void', style({ opacity: 0 })),
        transition(':enter', animate('300ms ease-in')),
        transition(':leave', animate('300ms ease-out')),
        ]),
    ],
})
export class HeaderComponent{
@Input() isLoggedIn: boolean; 
    isDropdownOpen = false;

    constructor(private elementRef: ElementRef){
        this.isLoggedIn = false;
    }

    // Dropdown Toggle management
    public toggleDropdown(){
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}