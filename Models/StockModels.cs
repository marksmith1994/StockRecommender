using System.Text.Json.Serialization;

namespace StockRecommender.Models
{
    public class StockQuote
    {
        [JsonPropertyName("c")]
        public decimal CurrentPrice { get; set; }

        [JsonPropertyName("d")]
        public decimal PriceChange { get; set; }

        [JsonPropertyName("dp")]
        public decimal PriceChangePercent { get; set; }

        [JsonPropertyName("h")]
        public decimal HighPrice { get; set; }

        [JsonPropertyName("l")]
        public decimal LowPrice { get; set; }

        [JsonPropertyName("o")]
        public decimal OpenPrice { get; set; }

        [JsonPropertyName("pc")]
        public decimal PreviousClose { get; set; }

        [JsonPropertyName("t")]
        public long Timestamp { get; set; }
    }

    public class CompanyProfile
    {
        public string Name { get; set; }
        public string Ticker { get; set; }
        public string Exchange { get; set; }
        public string Industry { get; set; }
        public string WebUrl { get; set; }
    }

    public class TechnicalIndicator
    {
        public decimal[] Rsi { get; set; }
        public decimal[] Sma20 { get; set; }
        public decimal[] Sma50 { get; set; }
        public long[] Timestamp { get; set; }
    }

    public class StockData
    {
        public string Symbol { get; set; }
        public float Open { get; set; }
        public float High { get; set; }
        public float Low { get; set; }
        public float Close { get; set; }
        public float PreviousClose { get; set; }
        public float PriceChange { get; set; }
        public float PriceChangePercent { get; set; }
        public float DailyRangePercent { get; set; }
        public bool IsRecommended { get; set; }
    }

    public class StockPrediction
    {
        public bool IsRecommended { get; set; }
        public float Score { get; set; }
    }

    public class StockRecommendation
    {
        public string Symbol { get; set; }
        public bool IsRecommended { get; set; }
        public float Confidence { get; set; }
        public float PriceChangePercent { get; set; }
    }
} 