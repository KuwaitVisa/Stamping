const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Customer = mongoose.model('Customer');

const Agent = mongoose.model('Agent');
const ctrlUser = require('../controllers/user.controller');
const ctrlCustomer = require('../controllers/customer.controller');
const ctrlAgent = require('../controllers/agent.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/customer', ctrlCustomer.customer);


router.route('/agent').post(function (req, res) {
  let agent = new Agent(req.body);
  agent.save()
    .then(game => {
    res.status(200).json({'agent': 'Agent in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

router.route('/customerById/:_id').get(function (req, res) {
    let id = req.params._id;
    console.log('id::::::::::::::'+id)
    Customer.findById(id,  (err, customer)=> {
        if (!customer)
        return res.status(404).json({ status: false, message: 'customer record not found.' });
        else
        console.log('Customer:::'+customer);
        return res.status(200).json({ status: true,customer });
        
    });
  });
router.get('/customerList',jwtHelper.verifyJwtToken, ctrlCustomer.customerList);

router.get('/agentList',jwtHelper.verifyJwtToken, ctrlAgent.agentList);

router.route('/update/:id').post(function (req, res) {
    
    Customer.findById(req.params.id, function(err, customer) {
    if (!customer)
      return next(new Error('Could not load Document'));
    else {
        customer.fullName = req.body.fullName;
        customer.passportnumber = req.body.passportnumber;
        customer.submissiondate = req.body.submissiondate;
        customer.deliverydate = req.body.deliverydate;
        customer.agentname = req.body.agentname;
        console.log("my testing"+customer);
        customer.save().then(customer => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
router.route('/delete/:id').get(function (req, res) {
  console.log( req.params.id);
  Customer.findByIdAndRemove({_id: req.params.id}, function(err, customer){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});
module.exports = router;



