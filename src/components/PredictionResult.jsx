import React from 'react';
import { Activity, AlertTriangle, CheckCircle, ShieldCheck, Thermometer, Leaf } from 'lucide-react';
import './PredictionResult.css';

const PredictionResult = ({ result, resetAnalysis }) => {
    if (!result) return null;

    const { diseases, isHealthy } = result;

    const getSeverityColor = (sev) => {
        switch (sev?.toLowerCase()) {
            case 'high':
            case 'critical':
                return '#ef4444'; // Red
            case 'medium':
                return '#f59e0b'; // Amber
            case 'low':
                return '#fbbf24'; // Yellow
            default:
                return '#10b981'; // Green
        }
    };

    // For healthy leaves, show simple result
    if (isHealthy && diseases.length === 1) {
        const disease = diseases[0];
        return (
            <div className="result-container glass-panel animate-fade-in">
                <div className="result-header">
                    <div className="score-ring" style={{ borderColor: '#10b981' }}>
                        <CheckCircle size={48} color="#10b981" />
                    </div>

                    <div className="diagnosis-info">
                        <h2 className="disease-title" style={{ color: '#10b981' }}>
                            <Leaf size={28} style={{ marginRight: '8px' }} />
                            Healthy Leaf
                        </h2>
                        <div className="severity-badge" style={{
                            backgroundColor: '#10b98120',
                            color: '#10b981',
                            border: '1px solid #10b98140'
                        }}>
                            <CheckCircle size={16} />
                            No Disease Detected
                        </div>
                    </div>
                </div>

                <div className="result-details">
                    <div className="treatment-section healthy">
                        <h3><ShieldCheck size={20} /> Plant Status</h3>
                        <p>{disease.treatment}</p>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="glass-button primary" onClick={resetAnalysis}>Analyze Another</button>
                </div>
            </div>
        );
    }

    // For infected leaves, show multiple diseases
    return (
        <div className="result-container glass-panel animate-fade-in">
            <div className="result-header">
                <div className="diagnosis-info" style={{ width: '100%' }}>
                    <h2 className="disease-title" style={{ color: '#ef4444' }}>
                        <AlertTriangle size={28} style={{ marginRight: '8px' }} />
                        Multiple Diseases Detected
                    </h2>
                    <p style={{ opacity: 0.8, marginTop: '8px' }}>
                        {diseases.length} disease{diseases.length > 1 ? 's' : ''} identified in this leaf
                    </p>
                </div>
            </div>

            <div className="result-details">
                {diseases.map((disease, index) => {
                    const severityColor = getSeverityColor(disease.severity);
                    return (
                        <div key={index} className="disease-card glass-panel" style={{ marginBottom: '16px' }}>
                            <div className="disease-card-header">
                                <div className="disease-info">
                                    <h3 className="disease-name">
                                        {index + 1}. {disease.disease_name}
                                    </h3>
                                    <div className="disease-meta">
                                        <div className="confidence-badge">
                                            <Activity size={14} />
                                            Confidence: {(disease.confidence * 100).toFixed(0)}%
                                        </div>
                                        <div
                                            className="severity-badge"
                                            style={{
                                                backgroundColor: `${severityColor}20`,
                                                color: severityColor,
                                                border: `1px solid ${severityColor}40`
                                            }}
                                        >
                                            <Thermometer size={14} />
                                            {disease.severity}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="disease-treatment">
                                <h4><ShieldCheck size={16} /> Treatment</h4>
                                <p>{disease.treatment}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="action-buttons">
                <button className="glass-button primary" onClick={resetAnalysis}>Analyze Another</button>
            </div>
        </div>
    );
};

export default PredictionResult;
