
export const ExchangeRateUSDToVND = async() => {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        return data.rates.VND;
    } catch (error) {
        console.error(error);
        return null;
    }
};
