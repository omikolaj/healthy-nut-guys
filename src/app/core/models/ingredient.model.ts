export interface Ingredient {
  id?: string;
  mixCategoryId?: string;
  name?: string;
  inStock?: boolean;
}

export interface MixIngredientNode {
  id?: string;
  name?: string;
  inStock?: boolean;
  children?: MixIngredientNode[];
}
