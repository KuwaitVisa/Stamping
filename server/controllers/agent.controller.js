const mongoose = require('mongoose');


const Agent = mongoose.model('Agent');

module.exports.agent = (req, res, next) => {
    var agent = new Agent();
    agent.agentname = req.body.agentname;
    agent.MobileNumber = req.body.MobileNumber;
    agent.Address = req.body.Address;
    agent.normalRate = req.body.normalRate;
    agent.TatkalRate = req.body.TatkalRate;
    
    console.log(req.body.agentname);
    agent.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate agentname entry found.']);
            else
                return next(err);
        }

    });

   
}



module.exports.agentList = (req, res, next) =>{
    Agent.find(
        (err, agent) => {
            if (!agent)
                return res.status(404).json({ status: false, message: 'agent record not found.' });
            else
            console.log('After update:'+agent);
                return res.status(200).json({ status: true,agent });
        }
    );
}