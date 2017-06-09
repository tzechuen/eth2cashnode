/**
 * Created by tingtzechuen on 9/6/17.
 */
var express = require('express');
var router = express.Router();

let models = require('../models');

let Trade = models.Trade;
let Trader = models.Trader;

let responseHelper = require('../helpers/response-helper');

router.post('/', (req, res) => {

    let keys = ['tokenAddress', 'paymentAddress', 'username', 'currency', 'region', 'country', 'type'];

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
        responseHelper.throwError('One of the following not provided: tokenAddress, paymentAddress, username, currency, region, country, type', res);
        return;
    }

    // Update existing trader if available
    Trader
        .find({
            where: {
                tokenAddress: req.body.tokenAddress
            }
        })
        .then(trader => {

            if (trader) {
                trader
                    .update(parameters)
                    .then(trader => {
                        responseHelper.returnObjectAsJSON(trader, res);
                    });
            } else {

                Trader
                    .create(parameters)
                    .then(trader => {
                        responseHelper.returnObjectAsJSON(trader, res);
                    });

            }

        });

});

// Helper
// Returns all Trader addresses that are performing a trade
// Callback({trader Ids})
function getAllTradersCurrentlyPerformingATrade(callback) {

    Trade
        .findAll({
            where: {
                status: {
                    $not: 'completed'
                }
            }
        })
        .then(trades => {

            if (trades) {

                let traderAdds = [];

                trades.forEach(trade => {
                    traderAdds.push(trade.traderTokenAddress);

                    if (trade.tradeeTokenAddress) {
                        traderAdds.push(trade.tradeeTokenAddress);
                    }
                });

                callback(traderAdds);

            } else {
                callback([])
            }

        });

}

router.get('/search', (req, res) => {

    let keys = ['currency', 'region', 'country', 'type'];
    let parameters = {};

    keys.forEach(key => {
        parameters[key] = req.query[key];
    });

    let myAddress = req.query['myAddress'];

    if (!myAddress) {
        responseHelper.throwError('You must provide your token address', res);
        return;
    }

    // Find a trader if available
    getAllTradersCurrentlyPerformingATrade(traderAddresses => {

        console.log('Trader addresses: ' + traderAddresses);

        parameters['tokenAddress'] = {
            $and: [
                {
                    $notIn: traderAddresses
                },
                {
                    $not: myAddress
                }
            ]
        };

        console.log('Parameters: ' + JSON.stringify(parameters));

        Trader
            .find({
                where: parameters
            })
            .then(trader => {
                responseHelper.returnObjectAsJSON(trader, res);
            });


    });

});


module.exports = router;