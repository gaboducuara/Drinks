import type { StateCreator } from 'zustand'
import { getCategories, getRecipeById, getRecipes } from '../services/RecipeService'
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from '../types'
import type { FavoritesSliceType } from './favoritesSlice'
export type RecipeSliceType = {
  categories: Categories,
  drinks: Drinks,
  selectedRecipe: Recipe
  modal: boolean
  fetchCategories : () => Promise<void>,
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>,
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
}
export const createRecipesSlice:StateCreator<RecipeSliceType & FavoritesSliceType, [], [], RecipeSliceType> = (set) => ({
  categories:{
    drinks: []
  },
  drinks: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters)
    set({
      drinks
    })
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id)
    set({
      selectedRecipe,
      modal: true
    })
  },
  closeModal: async () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})