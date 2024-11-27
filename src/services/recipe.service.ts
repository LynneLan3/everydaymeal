import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { Recipe, RecipeStep, UserBehavior } from '../types/recipe';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class RecipeService {
  // 获取每日推荐
  async getDailyRecommendation(): Promise<Recipe> {
    try {
      const [rows]: any = await pool.execute(
        'SELECT * FROM recipe WHERE is_recommended = true AND recommend_date = CURDATE() LIMIT 1'
      );

      if (rows.length > 0) {
        return rows[0];
      }

      return await this.generateNewRecommendation();
    } catch (error) {
      throw new Error('获取推荐菜品失败');
    }
  }

  // 获取菜品步骤
  async getRecipeSteps(recipeId: string): Promise<RecipeStep[]> {
    try {
      const [rows]: any = await pool.execute(
        'SELECT * FROM recipe_step WHERE recipe_id = ? ORDER BY step_number',
        [recipeId]
      );
      return rows;
    } catch (error) {
      throw new Error('获取菜品步骤失败');
    }
  }

  // 记录用户行为
  async recordUserBehavior(behavior: UserBehavior): Promise<void> {
    try {
      await pool.execute(
        'INSERT INTO user_behavior (id, user_id, recipe_id, action_type) VALUES (?, ?, ?, ?)',
        [uuidv4(), behavior.user_id, behavior.recipe_id, behavior.action_type]
      );
    } catch (error) {
      throw new Error('记录用户行为失败');
    }
  }

  private async generateNewRecommendation(): Promise<Recipe> {
    try {
      // 获取最近7天未推荐的菜品
      const [rows]: any = await pool.execute(`
        SELECT * FROM recipe 
        WHERE id NOT IN (
          SELECT recipe_id FROM recipe 
          WHERE recommend_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        )
        ORDER BY RAND()
        LIMIT 1
      `);

      if (rows.length === 0) {
        throw new Error('没有可推荐的菜品');
      }

      const recipe = rows[0];

      // 更新推荐状态
      await pool.execute(
        'UPDATE recipe SET is_recommended = true, recommend_date = CURDATE() WHERE id = ?',
        [recipe.id]
      );

      return recipe;
    } catch (error) {
      throw new Error('生成新推荐失败');
    }
  }
} 