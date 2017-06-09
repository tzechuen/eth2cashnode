/**
 * Created by tingtzechuen on 9/6/17.
 */

module.exports = function(sequelize, DataType) {

    return sequelize.define('trade', {

        traderTokenAddress: DataType.STRING,
        traderPaymentAddress: DataType.STRING,
        traderUsername: DataType.STRING,
        tradeeTokenAddress: DataType.STRING,
        tradeePaymentAddress: DataType.STRING,
        tradeeUsername: DataType.STRING,
        ethAmount: DataType.DOUBLE,
        status: DataType.ENUM('open', 'accepted', 'completed'),
        currency: DataType.STRING,
        region: DataType.STRING,
        country: DataType.STRING,
        details: DataType.STRING,
        type: DataType.ENUM('buy', 'sell')

    })

};
