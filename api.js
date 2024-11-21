import axios from 'axios';

const API_KEY = '2b951efed38a0c89c659180f4c23a65d';
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

export async function getExchangeRates(baseCurrency) {
    const cachedData = localStorage.getItem(`rates-${baseCurrency}`);
    const cacheExpiration = localStorage.getItem(`rates-${baseCurrency}-expiration`);
  
    if (cachedData && cacheExpiration && new Date() < new Date(cacheExpiration)) {
      return JSON.parse(cachedData);
    }
  
    try {
      const response = await axios.get(`${BASE_URL}${baseCurrency}`);
      const rates = response.data.rates;
  
      localStorage.setItem(`rates-${baseCurrency}`, JSON.stringify(rates));
      localStorage.setItem(`rates-${baseCurrency}-expiration`, new Date(Date.now() + 60 * 60 * 1000).toString());
  
      return rates;
    } catch (error) {
      console.error("Ошибка при получении курсов валют:", error);
      return null;
    }
  }

export async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    const rates = await getExchangeRates(fromCurrency);
    return amount * rates[toCurrency];
  } catch (error) {
    console.error("Ошибка при конвертации валют:", error);
    return null;
  }
}
