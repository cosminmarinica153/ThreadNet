import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ICategory } from "src/app/interfaces/ICategory";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: 'tn-category',
    templateUrl: 'category-card.component.html',
    styleUrls: ['category-card.component.css']
})
export class CategoryCardComponent implements OnInit{
@Input()category_id: number;
    category: ICategory;

    constructor(private router: Router,
                private categoryService: CategoryService) {}

    ngOnInit(){
        this.category = this.categoryService.getCategoryById(this.category_id);
    }

    loadCategory(category_name: string){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/category', category_name]);
        });
    }
}