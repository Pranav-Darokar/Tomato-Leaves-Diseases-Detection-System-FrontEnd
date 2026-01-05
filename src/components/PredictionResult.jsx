import React from 'react';
import { Activity, AlertTriangle, CheckCircle, ShieldCheck, Thermometer } from 'lucide-react';
import './PredictionResult.css';

const PredictionResult = ({ result, resetAnalysis }) => {
    if (!result) return null;

    const { disease_name, confidence, treatment, severity, disease_id } = result;

    const getSeverityColor = (sev) => {
        switch (sev?.toLowerCase()) {
            case 'high':
            case 'critical':
                return '#ef4444'; // Red
            case 'medium':
                return '#f59e0b'; // Amber
            default:
                return '#10b981'; // Green
        }
    };

    const severityColor = getSeverityColor(severity);

    return (
        <div className="result-container glass-panel animate-fade-in">
            <div className="result-header">
                <div className="score-ring" style={{ borderColor: severityColor }}>
                    <span className="score-value">{(confidence * 100).toFixed(0)}%</span>
                    <span className="score-label">Confidence</span>
                </div>

                <div className="diagnosis-info">
                    <h2 className="disease-title">{disease_name}</h2>
                    <div className="severity-badge" style={{ backgroundColor: `${severityColor}20`, color: severityColor, border: `1px solid ${severityColor}40` }}>
                        <Activity size={16} />
                        Severity: {severity}
                    </div>
                </div>
            </div>

            <div className="result-details">
                {disease_id !== 'healthy' && (
                    <div className="treatment-section">
                        <h3><ShieldCheck size={20} /> Recommended Treatment</h3>
                        <p>{treatment}</p>
                    </div>
                )}

                {disease_id === 'healthy' && (
                    <div className="treatment-section healthy">
                        <h3><ShieldCheck size={20} /> Plant Status</h3>
                        <p>{treatment}</p>
                    </div>
                )}
            </div>

            <div className="action-buttons">
                <button className="glass-button primary" onClick={resetAnalysis}>Analyze Another</button>
            </div>
        </div>
    );
};

export default PredictionResult;
