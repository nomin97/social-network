// Imports
const router = require("express").Router();

// Imports functions written in userController.js file
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("/controllers/userController");

// /api/users
router.route('/').get(getUsers).post(createUser);

// api/SingleUser
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId
router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend);

// Exports
module.exports = router;