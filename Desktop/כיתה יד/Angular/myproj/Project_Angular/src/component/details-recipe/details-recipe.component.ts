import { Component } from '@angular/core';
import { IngredientRecipeService } from '../../services/ingredientRecipe/ingredient-recipe.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Ingredient } from '../../interface/ingredient';
import { Recipe } from '../../interface/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientRecipe } from '../../interface/ingredientRecipe';
import { InstructionsPipe } from '../../pipes/instructions.pipe';

@Component({
  selector: 'app-details-recipe',
  imports: [CommonModule, RouterLink, InstructionsPipe],
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.css'
})
export class DetailsRecipeComponent {
  constructor(private ingredientRecipeService: IngredientRecipeService,
    private route: ActivatedRoute, private recipeservice: RecipeService) { }
  
  id: number = 0
  arr: Array<Ingredient> = []
  ingredientAmounts: { [id: number]: string } = {};
  recipe: Recipe = {
    id: 0,
    name: "",
    description: "",
    pic: "",
    level: "",
    duration: "",
    amount: 0,
    instructions: "",
    userId: 0
  }

  getById(idIng: number) {
    this.ingredientRecipeService.getById(this.recipe.id, idIng).subscribe({
      next: (data) => {
        debugger
        console.log("success")
        this.ingredientAmounts[idIng] = data.amount;
        console.log(this.ingredientAmounts)
      },
      error: (err) => {
        debugger
        console.log(err)
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const idParam = param.get('id')
      if (idParam) {
        this.id = +idParam
        this.ingredientRecipeService.getIngredientRecipe(this.id).subscribe({
          next: (data) => {
            this.arr = data
            this.recipeservice.getById(this.id).subscribe({
              next: (x) => {
                debugger
                this.recipe = x
                for (let index = 0; index < this.arr.length; index++) {
                  this.getById(this.arr[index].id)
                }
              },
              error: (err) => {
                console.log(err)
              }
            })
          },
          error: (err) => {
            debugger
            console.log(err)
          }
        })
      }
    })
  }

  getImageUrl(im: string): string {
    return `https://localhost:7261/images/${encodeURIComponent(im)}`;
  }

  trackByIngredientId(index: number, ingredient: Ingredient): number {
    return ingredient.id;
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
