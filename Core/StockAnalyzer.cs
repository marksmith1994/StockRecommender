using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using System.Collections.Generic;
using System.Linq;
using StockRecommender.Models;

namespace StockRecommender.Core
{
    public class StockAnalyzer
    {
        private readonly MLContext _mlContext;
        private ITransformer _model;
        private PredictionEngine<StockData, StockPrediction> _predictionEngine;

        public StockAnalyzer()
        {
            _mlContext = new MLContext();
        }

        public void TrainModel(List<StockData> trainingData)
        {
            var dataView = _mlContext.Data.LoadFromEnumerable(trainingData);

            var pipeline = _mlContext.Transforms.CopyColumns(outputColumnName: "Label", inputColumnName: nameof(StockData.IsRecommended))
                .Append(_mlContext.Transforms.Categorical.OneHotEncoding(outputColumnName: "SymbolEncoded", inputColumnName: nameof(StockData.Symbol)))
                .Append(_mlContext.Transforms.Concatenate("Features", 
                    nameof(StockData.Open),
                    nameof(StockData.High),
                    nameof(StockData.Low),
                    nameof(StockData.Close),
                    nameof(StockData.PreviousClose),
                    nameof(StockData.PriceChangePercent),
                    nameof(StockData.DailyRangePercent),
                    "SymbolEncoded"))
                .Append(_mlContext.BinaryClassification.Trainers.FastTree());

            _model = pipeline.Fit(dataView);
            _predictionEngine = _mlContext.Model.CreatePredictionEngine<StockData, StockPrediction>(_model);
        }

        public StockPrediction Predict(StockData stockData)
        {
            return _predictionEngine.Predict(stockData);
        }

        public List<StockRecommendation> GetRecommendations(List<StockData> stocks)
        {
            var recommendations = new List<StockRecommendation>();

            foreach (var stock in stocks)
            {
                var prediction = Predict(stock);
                recommendations.Add(new StockRecommendation
                {
                    Symbol = stock.Symbol,
                    IsRecommended = prediction.IsRecommended,
                    Confidence = prediction.Score,
                    PriceChangePercent = stock.PriceChangePercent
                });
            }

            return recommendations.OrderByDescending(r => r.Confidence).ToList();
        }
    }
} 