import React, { useState, useEffect } from "react";
import { analyzeCode } from "../api";
import { MdErrorOutline, MdWarning, MdInfoOutline, MdCheckCircle } from "react-icons/md";

const ErrorSuggestions = ({ code, language }) => {
  const [errors, setErrors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("errors");

  useEffect(() => {
    const analyzeCodeDebounced = async () => {
      if (!code.trim()) {
        setErrors([]);
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const result = await analyzeCode(code, language);
        setErrors(result.errors || []);
        setSuggestions(result.suggestions || []);
      } catch (err) {
        console.error("Error analyzing code:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid too many API calls
    const timer = setTimeout(analyzeCodeDebounced, 1000);
    return () => clearTimeout(timer);
  }, [code, language]);

  const getIcon = (severity) => {
    switch (severity) {
      case "error":
        return <MdErrorOutline style={{ color: "#ef4444", fontSize: "18px" }} />;
      case "warning":
        return <MdWarning style={{ color: "#eab308", fontSize: "18px" }} />;
      case "info":
        return <MdInfoOutline style={{ color: "#3b82f6", fontSize: "18px" }} />;
      default:
        return <MdCheckCircle style={{ color: "#22c55e", fontSize: "18px" }} />;
    }
  };

  return (
    <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #475569", overflow: "hidden", marginTop: "16px" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#0f172a", padding: "16px", borderBottom: "1px solid #475569" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", color: "#f1f5f9" }}>
            <span>🔍 Code Analysis</span>
            {loading && <span style={{ fontSize: "12px", color: "#60a5fa" }}>Analyzing...</span>}
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            {errors.length > 0 && (
              <span style={{ backgroundColor: "#fecaca", color: "#991b1b", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                {errors.length} Issues
              </span>
            )}
            {errors.length === 0 && code.trim() && (
              <span style={{ backgroundColor: "#bbf7d0", color: "#166534", padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                ✓ No Issues
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #475569" }}>
        <button
          onClick={() => setActiveTab("errors")}
          style={{
            flex: 1,
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: activeTab === "errors" ? "#1e293b" : "transparent",
            color: activeTab === "errors" ? "#f87171" : "#94a3b8",
            borderBottom: activeTab === "errors" ? "2px solid #ef4444" : "none",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Errors ({errors.length})
        </button>
        <button
          onClick={() => setActiveTab("suggestions")}
          style={{
            flex: 1,
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: activeTab === "suggestions" ? "#1e293b" : "transparent",
            color: activeTab === "suggestions" ? "#60a5fa" : "#94a3b8",
            borderBottom: activeTab === "suggestions" ? "2px solid #3b82f6" : "none",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Suggestions ({suggestions.length})
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", maxHeight: "400px", overflowY: "auto" }}>
        {activeTab === "errors" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {errors.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8" }}>
                <p>✨ No errors found! Your code looks great.</p>
              </div>
            ) : (
              errors.map((error, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "12px",
                    borderLeft: `4px solid ${error.severity === "error" ? "#ef4444" : error.severity === "warning" ? "#eab308" : "#3b82f6"}`,
                    borderRadius: "6px",
                    backgroundColor: error.severity === "error" ? "#fef2f2" : error.severity === "warning" ? "#fefce8" : "#eff6ff",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ marginTop: "4px" }}>{getIcon(error.severity)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>
                          Line {error.line}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: error.severity === "error" ? "#fee2e2" : error.severity === "warning" ? "#fef08a" : "#dbeafe",
                            color: error.severity === "error" ? "#991b1b" : error.severity === "warning" ? "#854d0e" : "#1e40af",
                            textTransform: "capitalize",
                          }}
                        >
                          {error.severity}
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", marginTop: "4px", color: "#1e293b" }}>{error.message}</p>
                      {error.code && (
                        <code style={{ fontSize: "12px", display: "block", marginTop: "8px", backgroundColor: "#00000030", padding: "8px", borderRadius: "4px", overflow: "auto", color: "#1e293b" }}>
                          {error.code}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {suggestions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8" }}>
                <p>💡 No suggestions at this time.</p>
              </div>
            ) : (
              suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "12px",
                    borderLeft: "4px solid #3b82f6",
                    borderRadius: "6px",
                    backgroundColor: "#eff6ff",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ marginTop: "4px" }}>
                      <MdInfoOutline style={{ color: "#3b82f6", fontSize: "18px" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>
                          {suggestion.title}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: suggestion.priority === "high" ? "#fee2e2" : suggestion.priority === "medium" ? "#fef08a" : "#dbeafe",
                            color: suggestion.priority === "high" ? "#991b1b" : suggestion.priority === "medium" ? "#854d0e" : "#1e40af",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {suggestion.priority}
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", marginTop: "4px", color: "#1e293b" }}>
                        {suggestion.description}
                      </p>
                      {suggestion.example && (
                        <code style={{ fontSize: "12px", display: "block", marginTop: "8px", backgroundColor: "#00000020", padding: "8px", borderRadius: "4px", overflow: "auto", color: "#1e293b" }}>
                          {suggestion.example}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorSuggestions;
