import React from 'react';
import axios from 'axios';

interface Price {
  id: string; // Added id to match the priceId used in the API call
  product: string;
  unit_amount: number; 
}

interface PricingCardProps {
  price: Price;
}

const PricingCard: React.FC<PricingCardProps> = ({ price }) => {
  const handleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/payment', {
        priceId: price.id,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      window.location.assign(data); // Redirect to the payment URL
    } catch (error) {
      console.error("Error during subscription:", error);
      alert("There was an error processing your subscription. Please try again.");
    }
  };

  return (
    <div className="pricing-card border rounded-xl shadow-lg text-center py-8 px-10 space-y-4">
      <h4>{price.product}</h4>
      <p className='text-xl font-semibold'>${(price.unit_amount / 100).toFixed(2)}</p>
      <p className='text-sm'>50% off</p>
      <div className="px-6 pt-6 pb-8 text-left">
        <h3 className="text-sm font-medium text-gray-900 text-center">What's included</h3>
        <ul role="list" className="mt-6 space-y-4">
          {[
            "5 workspaces",
            "Unlimited testimonials",
            "10 collection forms",
            "2 members per workspace"
          ].map((item, index) => (
            <li key={index} className="flex space-x-3">
              <div className="flex justify-center items-center rounded-full bg-green-100 h-5 w-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3 w-3 flex-shrink-0 text-green-500">
                  <path fillRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-500">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className='bg-amber-500 py-2 px-10 w-full rounded-xl text-white font-semibold text-sm' onClick={handleSubscription}>
          Order Now
        </button>
      </div>
    </div> 
  );
}

export default PricingCard;