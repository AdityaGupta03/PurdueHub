const calendarQueries = require("../database/queries/calendarQueries");
const accountQueries = require("../database/queries/accountQueries");
const helperFuncs = require("./helperFunctions");

async function addFollower(req, res) {
    const { user_id } = req.body;
    const { org_id  } = req.body;
    let db_res = await accountQueries.addFollowerQuery(user_id, org_id);
    if (db_res == true) {
        console.log("Intrested person added succesfully");
        res.status(200).json({ message: "Intrested person added succesfully" });
    } else {
        console.log("Error adding intrested person");
        res.status(400).json({ message: "Error adding intrested person" });
    }
}

async function unfollowOrg(req, res) {
    const { user_id } = req.body;
    const { org_id } = req.body;
    let db_res = await accountQueries.unfollowOrgQuery(user_id, org_id);
    if (db_res == true) {
        console.log("Club removed succesfully");
        return res.status(200).json({ message: "Club removed succesfully" });
    } else {
        console.log("Its null!");
        return res.status(400).json({ message: "Error removing club" });
    }
}

async function isFollowingOrg(req, res) {

    const user_id = req.body.user_id;
    const org_id = req.body.org_id;

    let db_res = await accountQueries.isFollowingOrgQuery(user_id, org_id);
    if (db_res == true) {
        console.log("User is following org");
        return res.status(200).json({ message: "User is following org" });
    }

    return res.status(400).json({ message: "User is not following org" });

}

async function getFriendsOrg(req, res) {
    console.log("getFriendsOrg");
    console.log(req.body);

    const { user_id, org_id } = req.body;

    let db_res = await accountQueries.friendsWhoFollowClubQuery(user_id, org_id);
    console.log("After query");
    console.log(db_res);
    if (db_res == null) {
        console.log("Its null!");
        return res.status(400).json({ message: "Error getting friends" });
    }

    console.log(db_res.rows);

    return res.status(200).json({ friends: db_res.rows });

}

module.exports = {
    addFollower,
    unfollowOrg,
    isFollowingOrg,
    getFriendsOrg,
};