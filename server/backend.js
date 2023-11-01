// FUCNTION:	setPreferences
// INPUT:		request user_id, professional_development, club_callouts, disable_all
// RETURNS:		true or false
// Set users event tags with either 1 (yes) or 0 (no)
// Disable has not been implemented
async function setPreferences(req, res) {
	const { user_id } = req.body;
	const { professional_development } = req.body;
	const { club_callouts } = req.body;
	const { disable_all } = req.body;
	let db_res = await accountQueries.setPreferencesQuery(user_id, professional_development, club_callouts, disable_all);
	if (db_res == true) {
		console.log("Preferences sucessfully set!");
	}
}
// QUERY FUNCTION
async function setPreferencesQuery(user_id, professional_development, club_callouts, disable_all) {
	const query = `UPDATE purduehub SET professional_development = $1 , club_callouts = $2 , disable_all = $3  WHERE user_id = $3`;
	const data = [ professional_development, club_callouts, disable_all, user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

// FUCNTION:	setPreferences
// INPUT:		request user_id, event_id
// RETURNS:		true or false
// Function to check if an event is already in the user's event list
async function checkEvent(user_id, event_id) {
	let db_res = await accountQueries.checkEventQuery(user_id, event_id);
	if (db_res == true) {
		return true;
	} else {
		return false;
	}
}
// QUERY FUNCTION
async function checkEventQuery(user_id, event_id) {
	const query = `SELECT * FROM purduehub WHERE $1 = ANY(intrested_events) AND user_id = $2`;
	const data = [ event_id, user_id ];
	const db_res = await pool.query(query, data);
	if (db_res == null) {
		return true;
	} else {
		return false;
	}
	
}

// new table called clubs
// assume new column in purduehub called intrested_events int[]   (array type)
// FUCNTION:	addIntrestedEvent
// INPUT:		request user_id, event_id
// RETURNS:		true or false
// Adds an intrested event to the user's list
// THIS FUNCTION CHECKS FOR DUPLICATE EVENTS
async function addIntrestedEvent(req, res) {
	const { user_id } = req.body;
	const { event_id } = req.body;
	// check if event already in user's intrested list
	if (checkEvent(user_id, event_id) == true) {
		console.log("This event was is already in the list")
		return false;
	}
	let db_res = await accountQueries.addIntrestedEventQuery(user_id, event_id);
	if (db_res == true) {
		console.log("Added intrested event succesfully");
		return true;
	}
} 
// QUERY FUNCTION
async function addIntrestedEventQuery(user_id, event_id) {
	const query = `UPDATE purduehub SET intrested_events = ARRAY_APPEND(intrested_events, $1) WHERE user_id = $2`;
	const data = [ event_id, user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

// FUCNTION:	removeIntrestedEvent
// INPUT:		request user_id, event_id
// RETURNS:		true or false
// Removes an event from the user's intrested event list.
async function removeIntrestedEvent(req, res) {
	const { user_id } = req.body;
	const { event_id } = req.body;
	let db_res = await accountQueries.removeIntrestedEventQuery(user_id, event_id);
	if (db_res == true) {
		console.log("Removed intrested event succesfully");
		return true;
	} else {
		return false;
	}
} 
// QUERY FUNCTION
async function removeIntrestedEventQuery(user_id, event_id) {
	const query = `UPDATE purduehub SET intrested_events = ARRAY_REMOVE(intrested_events, $1) WHERE user_id = $2`;
	const data = [ event_id, user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

// FUCNTION:	getNotifications
// INPUT:		request user_id
// RETURNS:		true or false
// Get all events user is intrested in
async function getNotifications(req, res) {
	const { user_id } = req.body;
	let db_res = await accountQueries.getNotificationsQuery(user_id);
	if (db_res == true) {
		console.log("Removed intrested event succesfully");
	}
}
// QUERY FUNCTION
async function getNotificationsQuery(user_id) {
	const query = ` SELECT event_name, event_des FROM events,
	(SELECT unnest(intrested_events) AS events FROM purduehub WHERE user_id = $1) as bruh
	WHERE events.event_id = bruh.event_id`;
	const data = [ user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

// assume new table called events
// with variables: String event_name, string event_des, int event_id, int professional_development, int club_callouts
// returns a db that need to be parsed then called addEvent
// FUNCTION:	addTags
// INPUT: 		requested user_id
// RETURNS: 	DB of events with the tags the user chose
// This strictly returns a DB with events that have the user chosen tags. These events may be duplicates to ones that users already have in their intrested list
async function addTags(req, res) {
	const { user_id } = req.body;
	let db_res = await accountQueries.addTagsQuery(user_id);
	if (db_res != false) {
		console.log("Tags added!");
		return db_res;
	}
}
// QUERY FUNCTION
async function addTagsQuery(user_id) {
	const query = `SELECT event_id FROM events, purduehub WHERE purduehub.user_id = $1 
	AND (purduehub.club_callouts = 1 AND purduehub.club_callouts = events.club_callouts)
	OR (purduehub.professional_development = 1 AND purduehub.professional_development = events.professional_development)`;
	const data = [ user_id ];
	try {
		const db_res = await pool.query(query, data);
		return db_res;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// FUCNTION:	addEvent
// INPUT:		request user_id, event_id
// RETURNS:		true or false
// A General function to add intrested event, assuming we know the user_id and the event_id
// Should be called somewhere in the frontend
// THIS CHECKS FOR DUPICATES
async function addEvent(user_id, event_id) {
	if (checkEvent(user_id, event_id) == true) {
		console.log("This event was is already in the list")
	} else {
		let db_res = await accountQueries.addEventQuery(user_id, event_id);
		if (db_res == true) {
			console.log('event successfulyl added!')
		}
	}
}
// QUERY FUNCTION
async function addEventQuery(user_id, event_id) {
	const query = `UPDATE purduehub SET intrested_events = ARRAY_APPEND(intrested_events, $1) WHERE user_id = $2`;
	const data = [ event_id, user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
	
// FUCNTION:	notifyAllClubAct
// INPUT:		request user_id, org_id
// RETURNS:		true or false
// assume new int[] called intrested_clubs in users table
// NEED MORE WORK!
async function notifyAllClubAct(req, res) {
	const { user_id } = req.body;
	const { org_id  } = req.body;
	let db_res = await accountQueries.notifyAllClubActQuery(user_id, org_id );
	if (db_res == true) {
		console.log("Intrested club added successfully succesfully");
	}
}
// QUERY FUNCTION
async function notifyAllClubActQuery(user_id, org_id ) {
	const query = 'UPDATE purduehub SET intrested_clubs = ARRAY_APPEND(intrested_clubs, $1) WHERE user_id = $2'
	const data = [ org_id , user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// FUNCTION: 	addFollower
// INPUT:		reuqest user_id and org_id
// RETURN:		true or false 
// add a follower(user_id) to int[] followers in organziation
async function addFollower(req, res) {
	const { user_id } = req.body;
	const { org_id  } = req.body;
	let db_res = await accountQueries.addFollowerQuery(user_id, org_id);
	if (db_res == true) {
		console.log("Intrested person added succesfully");
		return true;
	} else {
		return false;
	}
}
// QUERY FUNCTION
async function addFollowerQuery(user_id, org_id) {
	const query = 'UPDATE organization SET followers = ARRAY_APPEND(followers, $1) WHERE org_id = $2'
	const data = [ user_id, org_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}


// FUNCTION: 	friendsWhoFollowClub
// INPUT: 		req.user_id and org_id
// RETURNS: 	integer array with user_id that you follow and also follow the club
// people who you follow who are also intrested in the club
async function friendsWhoFollowClub(req, res) {
	const { user_id } = req.body;
	const { org_id } = req.body;
	let db_res = await accountQueries.friendsWhoFollowClubQuery(user_id, org_id);
	if (db_res != null) {
		console.log("Friend list retrieved succesfully");
		return db_res;
	}
}

// returns an integer array of event_ids that are the same
async function friendsWhoFollowClubQuery(user_id, org_id) {
	const query = 'SELECT follow FROM (SELECT usres.follow FROM usres WHERE usres.user_id = $1)AS foo'
	const data = [ user_id ];
	const db_res = await pool.query(query, data);
	const res1 = db_res[0].follow;

	const query2 = 'SELECT followers FROM (SELECT organization.followers FROM organization WHERE organization.org_id = $1)AS foo'
	const data2 = [ org_id];
	const db_res2 = await pool.query(query2, data);
	const res2 = db_res2[0].followers;

	return res1.filter(element => res2.includes(element));
}