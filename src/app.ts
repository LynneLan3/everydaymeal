import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipe.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 路由
app.use('/api/v1/recipe', recipeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 