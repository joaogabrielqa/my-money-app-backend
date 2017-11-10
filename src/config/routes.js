const express = require('express');

module.exports = server => {

    // Define uma URL base para todas as rotas;
    const router = express.Router();
    server.use('/api', router);

    // Rotas de ciclo de pagamento;
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(router, '/billingCycles');

}