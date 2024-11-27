-- 创建数据库
CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

-- 菜品表
CREATE TABLE IF NOT EXISTS recipe (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '菜品名称',
    cover_image TEXT NOT NULL COMMENT '封面图片',
    description TEXT COMMENT '菜品描述',
    cooking_time INT COMMENT '烹饪时间(分钟)',
    difficulty INT DEFAULT 1 COMMENT '难度等级 1-5',
    is_recommended BOOLEAN DEFAULT false COMMENT '是否被推荐',
    recommend_date DATE COMMENT '推荐日期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 菜品步骤表
CREATE TABLE IF NOT EXISTS recipe_step (
    id VARCHAR(32) PRIMARY KEY,
    recipe_id VARCHAR(32) NOT NULL COMMENT '关联菜品ID',
    step_number INT NOT NULL COMMENT '步骤序号',
    instruction TEXT NOT NULL COMMENT '步骤说明',
    image TEXT COMMENT '步骤图片',
    timer_duration INT DEFAULT 0 COMMENT '计时时长(秒)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

-- 用户行为表
CREATE TABLE IF NOT EXISTS user_behavior (
    id VARCHAR(32) PRIMARY KEY,
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(32) NOT NULL COMMENT '菜品ID',
    action_type ENUM('skip', 'start', 'complete') NOT NULL COMMENT '行为类型',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
); 