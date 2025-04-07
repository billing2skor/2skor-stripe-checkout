const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1R8VJv051EK9WjxyRJMY0vVC', // Replace with your Stripe price ID
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://2skor.com/intake?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://2skor.com/payment-cancelled',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
