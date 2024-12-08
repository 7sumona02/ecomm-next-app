import Stripe from 'stripe'
import {NextRequest, NextResponse} from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export async function POST(req:NextRequest, res: NextResponse) {
   let data = await req.json();
   let priceId = data.priceId;
   const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://localhost:3000',
    cancel_url: 'https://localhost:3000',
   })

   return NextResponse.json(session.url)
}