const mongoose = require('mongoose');


const Customer = mongoose.model('Customer');

module.exports.customer = (req, res, next) => {
    var customer = new Customer();
    customer.fullName = req.body.fullName;
    customer.passportnumber = req.body.passportnumber;
    customer.visaexpdate = req.body.visaexpdate;
    customer.medicalexpdate = req.body.medicalexpdate;
    customer.priority = req.body.priority;
    customer.agentname = req.body.agentname;
    customer.comments = req.body.comments;
    console.log(customer.agentname);
    customer.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate passportnumber entry found.']);
            else
                return next(err);
        }

    });
}

module.exports.customerList = (req, res, next) =>{
    Customer.find(
        (err, customer) => {
            if (!customer)
                return res.status(404).json({ status: false, message: 'customer record not found.' });
            else
            console.log('After update:'+customer);
                return res.status(200).json({ status: true,customer });
        }
    );

    module.exports.customerById = (req, res, next) =>{

        let id = req.params._id;
        console.log('Controller::::'+id);
        Customer.findById(id,
            (err, customer) => {
                if (!customer)
                    return res.status(404).json({ status: false, message: 'customer record not found.' });
                else
                    return res.status(200).json({ status: true,customer });
            }
        );
    }
}
