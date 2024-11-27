import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller';

const router = Router();
const recipeController = new RecipeController();

router.get('/recommendation', recipeController.getDailyRecommendation);
router.get('/:id/steps', recipeController.getRecipeSteps);
router.post('/behavior', recipeController.recordUserBehavior);

export default router; 