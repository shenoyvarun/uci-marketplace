const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51L5LumGBpmLA0jmoDIdRjjaITLPYZZZaYZjycniqC1esJekw4WQ2CK891eMMrHo2rEF8B3SQXnZpfHumb6YK39dy006a3ftym6");
const uuid = require("uuid").v4;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { data, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create(
            {
                amount: data.product.prdprice * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${data.product.prdname}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotency_key
            }
        );
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});

app.listen(4000, () => {
    console.log('App is running on port 4000')
});
