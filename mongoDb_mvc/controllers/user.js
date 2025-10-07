import User from "../models/userModels.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
  </ul>`;
  console.log(html);

  return res.status(200).send(html);
};

const registerUser = async (req, res) => {
  const body = req.body;
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  await user.save();
  return res.status(200).json("User Created successfully");
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName } = req.body;
  const user = await User.findByIdAndUpdate(userId, { firstName, lastName });
  res.status(200).json(`User with id:${userId} updated successfully `);
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId, {});
  res.status(200).json(`User with id:${userId} Deleted successfully `);
};

export { getAllUsers, registerUser, updateUser, deleteUser };
