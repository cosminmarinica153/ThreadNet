import { Component, OnInit, numberAttribute } from '@angular/core';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { ICategory } from 'src/app/interfaces/TableInterfaces/ICategory';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tn-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Observable<ICategory[]>;
  popular: Observable<ICategory[]>;
  favourites: Observable<ICategory[]>;

  isPopularOpen: boolean;
  isFavouritesOpen: boolean;
  isOtherOpen: boolean;

  isLoggedIn: boolean;

  constructor(private categoryService: CategoryService, private authService: AuthentificationService,
              private userService: UserService) {
    this.isPopularOpen = false;
    this.isFavouritesOpen = false;
    this.isOtherOpen = false;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.categoryService.getAll().subscribe(data => {
      this.categories = of(data);
    });

    this.categoryService.getTopCategories(5).subscribe(data => {
      this.popular = of(data);
    });

    let id: number;
    if(this.isLoggedIn)
      this.authService.getUserId().pipe(
        map(userId => {
          id = userId;
        }),
        finalize(() => {
          this.userService.getFavouriteCategories(id).subscribe(data => {
              this.favourites = of(data);
          });
        }));
  }
  // Category Toggles
  togglePopular() { this.isPopularOpen = !this.isPopularOpen; }
  toggleFavourites() { this.isFavouritesOpen = !this.isFavouritesOpen; }
  toggleOther() { this.isOtherOpen = !this.isOtherOpen; }
}
