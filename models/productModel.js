const { model, Schema } = require("mongoose");

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [ true, "Please enter a product name!" ]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const productModel = model('productModel', productSchema);

module.exports = productModel;