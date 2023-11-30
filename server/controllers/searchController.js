const accountQueries = require("../database/queries/accountQueries");
const courseQueries = require("../database/queries/courseQueries");

async function getAllUsernames(req, res) {
  try {
    const usernames = await accountQueries.getAllUsernames();
    res.status(200).json({ usernames: usernames });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function getAllClasses(req, res) {
  console.log("[Info] Getting all classes...");

  try {
    const classes = await courseQueries.getAllClasses();
    res.status(200).json({ classes: classes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsernames,
  getAllClasses
};