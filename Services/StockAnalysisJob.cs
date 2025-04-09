using Quartz;
using StockRecommender.Core;
using StockRecommender.Models;
using StockRecommender.Services;

namespace StockRecommender.Services
{
    public class StockAnalysisJob : IJob
    {
        private readonly FinnhubService _finnhubService;
        private readonly StockAnalyzer _stockAnalyzer;

        public StockAnalysisJob(FinnhubService finnhubService, StockAnalyzer stockAnalyzer)
        {
            _finnhubService = finnhubService;
            _stockAnalyzer = stockAnalyzer;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                Console.WriteLine($"Starting stock analysis at {DateTime.Now}");

                // Example stock symbols to analyze
                var symbols = new[] { "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA" };
                var stockDataList = new List<StockData>();

                foreach (var symbol in symbols)
                {
                    try
                    {
                        var quote = await _finnhubService.GetStockQuote(symbol);

                        // Validate that we have valid price data
                        if (quote.PreviousClose == 0)
                        {
                            Console.WriteLine($"Warning: Previous close price is zero for {symbol}. Skipping this stock.");
                            continue;
                        }

                        var dailyRangePercent = (float)((quote.HighPrice - quote.LowPrice) / quote.PreviousClose * 100);

                        var stockData = new StockData
                        {
                            Symbol = symbol,
                            Open = (float)quote.OpenPrice,
                            High = (float)quote.HighPrice,
                            Low = (float)quote.LowPrice,
                            Close = (float)quote.CurrentPrice,
                            PreviousClose = (float)quote.PreviousClose,
                            PriceChange = (float)quote.PriceChange,
                            PriceChangePercent = (float)quote.PriceChangePercent,
                            DailyRangePercent = dailyRangePercent,
                            IsRecommended = false
                        };

                        stockDataList.Add(stockData);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error fetching data for {symbol}: {ex.Message}");
                    }
                }

                if (stockDataList.Count == 0)
                {
                    Console.WriteLine("No valid stock data was retrieved. Please try again later.");
                    return;
                }

                // Implement a more sophisticated recommendation strategy
                foreach (var stock in stockDataList)
                {
                    // Calculate a score based on multiple factors
                    float score = 0;

                    // Price movement (up to 40 points)
                    if (stock.PriceChangePercent > 0)
                    {
                        score += Math.Min(40, stock.PriceChangePercent * 10);
                    }

                    // Trading range (up to 30 points)
                    if (stock.DailyRangePercent < 5)
                    {
                        score += 30 - (stock.DailyRangePercent * 2);
                    }

                    // Position relative to daily range (up to 30 points)
                    float range = stock.High - stock.Low;
                    float position = (stock.Close - stock.Low) / range;
                    score += position * 30;

                    // Recommend if score is above threshold
                    stock.IsRecommended = score > 50;
                }

                // Train the model
                _stockAnalyzer.TrainModel(stockDataList);

                // Get recommendations
                var recommendations = _stockAnalyzer.GetRecommendations(stockDataList);

                Console.WriteLine("Stock Recommendations:");
                Console.WriteLine("----------------------");
                foreach (var recommendation in recommendations)
                {
                    Console.WriteLine($"Symbol: {recommendation.Symbol}");
                    Console.WriteLine($"Recommendation: {(recommendation.IsRecommended ? "BUY" : "HOLD")}");
                    Console.WriteLine($"Price Change: {recommendation.PriceChangePercent:F2}%");
                    Console.WriteLine($"Confidence: {recommendation.Confidence:P2}");
                    Console.WriteLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in stock analysis job: {ex.Message}");
            }
        }
    }
} 