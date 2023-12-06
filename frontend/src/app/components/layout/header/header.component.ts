import { Component } from "@angular/core";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'tn-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent{
    isDropdownOpen: boolean;
    isLoggedIn: boolean;
    username: string;

    constructor(private router: Router, private authService: AuthentificationService,
                private userService: UserService){
        this.isDropdownOpen = false;
        this.isLoggedIn = this.authService.isLoggedIn();
        if(this.authService.isLoggedIn()) this.username = userService.getUsernameById(this.authService.getUserId());
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

    public toggleDropdown(){
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}