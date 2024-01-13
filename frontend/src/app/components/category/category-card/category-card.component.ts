import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { ICategory } from "src/app/interfaces/TableInterfaces/ICategory";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: 'tn-category',
    templateUrl: 'category-card.component.html',
    styleUrls: ['category-card.component.css']
})
export class CategoryCardComponent implements OnInit{
@Input()categoryId: number;
    category: Observable<ICategory>;

    constructor(private router: Router,
                private categoryService: CategoryService) {}

    ngOnInit(){
        this.categoryService.getOne(this.categoryId).subscribe(data => {
            this.category = of(data);
        });
    }

    loadCategory(category_name: string){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/category', category_name]);
        });
    }
}
