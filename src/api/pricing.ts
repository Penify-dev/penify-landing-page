export interface PlanOption {
  amount: number;
}

export interface PlanTypes {
  [key: string]: PlanOption; // For any additional plans that might be added in the future
}

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
