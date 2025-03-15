import { Element } from "react-scroll";
import { CurrencyDropdown } from "./CurrencyDropdown/CurrencyDropdown";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";
import { useEffect, useState } from "react";
import { getPlanPrice, PlanTypes } from "@/api/pricing";
import PRICING from "@/utils/pricing.json";
import { PricingCard } from "./PricingCard/PricingCard";
import { BannerOffer } from "./BannerOffer/BannerOffer";
import { FeatureComparison } from "./FeatureComparison/FeatureComparison";

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

  useEffect(() => {
    setIsLoading(true);
    getPlanPrice().then((data: PlanTypes) => {
      if (!data) {
        setIsLoading(false);
        return;
      }
      
      // Update full repo price
      const fullRepoKey = PRICING.fullRepoPlan.planId;
      if(data[fullRepoKey]) {
        setFullRepoPrice(data[fullRepoKey].amount);
      }
      
      // Update plan prices
      const updatedPlans = [...pricingPlans].map(plan => {
        const planKey = plan.planIdPerMonth;
        if (planKey && data[planKey]) {
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
            <p className="max-w-2xl text-center text-slate-400 text-lg">
              Choose the plan that fits your needs. All plans include core documentation features.
            </p>
            
            <div className="flex items-center mt-8 space-x-4">
              <CurrencyDropdown
                currency={currency}
                handleCurrencyChange={handleCurrencyChange}
              />
              
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
          </header>

          <div className="mb-16">
            <BannerOffer 
              price={fullRepoPrice} 
              currency={currency} 
              getCurrency={getCurrency}
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-200 mb-10">
            OR Choose a monthly subscription plan
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                  <PricingCard
                    key={plan.title}
                    title={plan.title}
                    price={plan.price}
                    popular={plan.title === "Pro"}
                    features={planFeatures[plan.title as keyof typeof planFeatures]}
                    currency={currency}
                    planId={billingCycle === 'monthly' ? plan.planIdPerMonth : plan.planIdPerYear}
                    getCurrency={getCurrency}
                  />
                ))}
              </div>

              <FeatureComparison />
            </>
          )}
        </div>
      </Element>
    </section>
  );
}
