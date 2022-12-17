const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51M7NBQSEKcRnMyKCgJMVvj7VdkxS98moksSNIdUsjo7ZQ4IlxhVkxTd0KvjMuQocfiydSmSSOWLRCJ6zyHY7yl5X00dMFPhOgS"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
   
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: req.body.totalAmount * 100,
    //   currency: 'usd',
    //   payment_method_types: ['card'],
    // });
      req.body.transactionId = uuidv4()
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      console.log("kk");
      res.send("Your booking is successfull");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;
