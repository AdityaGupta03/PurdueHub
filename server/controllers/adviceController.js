const accountQueries = require("../database/queries/accountQueries");

async function setAdviceAPI(req, res) {

  console.log("[INFO] Set Advice API.");

  const { user_id, toggleAdvice } = req.body;
  console.log("Setting advice to " + toggleAdvice + " for user: " + user_id);

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id field." });
  }

  if (!toggleAdvice) {
    return res.status(400).json({ error: "Missing toggleAdvice field." });
  }

  if (toggleAdvice != 0 && toggleAdvice != 1) {
    return res.status(400).json({ error: "Invalid option." });
  }

  let db_res = await accountQueries.setAdviceQuery(user_id, toggleAdvice);
  if (db_res == false) {
    return res.status(500).json({ error: "Internal Server Error." });
  }

  console.log("Successfully set advice setting.");
  return res.status(200).json({ message: "Successfully set advice setting." });

}

const adviceArr = [
  "Check out the calendar page to view, create, and edit your events!",
  "You can search for other users using the search bar in the Username Lookup page!",
  "You can ban other users by going to their user profile and hitting the ban button!",
  "Send messages to other users through our emailing system using the Send Email page!",
  "You can view if another user has the same friends/followers as you in the View Mutuals page!",
  "Testing: Failed"
];

async function getAdvice(req, res) {

  console.log("[INFO] Get Advice to show");
  let ind = getIndex(0, adviceArr.length - 1);
  return res.status(200).json({ advice: adviceArr[ind] });

}

function getIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

module.exports = {
  setAdviceAPI,
  getAdvice
};