/**
 * @maataa/ui/ai/components
 * ML/AI visualization components
 */

import React from "react";

export interface MLInsightsPanelProps {
  title?: string;
  insights?: Array<{ id: string; label: string; value: number }>;
}

export interface PredictionChartProps {
  predictions: number[];
  historical: number[];
  confidence?: number;
}

export interface AnomalyAlertsProps {
  anomalies?: Array<{ id: string; severity: string; description: string }>;
  onDismiss?: (id: string) => void;
}

export interface RecommendationCardsProps {
  recommendations?: Array<{ id: string; title: string; description: string; score: number }>;
  onAccept?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export interface EmbeddingVisualizationProps {
  embeddings?: Array<{ id: string; x: number; y: number }>;
  onNodeClick?: (id: string) => void;
}

/**
 * MLInsightsPanel
 * Display ML-derived insights
 */
export const MLInsightsPanel: React.FC<MLInsightsPanelProps> = ({
  title = "ML Insights",
  insights = [],
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>{title}</h3>
      {insights.length === 0 ? (
        <p>No insights available</p>
      ) : (
        <ul>
          {insights.map((insight) => (
            <li key={insight.id}>
              {insight.label}: {insight.value.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * PredictionChart
 * Display predictions vs historical data
 */
export const PredictionChart: React.FC<PredictionChartProps> = ({
  predictions,
  historical,
  confidence,
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Predictions</h3>
      <p style={{ fontSize: "12px", color: "#999" }}>
        Showing {historical.length} historical + {predictions.length} predicted points
        {confidence && ` (Confidence: ${(confidence * 100).toFixed(0)}%)`}
      </p>
      <div
        style={{
          height: "200px",
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#999" }}>Chart placeholder</p>
      </div>
    </div>
  );
};

/**
 * AnomalyAlerts
 * Display detected anomalies
 */
export const AnomalyAlerts: React.FC<AnomalyAlertsProps> = ({ anomalies = [], onDismiss }) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Anomaly Alerts</h3>
      {anomalies.length === 0 ? (
        <p style={{ color: "#0a0" }}>No anomalies detected</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {anomalies.map((anomaly) => (
            <li
              key={anomaly.id}
              style={{
                padding: "8px",
                marginBottom: "8px",
                backgroundColor: anomaly.severity === "high" ? "#fee" : "#ffe",
                borderLeft: `4px solid ${anomaly.severity === "high" ? "#f00" : "#f90"}`,
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{anomaly.description}</span>
              <button
                onClick={() => onDismiss?.(anomaly.id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * RecommendationCards
 * Display ML-generated recommendations
 */
export const RecommendationCards: React.FC<RecommendationCardsProps> = ({
  recommendations = [],
  onAccept,
  onDismiss,
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Recommendations</h3>
      {recommendations.length === 0 ? (
        <p>No recommendations available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              style={{
                padding: "12px",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px",
                border: "1px solid #eee",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{rec.title}</div>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                {rec.description}
              </div>
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>
                Score: {(rec.score * 100).toFixed(0)}%
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button
                  onClick={() => onAccept?.(rec.id)}
                  style={{
                    flex: 1,
                    padding: "4px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => onDismiss?.(rec.id)}
                  style={{
                    flex: 1,
                    padding: "4px",
                    backgroundColor: "#ddd",
                    color: "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * EmbeddingVisualization
 * Visualize embeddings in 2D space
 */
export const EmbeddingVisualization: React.FC<EmbeddingVisualizationProps> = ({
  embeddings = [],
  onNodeClick,
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Embedding Visualization</h3>
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {embeddings.length === 0 ? (
          <p style={{ color: "#999" }}>No embeddings to visualize</p>
        ) : (
          <svg width="100%" height="100%">
            {embeddings.map((embedding) => (
              <circle
                key={embedding.id}
                cx={embedding.x * 300 + 150}
                cy={embedding.y * 300 + 150}
                r="5"
                fill="#3498db"
                opacity="0.7"
                onClick={() => onNodeClick?.(embedding.id)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </svg>
        )}
      </div>
      <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
        Showing {embeddings.length} embeddings
      </p>
    </div>
  );
};
