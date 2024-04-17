const Payment = require('./paymentSchema');
const workRequest = require('../userWorkRequest/workRequestSchema');

// Function to add a payment
const addPayment = async (req, res) => {
    let userId=null
    await workRequest.findById({
        _id:req.body.workId
    }).exec().then(datas=>{
userId=datas.userId
    }).catch(err=>{
        console.log("err",err);
    })
  try {
   

    // Create a new payment instance
    const payment = new Payment({
         userId :userId,
        amount :req.body.amount,
         workId:req.body.workId,
         freelancerId :req.body.freelancerId,
         accHolderName :req.body.accHolderName,
         cardNumber : req.body.cardNumber
            });

    // Save the payment to the database
    await payment.save();

    res.status(201).json({ message: "saved", data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed", error: 'Server Error' });
  }
};


// Function to view payment details
const viewPayment = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.paymentId);
  
      if (!payment) {
        return res.status(404).json({ message:"No data", error: 'Payment not found' });
      }
  
      res.status(200).json({ message:"data obtained Successfully", data: payment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
module.exports = {
  addPayment,
  viewPayment
};
