import type { Bean, Recipe } from '../types';

const STORAGE_KEY_BEANS = 'cera_beans';
const STORAGE_KEY_RECIPES = 'cera_recipes';

// Basic initial data
const defaultBeans: Bean[] = [
  {
    id: 'bean-1',
    name: 'Ethiopia Yirgacheffe G1',
    roastery: 'Onyx Coffee Lab',
    roastPoint: 'Light',
    process: 'Washed',
    notes: ['Jasmine', 'Bergamot', 'Peach'],
  },
  {
    id: 'bean-2',
    name: 'Colombia El Paraiso',
    roastery: 'Sey Coffee',
    roastPoint: 'Medium-Light',
    process: 'Anaerobic',
    notes: ['Strawberry', 'Yogurt', 'Rose'],
  }
];

export const api = {
  // Beans
  getBeans: async (): Promise<Bean[]> => {
    const data = localStorage.getItem(STORAGE_KEY_BEANS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_BEANS, JSON.stringify(defaultBeans));
      return defaultBeans;
    }
    return JSON.parse(data);
  },
  
  saveBean: async (bean: Bean): Promise<void> => {
    const beans = await api.getBeans();
    beans.push(bean);
    localStorage.setItem(STORAGE_KEY_BEANS, JSON.stringify(beans));
  },

  // Recipes
  getRecipes: async (): Promise<Recipe[]> => {
    const data = localStorage.getItem(STORAGE_KEY_RECIPES);
    return data ? JSON.parse(data) : [];
  },

  saveRecipe: async (recipe: Recipe): Promise<void> => {
    const recipes = await api.getRecipes();
    // Prepend new recipe
    recipes.unshift(recipe);
    localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(recipes));
  },
  
  deleteRecipe: async (id: string): Promise<void> => {
    const recipes = await api.getRecipes();
    const filtered = recipes.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(filtered));
  }
};
