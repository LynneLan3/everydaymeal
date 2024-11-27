export interface Recipe {
  id: string;
  name: string;
  cover_image: string;
  description: string;
  cooking_time: number;
  difficulty: number;
  is_recommended: boolean;
  recommend_date: Date;
}

export interface RecipeStep {
  id: string;
  recipe_id: string;
  step_number: number;
  instruction: string;
  timer_required: boolean;
  timer_duration: number;
}

export interface UserBehavior {
  id?: string;
  user_id: string;
  recipe_id: string;
  action_type: 'skip' | 'start' | 'complete';
} 