const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

// Import models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Category = require('./category');

// Define model associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Post, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Sync all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });  // Set force: true to drop tables and recreate them
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

syncModels();

module.exports = { User, Post, Comment, Category };
