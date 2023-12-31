const pool = require("../db");

async function isUniqueUsernameQuery(username) {
  const query = "SELECT COUNT(*) FROM users WHERE username = $1";
  const data = [ username ];

  console.log(query);
  console.log(data);
  try {
    const db_res = await pool.query(query, data);
    const numFound = db_res.rows[0].count;
    console.log(numFound);
    
    return numFound == 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createAccountQuery(username, email, password) {
  const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id";
  const data = [username, email, password];

  try {
    let { rows } = await pool.query(query, data);
    return rows[0].user_id;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return -1;
  }
}

async function updateUsernameQuery(email, newUsername) {
  const query = "UPDATE users SET username = $1 WHERE email = $2";
  const data = [newUsername, email];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function updateUsernameFromIDQuery(user_id, newUsername) {
  const query = "UPDATE users SET username = $1 WHERE user_id = $2";
  const data = [ newUsername, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function getUserInfoQuery(user_id) {
  const query = "SELECT username, profile_picture, bio FROM users WHERE user_id = $1";
  const data = [user_id];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0];
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function checkAccountFromEmailQuery(email) {
  const query = "SELECT * FROM users where email = $1";
  const data = [email];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function checkAccountFromUsernameQuery(username) {
  const query = "SELECT * FROM users where username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    console.log("Username exists: " + db_res.rows.length > 0);
    return db_res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getUserInfoFromUsernameQuery(username) {
  const query = "SELECT * FROM users where username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows[0];
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return null;
  }
}

async function blockUserQuery(block_user_id, user_id) {
  const query = "UPDATE users SET blocked = array_append(blocked, $1) WHERE user_id = $2";
  const data = [ block_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function unblockUserQuery(unblock_user_id, user_id) {
  const query = "UPDATE users SET blocked = array_remove(blocked, $1) WHERE user_id = $2";
  const data = [ unblock_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function getFollowedUsersQuery(user_id) {
  const query = "SELECT array_agg(username) AS following FROM users WHERE user_id = ANY(SELECT unnest(follow) FROM users WHERE username = $1)";
  const data = [ user_id ];

  try {
    const follow_list = pool.query(query, data);
    return follow_list;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUsernamesFromIDSQuery(user_ids) {
  const query = "SELECT username FROM users WHERE user_id = ANY($1)";
  const data = [ user_ids ];

  try {
    const usernames = pool.query(query, data);
    return usernames;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function followUserQuery(user_id, to_follow_user_id) {
  const query = "UPDATE users set follow = array_append(follow, $1) WHERE user_id = $2";
  const data = [ to_follow_user_id, user_id ];
  
  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addCalendarIdQuery(user_id, calendar_id) {
  const query = "UPDATE users SET calendar_id = $1 WHERE user_id = $2";
  const data = [ calendar_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.log("[ERROR] " + error);
    return false;
  }
}


async function unfollowUserQuery(user_id, to_unfollow_user_id) {
  const query = "UPDATE users set follow = array_remove(follow, $1) WHERE user_id = $2";
  const data = [ to_unfollow_user_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (err) {
    console.log("[ERROR] " + err.message);
    return false;
  }
}

async function getBlockListQuery(user_id) {
  const query = "SELECT array_agg(username) AS blocked_username FROM users WHERE user_id = ANY(SELECT unnest(blocked) FROM users WHERE username = $1);";
  const data = [ user_id ];

  try {
    const usernames = await pool.query(query, data);
    return usernames;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function getFollowedByUsersQuery(user_id) {
  const query = "SELECT array_agg(u.username) AS followers FROM users AS u WHERE u.user_id = ANY(SELECT user_id FROM users WHERE $1 = ANY(users.follow))";
  const data = [ user_id ];

  try {
    const usernames = pool.query(query, data);
    return usernames;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updatePasswordQuery(username, password) {
  const query = "UPDATE users SET password = $1 WHERE username = $2";
  const data = [ password, username ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function loginQuery(username, password) {
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const data = [ username, password ];

  try {
    const db_res = await pool.query(query, data);
    console.log("User to login: " + db_res.rows[0].user_id);
    return db_res.rows[0].user_id;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

async function deleteAccountQuery(user_id) {
  const query = "DELETE FROM users WHERE user_id = $1";
  const data = [ user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editBioQuery(bio, user_id) {
  const query = "UPDATE users SET bio = $1 WHERE user_id = $2";
  const data = [ bio, user_id ];

  try {
      await pool.query(query, data);
      return true;
    } catch (err) {
      console.log("[ERROR] " + err.message);
      return false;
    }
}

async function updateProfilePicQuery(profile_picture, username) {
  const query = "UPDATE users SET profile_picture = $1 WHERE username = $2";
  const data = [ profile_picture, username ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function checkBannedQuery(username) {
  const query = "SELECT banned FROM users WHERE username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    console.log(db_res.rows[0].banned);
    return db_res.rows[0].banned == 1;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function checkDeleteQuery(username) {
  const query = "SELECT markdeleted FROM users WHERE username = $1";
  const data = [ username ];

  try {
    const db_res = await pool.query(query, data);
    console.log(db_res.rows[0].markdeleted);
    return db_res.rows[0].markdeleted == 1;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function banAccountQuery(user_id) {
  const query = "UPDATE users SET banned = 1, banemail = 1 WHERE user_id = $1";
  const data = [ user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function markDeleteAccountQuery(user_id) {
  const query = "UPDATE users SET markdeleted = 1, deleteemail = 1 WHERE user_id = $1";
  const data = [ user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function revokeBanQuery(user_id) {
  const query = "UPDATE users SET banned = 0, banemail = 0, markdeleted = 0, deleteemail = 0 WHERE user_id = $1";
  const data = [user_id];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getMutualFriendsQuery(user_id, other_user_id) {
  const query = "SELECT array_agg(username) AS mutual_friends FROM users WHERE user_id = ANY(SELECT unnest(follow) FROM users WHERE user_id = $1) AND user_id = ANY(SELECT unnest(follow) FROM users WHERE user_id = $2)";
  const data = [ user_id, other_user_id ];

  try {
    const mutual_friends = await pool.query(query, data);
    return mutual_friends;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMutualOrgsQuery(user_id, other_user_id) {
  const query = "SELECT array_agg(name) AS mutual_orgs FROM organization WHERE org_id = ANY(SELECT unnest(saved_orgs) FROM users WHERE user_id = $1) AND org_id = ANY(SELECT unnest(saved_orgs) FROM users WHERE user_id = $2)";
  const data = [ user_id, other_user_id ];

  try {
    const mutual_orgs = await pool.query(query, data);
    return mutual_orgs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function checkUserBlocked(sender_id, reciever_id) {
  const query = "SELECT * FROM users WHERE user_id = $1 AND $2 = ANY(blocked)";
  const data = [ reciever_id, sender_id ];

  try {
    let db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function isFollowing(first_id, second_id) {
  const query = "SELECT * FROM users WHERE user_id = $1 AND $2 = ANY(follow)";
  const data = [ first_id, second_id ];

  try {
    let db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function toggleDM(user_id, option) {
  const query = "UPDATE users SET togglemsgs = $1 WHERE user_id = $2";
  const data = [ option, user_id ];

  console.log("Toggling DM option for user: " + user_id + " to " + option);

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function isOnlyFollowing(user_id) {
  const query = "SELECT togglemsgs FROM users WHERE user_id = $1";
  const data = [ user_id ];

  try {
    let db_res = await pool.query(query, data);
    return db_res.rows[0].togglemsgs == 1;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsernames() {
  const query = "SELECT username FROM users";
  const data = [];

  try {
    let db_res = await pool.query(query, data);
    return db_res.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function setPreferencesQuery(user_id, professional_development, club_callouts, disable_all) {

	const query = "UPDATE users SET professional_development = $1, club_callouts = $2 ,disable_all = $3  WHERE user_id = $4";
	const data = [ professional_development, club_callouts, disable_all, user_id ];

	try {
		await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }

}

async function getPreferencesQuery(user_id, professional_development, club_callouts, disable_all) {

	const query = "SELECT professional_development, club_callouts, disable_all FROM users WHERE user_id = $1";
	const data = [ user_id ];

	try {
		let db_res = await pool.query(query, data);
		return db_res;
	} catch (error) {
		console.log(error);
		return null;
	}
    
}

async function getInterestedEventsClubQuery(user_id) {

  const query = `SELECT DISTINCT ce.id, ce.title, ce.description
  FROM calendar_events ce
  JOIN users u ON ce.club_callouts = 1 AND u.club_callouts = 1 AND ce.id = ANY(u.interested_events) WHERE u.user_id = $1`;
  const data = [ user_id ];
  
  try {
      const db_res = await pool.query(query, data);
      return db_res;
  } catch (error) {
      console.log(error);
      return false;
    }
}

async function getInterestedEventsProfQuery(user_id) {

  const query = `SELECT DISTINCT ce.id, ce.title, ce.description
  FROM calendar_events ce
  JOIN users u ON ce.professional_development = 1 AND u.professional_development = 1 AND ce.id = ANY(u.interested_events) WHERE u.user_id = $1`;
  const data = [ user_id ];
  
  try {
      const db_res = await pool.query(query, data);
      return db_res;
  } catch (error) {
      console.log(error);
      return false;
    }
}

async function addFollowerQuery(user_id, org_id) {
  const query = 'UPDATE organization SET followers = ARRAY_APPEND(followers, $1) WHERE org_id = $2'
  const data = [ user_id, org_id ];

  const query2 = 'UPDATE users SET saved_orgs = ARRAY_APPEND(saved_orgs, $1) WHERE user_id = $2'
  const data2 = [ org_id, user_id ];
  try {
      const db_res = await pool.query(query, data);
      await pool.query(query2, data2);
      return true;
  } catch (error) {
      console.log(error);
      return false;
  }
}

async function unfollowOrgQuery(user_id, org_id) {
  const query = 'UPDATE organization SET followers = ARRAY_REMOVE(followers, $2) WHERE org_id = $1'
  const data = [ org_id, user_id ];

  const query2 = 'UPDATE users SET saved_orgs = ARRAY_REMOVE(saved_orgs, $2) WHERE user_id = $1'
  const data2 = [ user_id, org_id ];
  try {
      const db_res = await pool.query(query, data);
      await pool.query(query2, data2);
      return true;
  } catch (error) {
      console.log(error);
      return false;
  }
}

async function isFollowingOrgQuery(user_id, org_id) {

  const query = "SELECT * FROM organization WHERE org_id = $1 AND $2 = ANY(followers)";
  const data = [ org_id, user_id ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  
  }

}

async function friendsWhoFollowClubQuery(user_id, org_id) {
  const query = `
  SELECT u.username
  FROM users u
  INNER JOIN organization o ON o.org_id = $1
  WHERE u.user_id = ANY(o.followers) AND u.user_id IN (SELECT unnest(follow) FROM users WHERE user_id = $2);`;
  const data = [ org_id, user_id ];
  
  try {
    let db_res = pool.query(query, data);
    return db_res;
  } catch (error) {
    console.error(error);
    return null;
  
  }

}

async function updateTutorialQuery(username) {
  const query = "UPDATE users SET tutorial = 0 WHERE username = $1";
  const data = [ username ];
  
  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
   console.error(erorr)
    return false;
  }
}

async function setAdviceQuery(user_id, toggleAdvice) {
  const query = "UPDATE users SET send_advice = $1 WHERE user_id = $2";
  const data = [ toggleAdvice, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getFollowedOrgsQuery(user_id) {
  const query = "SELECT array_agg(name) AS followed_orgs FROM organization WHERE org_id = ANY(SELECT unnest(saved_orgs) FROM users WHERE user_id = $1)";
  const data = [ user_id ];

  try {
    const orgs = await pool.query(query, data);
    return orgs;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function favoriteCourseQuery(user_id, course_id) {
  const query = "UPDATE users SET saved_courses = array_append(saved_courses, $1) WHERE user_id = $2";
  const data = [ course_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


async function unfavoriteCourseQuery(user_id, course_id) {
  const query = "UPDATE users SET saved_courses = array_remove(saved_courses, $1) WHERE user_id = $2";
  const data = [ course_id, user_id ];

  try {
    await pool.query(query, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getFavoriteCoursesQuery(user_id) {
  const query = "SELECT array_agg(name) AS saved_courses FROM course WHERE id = ANY(SELECT unnest(saved_courses) FROM users WHERE user_id = $1)";
  const data = [ user_id ];

  try {
    const courses = await pool.query(query, data);
    return courses;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function isFavoriteCourseQuery(user_id, course_id) {
  const query = "SELECT * FROM users WHERE user_id = $1 AND $2 = ANY(saved_courses)";
  const data = [ user_id, course_id ];

  try {
    const db_res = await pool.query(query, data);
    return db_res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  isUniqueUsernameQuery,
  updateUsernameQuery,
  createAccountQuery,
  getUserInfoQuery,
  checkAccountFromEmailQuery,
  getUserInfoFromUsernameQuery,
  blockUserQuery,
  unblockUserQuery,
  checkAccountFromUsernameQuery,
  getFollowedUsersQuery,
  getUsernamesFromIDSQuery,
  getFollowedByUsersQuery,
  followUserQuery,
  unfollowUserQuery,
  addCalendarIdQuery,
  getBlockListQuery,
  updatePasswordQuery,
  loginQuery,
  deleteAccountQuery,
  updateUsernameFromIDQuery,
  editBioQuery,
  updateProfilePicQuery,
  checkBannedQuery,
  checkDeleteQuery,
  banAccountQuery,
  markDeleteAccountQuery,
  revokeBanQuery,
  getMutualFriendsQuery,
  getMutualOrgsQuery,
  checkUserBlocked,
  isFollowing,
  toggleDM,
  isOnlyFollowing,
  getAllUsernames,
  setPreferencesQuery,
  getPreferencesQuery,
  getInterestedEventsClubQuery,
  getInterestedEventsProfQuery,
  addFollowerQuery,
  unfollowOrgQuery,
  isFollowingOrgQuery,
  friendsWhoFollowClubQuery,
  updateTutorialQuery,
  setAdviceQuery,
  getFollowedOrgsQuery,
  favoriteCourseQuery,
  unfavoriteCourseQuery,
  getFavoriteCoursesQuery,
  isFavoriteCourseQuery,
};