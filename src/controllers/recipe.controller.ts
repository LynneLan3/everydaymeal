import { Request, Response } from 'express';
import { RecipeService } from '../services/recipe.service';

export class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  // 获取每日推荐
  getDailyRecommendation = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipe = await this.recipeService.getDailyRecommendation();
      res.json({
        code: 200,
        data: recipe
      });
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: error.message || '服务器内部错误'
      });
    }
  };

  // 获取菜品步骤
  getRecipeSteps = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const steps = await this.recipeService.getRecipeSteps(id);
      res.json({
        code: 200,
        data: {
          dish_id: id,
          steps
        }
      });
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: error.message || '服务器内部错误'
      });
    }
  };

  // 记录用户行为
  recordUserBehavior = async (req: Request, res: Response): Promise<void> => {
    try {
      const behavior = req.body;
      await this.recipeService.recordUserBehavior(behavior);
      res.json({
        code: 200,
        message: 'success'
      });
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: error.message || '服务器内部错误'
      });
    }
  };
} 