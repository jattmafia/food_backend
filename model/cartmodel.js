const {Schema,model,mongoose} = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
          },
          quantity: {type:Number}
        }
      ]
});


const CartModel = model("cart",cartSchema);
module.exports = CartModel;