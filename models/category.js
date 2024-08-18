const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Reflects the unique constraint on the `name` column
    },
  },
  {
    sequelize,
    modelName: 'Category', // Use the singular form for modelName
    tableName: 'categories', // Matches the existing table name
    timestamps: false,       // Set to true if your table has timestamp columns
    freezeTableName: true,   // Ensures the table name is not pluralized
    underscored: true,       // Use underscores for column names (if needed)
  }
);

module.exports = Category;
