using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using StockRecommender.Models;

namespace StockRecommender.Services
{
    public class FinnhubService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://finnhub.io/api/v1";

        public FinnhubService(string apiKey)
        {
            _apiKey = apiKey;
            _httpClient = new HttpClient();
        }

        public async Task<StockQuote> GetStockQuote(string symbol)
        {
            try
            {
                var url = $"{BaseUrl}/quote?symbol={symbol}&token={_apiKey}";
                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Failed to get stock quote for {symbol}. Status: {response.StatusCode}. Error: {errorContent}");
                }

                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Raw response for {symbol}: {content}"); // Log the raw response

                var quote = JsonSerializer.Deserialize<StockQuote>(content);

                // Validate the quote data
                if (quote == null)
                {
                    throw new Exception($"Invalid response format for {symbol}");
                }

                // Log the deserialized values
                Console.WriteLine($"Deserialized data for {symbol}:");
                Console.WriteLine($"CurrentPrice: {quote.CurrentPrice}");
                Console.WriteLine($"PreviousClose: {quote.PreviousClose}");
                Console.WriteLine($"OpenPrice: {quote.OpenPrice}");
                Console.WriteLine($"HighPrice: {quote.HighPrice}");
                Console.WriteLine($"LowPrice: {quote.LowPrice}");

                if (quote.CurrentPrice == 0 || quote.PreviousClose == 0)
                {
                    throw new Exception($"Invalid price data for {symbol}");
                }

                return quote;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching stock quote for {symbol}: {ex.Message}", ex);
            }
        }

        public async Task<CompanyProfile> GetCompanyProfile(string symbol)
        {
            try
            {
                var url = $"{BaseUrl}/stock/profile2?symbol={symbol}&token={_apiKey}";
                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Failed to get company profile for {symbol}. Status: {response.StatusCode}. Error: {errorContent}");
                }

                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<CompanyProfile>(content);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching company profile for {symbol}: {ex.Message}", ex);
            }
        }

        public async Task<TechnicalIndicator> GetTechnicalIndicator(string symbol, string resolution, long from, long to)
        {
            try
            {
                var url = $"{BaseUrl}/indicator?symbol={symbol}&resolution={resolution}&from={from}&to={to}&token={_apiKey}";
                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException($"Failed to get technical indicators for {symbol}. Status: {response.StatusCode}. Error: {errorContent}");
                }

                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<TechnicalIndicator>(content);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching technical indicators for {symbol}: {ex.Message}", ex);
            }
        }
    }
} 