const express = require('express');
const router = express.Router();

const userModel = require('./users');
const menuModel = require('./menu')
const bookingModel = require('./booking')
const tableModel = require('./table')
const cartModel = require('./cart')


const upload = require('./multer');


const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/',isLoggedIn, async function(req, res, next) {
  const menuOfWeekItems = await menuModel.find({ menuOfWeek: true });
  res.render('index', {menuOfWeekItems});
});

router.get('/menu', async function(req, res, next) {
  const saladItems = await menuModel.find({ category: 'Salad' });
  const vegitableItems = await menuModel.find({ category: 'Vegetable' });
  const menuOfWeekItems = await menuModel.find({ menuOfWeek: true });
  res.render('menu',{saladItems, vegitableItems, menuOfWeekItems});
});

router.get('/bookTable', function(req, res, next) {
  res.render('bookTable');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/aboutUs', function(req, res, next) {
  res.render('aboutUs');
});

router.get('/cart', async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  const orderitem = await cartModel.findOne({ userid: user._id }).populate('neworder')
  console.log(orderitem)
  res.render('cart', {orderitem});
});

router.get('/admin', isAdmin, async function(req, res, next) {
  const saladItems = await menuModel.find({ category: 'Salad' });
  const vegitableItems = await menuModel.find({ category: 'Vegetable' });
  const menuOfWeekItems = await menuModel.find({ menuOfWeek: true });
  res.render('admin',{saladItems, vegitableItems, menuOfWeekItems});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});


// AUTHENTICATION ========================>
router.post('/register', function(req, res, next){
  const userData = new userModel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
  })
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){    //here local is a strategy used by passport package, which is generally used in context of username and password
      res.redirect('/')
    })
  });
}); 

router.post('/login',passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}), function(req, res, next) {});

router.get('/logout',function(req, res, next) {
  req.logout(function(err){
    if(err) return next (err);
    res.redirect("/login");
  })
});


// MIDLEWARES ==========================================>

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
};

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
      return next(); // User is an admin, proceed to the next middleware/route handler
  } else {
      res.redirect("/"); // User is not an admin, send a 403 Forbidden response
  }
}



// POST ROUTES ========================================>

// POST route to add a menu item
router.post('/additem',isAdmin, upload.single('image'), async (req, res) => {
  try {

      const { title, caption, price, category } = req.body;
      const image = req.file.path; // Multer saves the file path in req.file.path

      // Create a new menu item object
      const menuItem = new menuModel({
          title,
          caption,
          image,
          price,
          category
      });

      // Save the menu item to the database
      await menuItem.save();

      // Redirect to a success page or render a success message
      res.redirect('/admin');
  } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).send('Internal Server Error');
  }
});


//TABLE BOOKING ROUTE =====================================>
router.post('/book', isLoggedIn, async (req, res) => {
  try {
      const { name, telephone, email, date, time, guests } = req.body;

      let tableCapacity;
      if (guests <= 2) {
          tableCapacity = 2;
      } else if (guests <= 4) {
          tableCapacity = 4;
      } else {
          tableCapacity = 10;
      }

      const table = await tableModel.findOneAndUpdate(
          { capacity: tableCapacity, availability: true },
          { availability: false },
          { new: true }
      );

      if (!table) {
          return res.status(404).json({ message: 'No available table found for the requested number of guests' });
      }

      const user = await userModel.findOne({username: req.session.passport.user});
      const booking = new bookingModel({
          name,
          telephone,
          email,
          date,
          time,
          guests,
          tableid: table._id,
          userid: user._id,
      });

      await booking.save();
      
      table.bookedby = booking._id;
      table.userid = user._id;
      await table.save();

      const cart = new cartModel({
        tableid: table._id,
        userid: user._id,
      });
      await cart.save()


      // return res.status(200).json({ message: 'Table booked successfully' });    // ADD A SUCCESS PAGE HERE
      return res.redirect('/');

  } catch (error) {
      console.error('Error booking table:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//DELETE MENU ITEM
router.post('/deleteitem/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      
      // Find the menu item by its ID and delete it
      await menuModel.findByIdAndDelete(itemId);

      return res.redirect('back');
  } catch (error) {
      console.error('Error deleting menu item:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//SET & REMOVE IN MENU OF WEEK
router.post('/setmenuofweek/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      
      await menuModel.findByIdAndUpdate(itemId, { menuOfWeek: true });

      return res.redirect('back');
  } catch (error) {
      console.error('Error updating menu item:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/removemenuofweek/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      
      await menuModel.findByIdAndUpdate(itemId, { menuOfWeek: false });

      return res.redirect('back');
  } catch (error) {
      console.error('Error updating menu item:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ORDER ITEM =================================>
router.post('/orderitem/:id', async (req, res) => {
  const itemId = req.params.id;
  const user = await userModel.findOne({username: req.session.passport.user});
  const cart = await cartModel.findOne({ userid: user._id });

  cart.neworder.push(itemId)
    await cart.save()
});

module.exports = router;
