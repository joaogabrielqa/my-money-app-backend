const BillyngCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

BillyngCycle.methods(['get', 'post', 'put', 'delete']);
BillyngCycle.updateOptions({ new: true, runValidators: true });
BillyngCycle.after('post', errorHandler).after('put', errorHandler);

BillyngCycle.route('count', (req, res, next) =>{
    BillyngCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors:[error]});
        } else {
            res.json({value});
        }
    });
});

BillyngCycle.route('summary', (req, res, next) => {
    BillyngCycle.aggregate({
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
    }, {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" }}
    }, {
        $project: { _id: 0, credit: 1, debt: 1 }
    }, (error, result) => {
        if(error) {
            res.status(500).json({ errors: [error] });
        } else {
            res.json(result[0] || { credit:0, debt:0 });
        }
    });
});

module.exports = BillyngCycle;