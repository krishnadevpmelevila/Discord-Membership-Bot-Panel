var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
var axios = require('axios');

dotenv.config();

var instance = new Razorpay({
  key_id: process.env.PAYMENT_KEY_ID,
  key_secret: process.env.PAYMENT_KEY_SECRET,
});



const { check, validationResult } = require('express-validator');
// initiate mongoose
const mongoose = require('mongoose');
// initiate user model
const User = require('../models/user');
// connect to mongoose
mongoose.connect(process.env.DB_URL);
// initiate db
const db = mongoose.connection;
// check db connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// check for db errors
db.on('error', (err) => {
  console.log(err);
});
"use strict";
const nodemailer = require("nodemailer");
const Activation = require('../models/activation');
const Api = require('../models/api');
const cookieParser = require('cookie-parser');




validate = [
  check('email', 'Email not valid')
    .isEmail().isLength({ min: 5, max: 70 }),
  check('name', 'Name length should be 3 to 25 characters')
    .isLength({ min: 3, max: 25 }),
  check('phone', 'Invalid Mobile Number')
    .isLength({ min: 10, max: 20 }).isNumeric(),
  check('country', 'Enter Country')
    .isLength({ min: 3, max: 25 }),
  check('place', 'Enter Place')
    .isLength({ min: 3, max: 26 })
]


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Membership Form', Key: process.env.PAY_KEY_ID });
});
router.get('/data', auth, (req, res) => {
  // get data from activation
  Activation.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
  }
  );
});
router.get('/activate/:_id', auth, async (req, res) => {
  // update activation
  const id = req.params._id;
  const activation = await Activation.findById(id).catch(err => {
    console.log("err");
  });
  if (activation) {
    activation.activated = true;
    activation.save();
    res.json(activation);
  } else {
    res.json("User Not Found")
  }




});
router.get('/deactivate/:_id', auth, async (req, res) => {
  // update activation
  const id = req.params._id;
  const activation = await Activation.findById(id).catch(err => {
    console.log("err");
  });
  if (activation) {
    activation.activated = false;
    activation.save();
    res.json("Success! User Activation Status: " + activation.activated);
  } else {
    res.json("User Not Found")
  }




});
router.get('/add/:_id/:discordid', auth, async (req, res) => {
  // update activation
  const id = req.params._id;
  const discordid = req.params.discordid;
  const activation = await Activation.findById(id).catch(err => {
    console.log("err");
  });
  if (activation) {
    activation.discordid = discordid;
    activation.save();
    res.json("Success! ");
  } else {
    res.json("User Not Found")
  }




});
// Uncomment and register for api creds.

// router.post("/register", async (req, res) => {
//   try {
//     // Get user input
//     const { first_name, last_name, email, password } = req.body;

//     // Validate user input
//     if (!(email && password && first_name && last_name)) {
//       res.status(400).send("All input is required");
//     }

//     // check if user already exist
//     // Validate if user exist in our database

//     const oldUser = await Api.findOne({ email });

//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }

//     //Encrypt user password
//     encryptedPassword = await bcrypt.hash(password, 10);

//     // Create user in our database
//     const api = await Api.create({
//       first_name,
//       last_name,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedPassword,
//     });

//     // Create token
//     const token = jwt.sign(
//       { api_user_id: api._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     api.token = token;

//     // return new user
//     res.status(201).json(api);
//   } catch (err) {
//     console.log(err);
//   }
//   // Our register logic ends here
// });


// Login
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const api = await Api.findOne({ email });

    if (api && (await bcrypt.compare(password, api.password))) {
      // Create token
      const token = jwt.sign(
        { api_id: api._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      api.token = token;

      // user
      res.status(200).json(api);
    }
    else {
      res.status(400).send("Invalid Credentials");
    }

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
router.post("/admin", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const api = await Api.findOne({ email });

    if (api && (await bcrypt.compare(password, api.password))) {
      // Create token
      const token = jwt.sign(
        { api_id: api._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      api.token = token;
      cookietoken = api.token
      let user_token = req.cookies['x-access-token']; // always empty

      if (user_token) {

        res.redirect('/dashboard');
      } else {
        


        res.cookie('x-access-token', cookietoken, {maxAge:60000*60*1.5, httpOnly: true});
        res.redirect('/dashboard');
      }
      // res.location('/dashboard')

      // res.status(302).end()

    }
    else {
      res.status(400).send("Invalid Credentials");
    }

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
router.get('/dashboard', (req, res) => {
  let user_token = req.cookies['x-access-token'];

  if (user_token) {
    axios.get(process.env.API_URL + '/data', {
      headers: {
        'x-access-token': user_token
      }
    })
      .then(response => {
        res.render("dashboard", { "users": response.data });
        // res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.redirect('/admin')
  }

})
router.get("/admin", async (req, res) => {
  let user_token = req.cookies['x-access-token'];

  if (user_token) {
    res.redirect('/dashboard');
  } else {
    res.status(200).render('login');
  }


});
router.get("/delete/:id", async (req, res) => {
  let user_token = req.cookies['x-access-token'];
  if (user_token) {
    const activation = await Activation.findById(req.params.id);



    User.deleteOne({ email: activation.email }, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        Activation.deleteOne({ _id: req.params.id }, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('data removed');
            res.redirect('/admin');
          }
        })
      }
    })
  } else {
    res.redirect('/admin')
  }



});

router.get('/success', (req, res) => {
  res.render('registered', { title: 'Success', layout: 'registerLayout' });
});
router.get('/test', (req, res) => {


});

router.get('/reset', (req, res) => {
  // remove data from user db
  User.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      Activation.deleteMany({}, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('data removed');
          res.json({ 'success': 'data removed' })
        }
      })
    }
  })
});

