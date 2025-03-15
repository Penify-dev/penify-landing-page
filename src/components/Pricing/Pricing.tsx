import { Element } from "react-scroll";
import { CurrencyDropdown } from "./CurrencyDropdown/CurrencyDropdown";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";
import { use, useEffect, useState } from "react";
import { getPlanPrice, PlanTypes } from "@/api/pricing";
import PRICING from "@/utils/pricing.json";
import { PricingCard } from "./PricingCard/PricingCard";
import { BannerOffer } from "./BannerOffer/BannerOffer";
import { FeatureComparison } from "./FeatureComparison/FeatureComparison";
import { PlansTable } from "./PlansTable/PlansTable";

// Feature highlights for each plan
const planFeatures = {
  Freemium: [
    "10 Files/Repo Documentation (Public)",
    "3 Files/Repo Documentation (Private)",
    "10 Commits/Day Documentation Update",
    "PR Summary",
    "40 Swagger Endpoints Documentation",
  ],
  Premium: [
    "All Freemium features",
    "10 Files/Repo Documentation",
    "5 Commits/Day Documentation Update",
    "Architecture Documentation",
    "API Documentation with Commit"
  ],
  Pro: [
    "All Premium features",
    "10 Files/Repo Documentation",
    "Unlimited Commits/Day Update",
    "Review PR & Analyze",
    "Authentication for hosted docs"
  ],
  Enterprise: [
    "All Pro features",
    "Unlimited Files Documentation",
    "Unlimited Commits/Day Update",
    "Find similar components",
    "Custom LLMs Support"
  ]
};

type PricingOption = 'oneTime' | 'subscription';

export default function Pricing() {
  const {
    currency,
    handleCurrencyChange,
    getCurrency,
  } = useCurrencyConversion();
  
  const [isLoading, setIsLoading] = useState(true);
  const [pricingPlans, setPricingPlans] = useState(PRICING.plans);
  const [fullRepoPrice, setFullRepoPrice] = useState(PRICING.fullRepoPlan.amount);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [pricingOption, setPricingOption] = useState<PricingOption>('oneTime');
  const [planPriceFromAPI, setPlanPriceFromAPI] = useState<PlanTypes>({});

  useEffect(() => {
    setIsLoading(true);
    getPlanPrice().then((data: PlanTypes) => {
      if (!data) {
        setIsLoading(false);
        return;
      }
      setPlanPriceFromAPI(data);
      
      // Update full repo price
      const fullRepoKey = PRICING.fullRepoPlan.planId;
      if(data[fullRepoKey]) {
        setFullRepoPrice(data[fullRepoKey].amount);
      }
      
      // Update plan prices
      const updatedPlans = [...pricingPlans].map(plan => {
        const planKey = plan.planIdPerMonth;
        if (planKey && planPriceFromAPI[planKey]) {
          return { ...plan, price: data[planKey].amount + "" };
        }
        return plan;
      });
      
      setPricingPlans(updatedPlans);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("2::: ",{pricingPlans})
    let workingPricingPlans = [...pricingPlans];
    if(Object.keys(planPriceFromAPI).length === 0) {
      // api gateway is not available
      workingPricingPlans = [...PRICING.plans];
    }
    const updatedPlans = workingPricingPlans.map(plan => {
      const planKey = plan.planIdPerMonth;
      if (billingCycle === 'yearly' && plan.price) {
        return { ...plan, price: parseInt(parseInt(plan.price)*12*0.8+"") + "" };
      }

      if (planKey && planPriceFromAPI[planKey]) {
        return { ...plan, price: planPriceFromAPI[planKey].amount + "" };
      }
      return plan;
    });    
    setPricingPlans(updatedPlans);
  }, [billingCycle]);

  return (
    <section>
      <Element
        name="pricing"
        id="pricing"
        className="w-full py-12 overflow-hidden md:py-16 xl:py-24"
      >
        <div className="container mx-auto px-4">
          <header
            className="flex flex-col items-center mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h1 className="mb-4 text-center text-3xl font-bold text-slate-200 md:text-4xl xl:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="max-w-2xl text-center text-slate-400 text-lg mb-8">
              Choose the plan that fits your needs. All plans include core documentation features.
            </p>
            
            <div className="flex items-center space-x-4">
              <CurrencyDropdown
                currency={currency}
                handleCurrencyChange={handleCurrencyChange}
              />
            </div>
          </header>

          {/* Pricing Option Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => setPricingOption('oneTime')}
                className={`px-6 py-3 text-sm md:text-base font-medium rounded-md transition duration-200 ${
                  pricingOption === 'oneTime'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                One-Time Documentation
              </button>
              <button
                onClick={() => setPricingOption('subscription')}
                className={`px-6 py-3 text-sm md:text-base font-medium rounded-md transition duration-200 ${
                  pricingOption === 'subscription'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                Monthly Subscription
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* One-Time Documentation Option */}
              <div className={`transition-all duration-300 ${pricingOption === 'oneTime' ? 'opacity-100' : 'hidden opacity-0'}`}>
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
                      Document Your Entire Repository
                    </h2>
                    <p className="text-slate-400">
                      One-time payment for complete documentation of your codebase
                    </p>
                  </div>
                  
                  <BannerOffer 
                    price={fullRepoPrice} 
                    currency={currency} 
                    getCurrency={getCurrency}
                  />
                  
                  <div className="mt-10 bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-200 mb-4">What's included:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-300">Complete documentation for your entire repository</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-300">Architecture diagrams and flow charts</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-300">Function and component documentation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-300">API documentation (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Subscription Option */}
              <div className={`transition-all duration-300 ${pricingOption === 'subscription' ? 'opacity-100' : 'hidden opacity-0'}`}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">
                    Monthly Subscription Plans
                  </h2>
                  <p className="text-slate-400 mb-8">
                    Continuous documentation updates as your codebase evolves
                  </p>
                  
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center p-1 bg-slate-800 rounded-lg">
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                          billingCycle === 'monthly'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                        onClick={() => setBillingCycle('monthly')}
                      >
                        Monthly
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                          billingCycle === 'yearly'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                        onClick={() => setBillingCycle('yearly')}
                      >
                        Yearly <span className="text-xs text-blue-300">-20%</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {pricingPlans.filter((plan)=>{
                    return !plan.title.startsWith("Freemium/Private");
                  }).map((plan, index) => (
                    <PricingCard
                      key={plan.title}
                      title={plan.title}
                      price={plan.price}
                      popular={plan.title === "Pro"}
                      features={planFeatures[plan.title.split("/")[0] as keyof typeof planFeatures]}
                      currency={currency}
                      planId={billingCycle === 'monthly' ? plan.planIdPerMonth : plan.planIdPerYear}
                      getCurrency={getCurrency}
                    />
                  ))}
                </div>
                <FeatureComparison/>
              </div>
            </>
          )}
        </div>
      </Element>
    </section>
  );
}
