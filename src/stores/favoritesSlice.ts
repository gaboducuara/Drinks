import { StateCreator } from 'zustand'
import { Recipe } from '../types/index';
import { createRecipesSlice, type RecipeSliceType } from './recipeSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExist: (id:Recipe['idDrink']) => boolean
  loadFromStorage: () => void
}
export const createFavoriteSlice : StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites:[],

  handleClickFavorite: (recipe) => {
    if(get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se elimino de favoritos',
        error: false
      })
    } else {
      set((state) => ({
        favorites: [ ...state.favorites , recipe]
      }))
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se Agrego a favoritos',
        error: false
      })
    }
    createRecipesSlice(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },

  favoriteExist: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites')
    if(storedFavorites){
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }
  }
})