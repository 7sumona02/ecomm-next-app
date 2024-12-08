import Stripe from 'stripe'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); 

  const prices =  await stripe.prices.list({
    limit: 4,
  });
  return NextResponse.json(prices.data.reverse());
}
