const accountQueries = require("../database/queries/accountQueries");

async function getAllUsernames(req, res) {
    try {
        const usernames = await accountQueries.getAllUsernames();
        res.status(200).json({ usernames: usernames });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

module.exports = {
    getAllUsernames
};