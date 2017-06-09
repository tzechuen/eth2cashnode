/**
 * Created by tingtzechuen on 9/6/17.
 */
var express = require('express');
var router = express.Router();

let models = require('../models');

let Trade = models.Trade;
let Trader = models.Trader;

let responseHelper = require('../helpers/response-helper');

// Search by trader or tradee token address
router.get('/search', (req, res) => {

    let traderTokenAddress = req.query.traderTokenAddress;
    let tradeeTokenAddress = req.query.tradeeTokenAddress;

    if (!traderTokenAddress && !tradeeTokenAddress) {
        responseHelper.throwError('Please provide either trader or tradee token address', res);
        return;
    }

    let where = {};

    if (traderTokenAddress) {
        where['traderTokenAddress'] = traderTokenAddress;
    }

    if (tradeeTokenAddress) {
        where['tradeeTokenAddress'] = tradeeTokenAddress;
    }

    console.log('where: ' + JSON.stringify(where));

    Trade
        .find({
            where: where
        })
        .then(trade => {

            responseHelper.returnObjectAsJSON(trade, res);

        });


});

router.post('/', (req, res) => {

    let keys = ['traderTokenAddress', 'traderPaymentAddress', 'traderUsername', 'tradeeTokenAddress', 'tradeePaymentAddress', 'tradeeUsername', 'ethAmount', 'currency', 'region', 'country', 'details', 'type'];
    let parameters = {};

    let allParametersAvailable = true;

    keys.forEach(key => {

        if (!req.body[key]) {
            allParametersAvailable = false;
            return;
        }

        parameters[key] = req.body[key];
    });

    if (!allParametersAvailable) {
        responseHelper.throwError('One of the required parameters are not provided', res);
        return;
    }


    // Check if there is an existing trade
    // Update if there is an existing

    Trade
        .find({
            where: {
                traderTokenAddress: req.body.traderTokenAddress,
                tradeeTokenAddress: req.body.tradeeTokenAddress,
                status: 'open'
            }
        })
        .then(trade => {

            if (trade) {
                trade
                    .update(parameters)
                    .then(trade => {
                        responseHelper.returnObjectAsJSON(trade, res);
                    });
            } else {
                Trade
                    .create(parameters)
                    .then(trade => {
                        responseHelper.returnObjectAsJSON(trade, res);
                    });
            }

        });

});

// Complete trade
router.post('/:id(\\d+)/complete', (req, res) => {

    Trade
        .find({
            where: {
                id: req.params.id
            }
        })
        .then(trade => {

            if (trade) {
                trade
                    .update({
                        status: 'completed'
                    })
                    .then(trade => {
                        responseHelper.returnObjectAsJSON(trade, res);
                    });
            } else {
                responseHelper.throwError('Trade not found', res);
            }

        });

});

// Cancel trade
router.delete('/:id(\\d+)', (req, res) => {

    Trade
        .find({
            where: {
                id: req.params.id
            }
        })
        .then(trade => {

            if (trade) {
                trade.destroy();
            }

            responseHelper.returnOkWithoutBody(res);

        });


});


module.exports = router;
