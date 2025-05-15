import { useCallback, useEffect, useState } from "react";
import { PlanTypes, getPlanPrice } from "@/api/pricing";
import PRICING from "@/utils/pricing.json";

export type CurrencyOptions = "USD" | "INR";
export type BillingCycle = 'monthly' | 'yearly';
export type PricingOption = 'oneTime' | 'subscription';

/**
 * Custom hook for managing pricing data and currency conversion
 * This combines functionality previously split between components
 * and follows best practices for React hooks
 */
export function usePricing() {
  // Currency-related state
  const [currency, setCurrency] = useState<CurrencyOptions>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("selected-currency");
      return saved ? (JSON.parse(saved) as CurrencyOptions) : "USD";
    }
    return "USD";
  });
  const [exchangeRate, setExchangeRate] = useState<number>(82);

  // Pricing-related state
  const [isLoading, setIsLoading] = useState(true);
  const [pricingPlans, setPricingPlans] = useState(PRICING.plans);
  const [fullRepoPrice, setFullRepoPrice] = useState(PRICING.fullRepoPlan.amount);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [pricingOption, setPricingOption] = useState<PricingOption>('oneTime');
  const [planPriceFromAPI, setPlanPriceFromAPI] = useState<PlanTypes>({});

  // Fetch exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://production-gateway.snorkell.ai/api/v1/analytics/conversionRates"
        );
        const data = await response.json();
        setExchangeRate(data);
      } catch (err) {
        console.error("Error fetching exchange rate:", err);
      }
    };

    fetchExchangeRate();
  }, []);

  // Determine user's currency based on location API if not saved
  useEffect(() => {
    const savedCurrency = typeof window !== 'undefined' ? localStorage.getItem("selected-currency") : null;
    if (savedCurrency) {
      try {
        JSON.parse(savedCurrency) as CurrencyOptions;
        return;
      } catch (error) {
        console.error("Error parsing saved currency:", error);
      }
    }
      
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "https://production-gateway.snorkell.ai/api/v1/analytics/getLocation"
        );

        const { currency_code } = await response.json();
        handleCurrencyChange(currency_code);
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };

    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch pricing plans
  useEffect(() => {
    setIsLoading(true);
    getPlanPrice().then((data: PlanTypes) => {
      if (!Object.keys(data).length) {
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

  // Update pricing based on billing cycle
  useEffect(() => {
    let workingPricingPlans = [...pricingPlans];
    if(Object.keys(planPriceFromAPI).length === 0) {
      // api gateway is not available
      workingPricingPlans = [...PRICING.plans];
    }
    const updatedPlans = workingPricingPlans.map(plan => {
      const planKey = plan.planIdPerMonth;
      
      // Check if we should use yearly pricing with discount
      if (billingCycle === 'yearly' && plan.price) {
        // Convert price to number, calculate yearly with discount, then convert back to string
        const monthlyPrice = Number(plan.price);
        if (!isNaN(monthlyPrice)) {
          const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
          return { ...plan, price: yearlyPrice.toString() };
        }
      }

      // Regular monthly pricing from API or default
      if (planKey && planPriceFromAPI[planKey]) {
        return { ...plan, price: planPriceFromAPI[planKey].amount + "" };
      }
      return plan;
    });    
    setPricingPlans(updatedPlans);
  }, [billingCycle, planPriceFromAPI]);

  // Currency conversion utility
  const getCurrency = useCallback(
    (priceInUSD: number) => {
      if (!currency) return priceInUSD;

      switch (currency) {
        case "USD":
          return priceInUSD;
        case "INR":
          return Math.round(priceInUSD * exchangeRate);
        default:
          return priceInUSD;
      }
    },
    [currency, exchangeRate]
  );

  // Currency change handler
  const handleCurrencyChange = useCallback((code: CurrencyOptions) => {
    setCurrency(code);

    if (typeof window !== 'undefined') {
      localStorage.setItem("selected-currency", JSON.stringify(code));

      const url = new URL(window.location.href);
      url.searchParams.set("currency", code);
      window.history.pushState({}, "", url.toString());
    }
  }, []);

  return {
    // Currency-related
    currency,
    handleCurrencyChange,
    getCurrency,
    
    // Pricing-related
    isLoading,
    pricingPlans,
    fullRepoPrice,
    billingCycle,
    setBillingCycle,
    pricingOption,
    setPricingOption,
    currencySymbol: currency === "INR" ? "₹" : "$",
  };
}
