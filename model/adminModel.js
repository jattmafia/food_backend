const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    restrauntName:{type: String,required:true},
    email: {type:String, required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true}
});

userSchema.pre('save',async function(next){
 const salt = await bcrypt.genSaltSync(8);
 const hash = bcrypt.hashSync(this.password, salt);
 this.password = hash;

 next();
});

const AdminModel = model('admin',userSchema);

module.exports = AdminModel;