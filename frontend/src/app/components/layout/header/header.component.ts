import { Component, HostListener, ElementRef, Input } from "@angular/core";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";

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
    isDropdownOpen = false;

    constructor(private router: Router, private elementRef: ElementRef,
                private authService: AuthentificationService){
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    logout(){
        this.authService.logout();
        this.router.navigateByUrl('/logout', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/']);
        });
    }

    loadMyThreads(){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/category', "My Threads"])
        });
    }

    loadMyFavourites(){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/category', "My Favourites"])
        });
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