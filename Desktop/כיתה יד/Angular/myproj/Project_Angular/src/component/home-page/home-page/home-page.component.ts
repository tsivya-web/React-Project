import { Component } from '@angular/core';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Recipe } from '../../../interface/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private recipeService:RecipeService ){}
  
  arr:Array<Recipe>=[];
  
  ngOnInit(){
    this.recipeService.get().subscribe({
      next:(data)=>{
        debugger
        this.arr=data
      },
      error:err=>{
        debugger
        console.log(err)
      }
    })
  }

  getImageUrl(im:string): string {
     return `https://localhost:7261/images/${encodeURIComponent(im)}`;
  }

  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

  getLevelClass(level: string): string {
    switch(level.toLowerCase()) {
      case 'easy':
      case 'קל':
        return 'easy';
      case 'medium':
      case 'בינוני':
        return 'medium';
      case 'hard':
      case 'קשה':
        return 'hard';
      default:
        return 'medium';
    }
  }

  getDifficultyClass(level: string): string {
    switch(level) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return 'difficulty-easy';
    }
  }

  getDifficultyText(level: string): string {
    switch(level) {
      case 'Easy':
        return 'Easy';
      case 'Medium':
        return 'Medium';
      case 'Hard':
        return 'Hard';
      default:
        return 'Easy';
    }
  }
}