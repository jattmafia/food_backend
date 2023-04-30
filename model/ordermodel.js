const {Schema,model,mongoose} = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      orders: [
        {
            type: Map,
        }
      ],
         totalPrice:{type:Number},
         cookingInstruction:{type:String},
         pickupTime:{type:String},
         orderStatus : {type:String, default :"Order Placed"},
         quantity: {type:Number},
         createdAt: {
            type: Date,
            default: Date.now()
          }
});


const OrderModel = model("order",orderSchema);
module.exports = OrderModel;