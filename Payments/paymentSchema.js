const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    amount: {
      type: Date,
      required: true,
    },
   workid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "workRequest",
    },
    freelancerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "freelancers",
      },
      accHolderName:{
        type:String,
        required: true,
      },
      cardNumber:{
        type:Number,
        required: true,
      },
      date:{
        type:Date,
        default:new Date()
      }

}
);

const WorkRequestModel = mongoose.model("payments", schema);
module.exports = WorkRequestModel;
