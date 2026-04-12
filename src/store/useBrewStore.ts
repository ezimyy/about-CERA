import { create } from 'zustand';
import { api } from '../services/api';
import type { Bean, Recipe } from '../types';

interface BrewState {
  beans: Bean[];
  recipes: Recipe[];
  isLoading: boolean;
  
  // Actions
  fetchData: () => Promise<void>;
  addRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  addBean: (bean: Bean) => Promise<void>;
}

export const useBrewStore = create<BrewState>((set) => ({
  beans: [],
  recipes: [],
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [fetchedBeans, fetchedRecipes] = await Promise.all([
        api.getBeans(),
        api.getRecipes()
      ]);
      set({ beans: fetchedBeans, recipes: fetchedRecipes });
    } finally {
      set({ isLoading: false });
    }
  },

  addRecipe: async (recipe) => {
    await api.saveRecipe(recipe);
    set((state) => ({ recipes: [recipe, ...state.recipes] }));
  },

  deleteRecipe: async (id) => {
    await api.deleteRecipe(id);
    set((state) => ({ recipes: state.recipes.filter(r => r.id !== id) }));
  },

  addBean: async (bean) => {
    await api.saveBean(bean);
    set((state) => ({ beans: [...state.beans, bean] }));
  }
}));
