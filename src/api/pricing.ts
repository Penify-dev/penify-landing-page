export interface PlanOption {
  amount: number;
}

export interface PlanTypes {
  [key: string]: PlanOption; // For any additional plans that might be added in the future
}

/**
 * Asynchronously fetches the price plan from the external API.
 *
 * This function makes a network request to retrieve the pricing details for plans.
 * It handles HTTP errors and returns an empty object in case of failure.
 *
 * @returns {Promise<PlanTypes>} A promise that resolves to the pricing plan details.
 *
 * @throws {Error} Throws an error if the response from the API is not ok (i.e., status code is not in the range 200-299).
 *
 * @example
 * getPlanPrice().then(plan => {
 *   console.log(plan);
 * }).catch(error => {
 *   console.error("Failed to fetch plan price:", error);
 * });
 */
export const getPlanPrice = async (): Promise<PlanTypes> => {
  try {
    const response = await fetch("https://production-gateway.snorkell.ai/api/v1/analytics/pricePlan");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching plan prices:", error);
    return {};
  }
};
