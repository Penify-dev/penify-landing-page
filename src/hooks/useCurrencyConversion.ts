// import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect, useState } from "react";

export type CurrencyOptions = "USD" | "INR";

export function useCurrencyConversion() {
  const [currency, setCurrency] = useState<CurrencyOptions>(() => {
    const saved = localStorage.getItem("selected-currency");
    return saved ? (JSON.parse(saved) as CurrencyOptions) : "USD";
  });

  const [exchangeRate, setExchangeRate] = useState<number>(82);
  // const [showLocationPopup, setShowLocationPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://production-gateway.snorkell.ai/api/v1/analytics/conversionRates"
        );
        const data = await response.json();
        setExchangeRate(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selected-currency");
    if (savedCurrency) {
      try {
      JSON.parse(savedCurrency) as CurrencyOptions;
      return;
      }
      catch (error) {
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
        console.error(err);
      }
    };

    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  useEffect(() => {
    const askedForLocation = localStorage.getItem("asked-for-location");

    if (!askedForLocation) {
      setShowLocationPopup(true);
    }
  }, []);

  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchCurrencyCode(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your system");
    }
  }

  const fetchCurrencyCode = async (latitude: number, longitude: number) => {
    try {
      const resp = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5328fdf912a24872a29d86f8177dec07`
      );

      const data = await resp.json();

      if (data.results && data.results.length > 0) {
        const { iso_code } = data.results[0].annotations.currency;
        const { formatted } = data.results[0];

        if (iso_code && iso_code !== currency) {
          handleCurrencyChange(iso_code);
        }

        if (formatted) {
          sendGTMEvent({
            event_category: "Location Access",
            userLocation: formatted,
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch currency code", err);
    }
  };
  */

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

  const handleCurrencyChange = useCallback((code: CurrencyOptions) => {
    setCurrency(code);

    localStorage.setItem("selected-currency", JSON.stringify(code));

    const url = new URL(window.location.href);
    url.searchParams.set("currency", code);
    window.history.pushState({}, "", url.toString());
  }, []);

  /*
  function handleAcceptLocation() {
    setShowLocationPopup(false);

    localStorage.setItem("asked-for-location", "true");
    getUserLocation();
  }

  function handleDeclineLocation() {
    setShowLocationPopup(false);

    localStorage.setItem("asked-for-location", "true");
  }
  */

  return {
    currency,
    handleCurrencyChange,
    getCurrency,
    // showLocationPopup,
    // handleAcceptLocation,
    // handleDeclineLocation,
  };
}
