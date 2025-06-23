export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  currencyApiUrl: 'https://api.exchangerate-api.com/v4/latest/USD',
  defaultCurrency: 'GBP',
  cacheDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  maxSearchResults: 50,
  defaultExchangeRate: 0.79
}; 