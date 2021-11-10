"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const clothesModel = require("./clothes/model");
const foodModel = require("./food/model");
const userModel = require("./users");
const Collection = require("./data-collection");

const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? "sqlite:memory:"
    : process.env.DATABASE_URL || "postgres://localhost:5432/smallProject";
const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};
