import { z } from 'zod'
import { CategoriesApiResponseSchema,
  DrinksAPIResponse,
  SearchFilterSchema,
  Drink_APIResponse,
  RecipeAPIResponseSchema} from '../services/utils/recipesSchema'
export type Categories = z.infer<typeof CategoriesApiResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof Drink_APIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>