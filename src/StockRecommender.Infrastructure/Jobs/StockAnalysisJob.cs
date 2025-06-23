using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Quartz;
using StockRecommender.Core.Services;
using StockRecommender.Core.Models;
using StockRecommender.Infrastructure.Services;

namespace StockRecommender.Infrastructure.Jobs
{
    public class StockAnalysisJob : IJob
    {
        private readonly IFinnhubService _finnhubService;
        private readonly IStockAnalyzer _stockAnalyzer;
        private readonly ILogger<StockAnalysisJob> _logger;

        public StockAnalysisJob(
            IFinnhubService finnhubService,
            IStockAnalyzer stockAnalyzer,
            ILogger<StockAnalysisJob> logger)
        {
            _finnhubService = finnhubService;
            _stockAnalyzer = stockAnalyzer;
            _logger = logger;
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
                        if (quote != null)
                        {
                            var recommendation = _stockAnalyzer.AnalyzeStock(quote);
                            _logger.LogInformation(
                                "Stock Analysis - Symbol: {Symbol}, Recommendation: {Recommendation}, Confidence: {Confidence}%",
                                symbol,
                                recommendation.Recommendation,
                                recommendation.Confidence);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error analyzing stock {Symbol}", symbol);
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
                _logger.LogError(ex, "Error executing stock analysis job");
            }
        }
    }
} 