import React from 'react';
import { Check, Zap } from 'lucide-react';

const plans = [
  { 
    name: 'Free', 
    price: '$0', 
    desc: 'Perfect for exploring the platform.',
    features: ['3 Loops active', '50 applications/mo', 'Basic AI matching', 'Email support']
  },
  { 
    name: 'Premium', 
    price: '$29', 
    popular: true,
    desc: 'Best for active job seekers.',
    features: ['Unlimited Loops', '500 applications/mo', 'AI Cover Letter Generator', 'Priority support', 'CV Checker']
  },
  { 
    name: 'Enterprise', 
    price: '$99', 
    desc: 'For power users and agencies.',
    features: ['Unlimited everything', 'Custom email templates', 'API Access', 'Dedicated account manager']
  },
];

const Pricing = () => {
  return (
    <div className="animate-fade-in space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Choose the right plan for your career</h1>
        <p className="text-slate-400">Upgrade to unlock more applications, loops, and premium AI features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`glass-panel p-8 flex flex-col relative ${plan.popular ? 'border-primary-500 bg-primary-600/5 ring-1 ring-primary-500/20' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 premium-gradient rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Zap size={10} fill="currentColor" /> Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-slate-500">/month</span>
            </div>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">{plan.desc}</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 bg-primary-600/10 rounded-full flex items-center justify-center text-primary-400 flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.popular ? 'premium-gradient shadow-lg shadow-primary-600/20 hover:scale-105' : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}>
              {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
