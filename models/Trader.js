/**
 * Created by tingtzechuen on 9/6/17.
 */
module.exports = function(sequelize, DataType) {

    return sequelize.define('trader', {

        username: DataType.STRING,
        tokenAddress: DataType.STRING,
        paymentAddress: DataType.STRING,
        currency: DataType.STRING,
        region: DataType.STRING,
        country: DataType.STRING,
        type: DataType.ENUM('buy', 'sell')

    })

};
