const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_SECRET_KEY_MY;
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.paymentIntents.create(
    {
      payment_method: req.params.tokenId,
      payment_method_types: ["card"],
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
module.exports = router;