router.post('/paid-reg', validate, async (req, res) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.status(400).send({ errors: errors.array() });
  }

  // If no error occurs, then this
  // block of code will run
  else {
    const { email, phone } = req.body;

    let mail = await User.findOne({ email });
    let mobile = await User.findOne({ phone });
    if (mail || mobile) {

      return res.status(400).json({ message: "Email Or Mobile already registered. Contact admin for activation code. " });

    }



    // payment logic start
    var orderid = getRandomString(6)

    var options = {
      amount: 50000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: orderid
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      res.send(order);
    });







    // payment logic end


  }
})







router.post('/free-reg', validate, async (req, res) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.render('index', { errors: errors.array() });
  }

  // If no error occurs, then this
  // block of code will run
  else {
    const { email, phone } = req.body;

    let mail = await User.findOne({ email });
    if (mail) {

      return res.status(400).render('index', { message: "Email already registered. Contact admin for activation code. " });
    }
    let mobile = await User.findOne({ phone });
    if (mobile) {
      return res.status(400).render('index', { message: "Phone already registered. Contact admin for activation code. " });
    }

    var activationCode = getRandomString(15);

    activated = true;
    console.log(activationCode);
    // save to db
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      district: req.body.district,
      country: req.body.country,
      activationCode: activationCode,
      activated: false
    });
    user.save().then(result => {
      console.log(result);
      const activation = new Activation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        paid: false,
        activationCode: activationCode,
        activated: false
      });
      activation.save().then(result => {
        console.log(result);
        async function main() {

          let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });
          username = req.body.name.replace(/[^a-zA-Z ]/g, "")
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `Nodeista Communtiy ${process.env.MAIL_FROM}`, // sender address
            to: req.body.email, // list of receivers
            subject: "Activation Code For Nodeista Membership", // Subject line
            text: "You are one of our member", // plain text body
            html: `<head>

            <!-- CHARSET -->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            
            <!-- MOBILE FIRST -->
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            
            <!-- GOOGLE FONTS -->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
            
            <!-- RESPONSIVE CSS -->
            <style type="text/css">
                @media only screen and (max-width: 550px) {
                    .responsive_at_550 {
                        width: 90% !important;
                        max-width: 90% !important;
                    }
                }
            </style>
            
            </head>
            <!-- END HEAD -->
            
            <!-- START BODY -->
            
            <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
            
            <!-- START EMAIL CONTENT -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                <tbody>
            
                    <tr>
            
                        <td align="center">
            
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                <tbody>
                                    <tr>
                                        <td width="100%" align="center">
            
                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->
            
            
            
                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->
            
                                            <!-- START CONTENT -->
                                            <table width="500" border="0" cellpadding="0" cellspacing="0" align="center"
                                                style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" bgcolor="#ffffff">
            
                                                            <!-- START BORDER COLOR -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" height="7" align="center" border="0"
                                                                            bgcolor="#0000"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END BORDER COLOR -->
            
                                                            <!-- START SPACING -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td height="30">&nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END SPACING -->
            
                                                            <!-- START HEADING -->
                                                            <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" align="center">
                                                                            <img width="200"
                                                                                src="https://nodeista.com/public/images/media/1635251660nodeista-removebg-preview.png"
                                                                                alt="Nodeista Logo" border="0"
                                                                                style="text-align: center;" />
                                                                            <h1
                                                                                style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">
                                                                                Hi ${username}, Welcome to Nodeista!</h1>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END HEADING -->
            
                                                            <!-- START PARAGRAPH -->
                                                            <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" align="center">
                                                                            <p
                                                                                style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                                We are so proud to Welcome you to our communtiy. We can do great things in future with unity. Once again, Welcome to the innovative community.</p>
                                                                            <p
                                                                                style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                              <span><b style="color: red;">Your activation code is :</b> <strong style="color: green;">${activationCode}</strong></p></span> 
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END PARAGRAPH -->
            
                                                            <!-- START SPACING -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td height="30">&nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END SPACING -->
            
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p style="font-family:'Ubuntu Mono', monospace;  font-size:12px;">
                                                Nodeista &copy; 2021, All Rights Reserved</p>
                                            <!-- END CONTENT -->
            
                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->
            
            
            
            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
            
                        </td>
            
                    </tr>
            
                </tbody>
            </table>
            <!-- END EMAIL CONTENT -->
            
            </body>
            <!-- END BODY -->`
            , // html body
          });

          console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);
        res.render('registered', { name: req.body.name, layout: 'registerLayout' });
      }).catch(err => {
        console.log(err);
      });



    }
    ).catch(err => {
      console.log(err);
    });
  }
})
router.post("/api/payment/verify", (req, res) => {
  console.log(req.body);
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { "signatureIsValid": "false" }

  if (expectedSignature === req.body.response.razorpay_signature) {
    var activationCode = getRandomString(15);

    activated = true;


    var per = JSON.parse(req.body.formdata)
    // save to db
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: per.name,
      email: per.email,
      phone: per.phone,
      district: per.district,
      country: per.country,
      activationCode: activationCode,
      activated: true
    });
    user.save().then(result => {
      console.log(result);
      const activation = new Activation({
        _id: new mongoose.Types.ObjectId(),
        name: per.name,
        email: per.email,
        phone: per.phone,
        paid: true,
        activationCode: activationCode,
        activated: true
      });
      activation.save().then(result => {
        console.log(result);
        async function main() {

          let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });
          username = per.name.replace(/[^a-zA-Z ]/g, "")
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `Nodeista Communtiy ${process.env.MAIL_FROM}`, // sender address
            to: per.email, // list of receivers
            subject: "Activation Code For Nodeista Membership", // Subject line
            text: "You are one of our member", // plain text body
            html: `<head>

            <!-- CHARSET -->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

            <!-- MOBILE FIRST -->
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

            <!-- GOOGLE FONTS -->
            <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

            <!-- RESPONSIVE CSS -->
            <style type="text/css">
                @media only screen and (max-width: 550px) {
                    .responsive_at_550 {
                        width: 90% !important;
                        max-width: 90% !important;
                    }
                }
            </style>

            </head>
            <!-- END HEAD -->

            <!-- START BODY -->

            <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

            <!-- START EMAIL CONTENT -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                <tbody>

                    <tr>

                        <td align="center">

                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                <tbody>
                                    <tr>
                                        <td width="100%" align="center">

                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->



                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->

                                            <!-- START CONTENT -->
                                            <table width="500" border="0" cellpadding="0" cellspacing="0" align="center"
                                                style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" bgcolor="#ffffff">

                                                            <!-- START BORDER COLOR -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" height="7" align="center" border="0"
                                                                            bgcolor="#0000"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END BORDER COLOR -->

                                                            <!-- START SPACING -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td height="30">&nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END SPACING -->

                                                            <!-- START HEADING -->
                                                            <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" align="center">
                                                                            <img width="200"
                                                                                src="https://nodeista.com/public/images/media/1635251660nodeista-removebg-preview.png"
                                                                                alt="Nodeista Logo" border="0"
                                                                                style="text-align: center;" />
                                                                            <h1
                                                                                style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">
                                                                                Hi ${username}, Welcome to Nodeista!</h1>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END HEADING -->

                                                            <!-- START PARAGRAPH -->
                                                            <table width="90%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="100%" align="center">
                                                                            <p
                                                                                style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                                We are so proud to Welcome you to our communtiy. We can do great things in future with unity. Once again, Welcome to the innovative community.</p>
                                                                            <p
                                                                                style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">
                                                                              <span><b style="color: red;">Your activation code is :</b> <strong style="color: green;">${activationCode}</strong></p></span> 
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END PARAGRAPH -->

                                                            <!-- START SPACING -->
                                                            <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td height="30">&nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!-- END SPACING -->

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p style="font-family:'Ubuntu Mono', monospace;  font-size:12px;">
                                                Nodeista &copy; 2021, All Rights Reserved</p>
                                            <!-- END CONTENT -->

                                            <!-- START SPACING -->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td height="40">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- END SPACING -->




                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </td>

                    </tr>

                </tbody>
            </table>
            <!-- END EMAIL CONTENT -->

            </body>
            <!-- END BODY -->`
            , // html body
          });

          console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);

      }).catch(err => {
        console.log(err);
      });



    }
    ).catch(err => {
      console.log(err);
    });
    response = { "signatureIsValid": "true" }
    res.render('registered', { name: per.name, layout: 'registerLayout' });
  }
  else {
    response = { "signatureIsValid": "false" }
    res.send(response);
  }



});

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}



module.exports = router;
