import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "src/app/services/authentification.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { IUser } from "src/app/interfaces/TableInterfaces/IUser";
import { Observable, finalize, map, of } from "rxjs";

@Component({
    selector: 'tn-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit{
    isLoggedIn: boolean;
    user: Observable<IUser>;

    constructor(private router: Router, private authService: AuthentificationService,
                private userService: UserService){
                }

    ngOnInit(){
      this.isLoggedIn = this.authService.isLoggedIn();

      let id: number;
      if(this.isLoggedIn){
        this.authService.getUserId().pipe(
          map(userId => { id = userId }),
          finalize(() => {
            this.userService.getOne(id).subscribe(data => {
              this.user = of(data);
            });
          })).subscribe();
      }
    }

    logout(){
        this.authService.logout();

        this.router.navigateByUrl('/logout', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/']);
        }).then(() => { window.location.reload() });
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
}
