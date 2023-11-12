// Imports
const { User, Thought, Reaction } = require("../models");
const mongoose = require('mongoose');

const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "Nomin",
    email: "nomin@yahoo.com",
    thought: [],
  },
];

console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await User.deleteMany({});

  // Adds seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeded successfully.");
  process.exit(0);
});