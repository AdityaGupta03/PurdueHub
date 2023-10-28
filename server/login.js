const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');


const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'h20081974',
	database : 'nodelogin'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'purduehub.org@gmail.com', // To be setup - a Purduehub email address
	  pass: 'hgmd wupu evbg htjf', // To be setup - a Purduehub email password
	},
  });
  
  async function sendEmail(reciever, subject, text) {
	const mailOptions = {
	  from: 'purduehub.org@gmail.com',
	  to: reciever,
	  subject: subject,
	  text: text,
	};
	console.log(mailOptions);
  
	try {
	  await transporter.sendMail(mailOptions);
	  return true;
	} catch (error) {
	  console.error('Error sending email:', error);
	  return false;
	}
  }



async function printAllAccounts() {
    const sql = 'SELECT * FROM accounts';
     connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching accounts: ' + error);
      } else {
        for (const account in results) {
          console.log(account);
		  if (results[account].banned == 1 && results[account].banEmail == 0) {
			console.log("aye ban!\n");
			const subject = 'Your Purdue account has been banned';
			const msg = `Get banned bozo`;
			const email = results[account].email;
			const user_id = results[account].user_id;
			const numBans = results[account].numOfBans;
			helperFunc.sendEmail(email, subject, msg); //  TESTED
			const sql2 = 'UPDATE purduehub SET banEmail = 1, numofBans = ? WHERE user_id = ?';
			connection.query(sql2, [numBans, user_id], (error, results, fields) => {
				if (error) throw error;
				else console.log('Update banEmail success!');
			});
		  }
		 if (results[account].markDeleted == 1 && results[account].deleteEmail == 0) {
			console.log("aye delete!\n");
			const subject = 'Your Purdue account has been deleted';
			const msg = `Get deleted bozo`;
			const email = results[account].email;
			const user_id = results[account].user_id;
			helperFunc.sendEmail(email, subject, msg); //  TESTED
			const sql3 = 'UPDATE purduehub SET deleteEmail = 1  WHERE user_id = ?'; // redundant as we dont do anything with it
			connection.query(sql3, [user_id], (error, results, fields) => {
				if (error) throw error;
				else console.log('Update deleteEmail success!');
			});
		 }
        }
      }
	  
    });
	// QUERY FOR LOGIN AND VIEWING OTHER PROFILES : SELECT banned FROM user_id = $1
	// if TRUE -> You are banned!
	// SELECT markDeleted FROM user_id = $1
	// if true -> Acount was deleted
	
	
}

// Query = UPDATE purduehub SET banned = 0  WHERE user_id = $1
async fucntion revokeBanQuery(user_id) {
	const query = `UPDATE purduehub SET banned = 0  WHERE user_id = $1`;
	const data = [ user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

async function submitFeedback(user_id) {
	const { user_id } = req.body;
	const { feedback_body } = req.body;
	const { feedback_title } = req.body;
	let db_res = await accountQueries.submitFeedbackQuery(user_id, feedback_title, feedback_body);
	if (db_res == true) {
		console.log("Feedback submitted and saved!");
	}
}

async function submitFeedbackQuery(user_id, feedback_title, feedback_body) {
	const query = `INSERT INTO feedback user_id  = $1, feedback_title = $2, feedback_body = $3`;
	const data = [ user_id, feedback_title, feedback_body ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

async function revokeBan(req, res) {
	const { user_id } = req.body;
	let db_res = await accountQueries.revokeBanQuery(user_id);
	if (db_res == true) {
		console.log("Reovke ban success!");
	}
}

async fucntion reportQuery(reported_id, reportee_id, msg) {
	const query = `INSERT INTO reports reported_id  = $1, reportee_id = $2, msg = $3`;
	const data = [ reported_id, reportee_id, msg ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

async function report(user_id) {
	const { user_id } = req.body;
	let db_res = await accountQueries.reportQuery(user_id);
	if (db_res == true) {
		console.log("Report success!");
	}
}

async fucntion banQuery(user_id) {
	const query = `UPDATE purduehub SET banned = 1  WHERE user_id = $1`;
	const data = [ user_id ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

async function ban(req, res) {
	const { user_id } = req.body;
	let db_res = await accountQueries.revokeBanQuery(user_id);
	if (db_res == true) {
		console.log("Ban success!");
	}
}

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


async function setPreferencesQuery(user_id, professional_development, club_callouts) {
	const query = `UPDATE purduehub SET professional_development = $1 club_callouts = $2  WHERE user_id = $3`;
	const data = [ user_id, professional_development, club_callouts ];
	try {
		const db_res = await pool.query(query, data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	  }
}

printAllAccounts();

// LOGIN
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				console.log("bruh: " + results[0]);
				request.session.loggedin = true;
				request.session.username = username;
				request.session.bio = results[0].bio;
				request.session.name = results[0].name;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!' 
		+ '\nName: ' + request.session.bio);
		//response.sendFile(path.join(__dirname + '/home.html'));
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

// function to call the frontend page for editing
// change home.html as needed
app.get('/profile', function(request, response) { 
	response.sendFile(path.join(__dirname + '/home.html'));
});

// function to update the profile backend and save data
// To update other profile information add variables after SET var = ?
// request.body requests the inputted variable
// console will say "Update succesful" if profile update succeeds.
// Query: 'UPDATE accounts SET bio = ? WHERE username = ?', inputs: profile (variable for user input) and request.session.username
app.post('/editProfile', function(request, response) { 
	let profile = request.body.profile;
	connection.query('UPDATE accounts SET bio = ? WHERE username = ?', [profile, request.session.username], (error, results, fields) => {
		if (error) throw error;
		else {
			response.send('Profile updated succesfully');
		}
	});
});
// TESTING:
// post('')


// UPLOAD/ EDIT PROFILE PIC
// Configure multer to store uploaded files in the 'uploads' directory
var saveToDatabase;
const storage = multer.diskStorage({
	
	destination: (req, file, cb) => {
	  cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
	  let user_id = req.session.username;
	  cb(null, user_id + path.extname(file.originalname));
	  saveToDatabase = user_id + path.extname(file.originalname);
	},
  });
  
  const upload = multer({ storage });

  
  // Handle file upload
  app.post('/upload', upload.single('image'), (req, res) => {
	const { username } = req.body
	if (!req.file) {
	  return res.status(400).send('No file uploaded.');
	}
	res.send('File uploaded and saved.');
	let pathInDB = "uploads/" + saveToDatabase;
	connection.query('UPDATE accounts SET profile_picture  = ? WHERE username = ?', [pathInDB, username], (error, results, fields) => {
		if (error) throw error;
		else {
			//res.send('Profile updated succesfully');
			// this throws error for some reason :(
		}
	});
  });

    // Serve the HTML form for file upload
  app.get('/profilePic', (req, res) => {
	res.sendFile(__dirname + '/index.html');
  });



app.listen(3001);