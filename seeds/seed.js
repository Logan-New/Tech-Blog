const sequelize = require('./config/connection');
const { User, Post, Comment } = require('./models/Index');

const userData = require('./seeds/userData.json');
const postData = require('./seeds/postData.json');
const commentData = require('./seeds/commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
