import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/TableInterfaces/ICategory';

import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoryService } from 'src/app/services/category.service';
import { InteractionsService } from 'src/app/services/interactions.service';

import { NotFoundError } from 'rxjs';

@Component({
  selector: 'tn-thread-header',
  templateUrl: './thread-header.component.html',
  styleUrls: ['./thread-header.component.css']
})
export class ThreadHeaderComponent implements OnInit {
@Input() categoryId: number;
  category: ICategory;

  title: string;
  keyword: string;

  isFavouriteCategory: boolean;

  constructor(private router: Router, private authService: AuthentificationService,
              private interaction: InteractionsService, private categoryService: CategoryService) {
    this.isFavouriteCategory = false;
  }

  ngOnInit() {
    if(this.router.url != "/category/My%20Threads" && this.router.url != "/category/My%20Favourites" && this.router.url != "/")
    {
      this.categoryService.getOne(this.categoryId).subscribe(
        data => {
          this.category = data;
      });
      this.title = this.category.name;
    }
    if(this.router.url === '/') this.title = 'Other'
  }

  isLoggedIn(){
    if(!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  addToFavourites(){
    throw NotFoundError;
  }

  onSubmit(){
    this.router.navigate(['/category', this.title, 'search'], {
      queryParams: { keyword: this.keyword }
    });
  }

  sortBy(type: string, order: string){
    const sort = {type: type, order: order};
    this.interaction.setSort(sort);

    const url = decodeURI(this.router.url);
    this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

}
