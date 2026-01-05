import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import PredictionResult from '../components/PredictionResult';
import { analyzeImage } from '../services/api';

const Detection = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleImageSelect = async (file, previewUrl) => {
        setImage(file);
        setPreview(previewUrl);
        setResult(null);

        if (file) {
            await handleAnalyze(file);
        }
    };

    const handleAnalyze = async (file) => {
        setIsAnalyzing(true);
        try {
            // Simulate API call
            const response = await analyzeImage(file);
            if (response.success) {
                // Add artificial delay for "scanning" effect
                await new Promise(resolve => setTimeout(resolve, 1500));
                setResult(response.data);
            }
        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Failed to analyze image. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
    };

    return (
        <div className="detection-page container animate-fade-in">
            <div className="detection-header">
                <h1>Disease Dectection</h1>
                <p>Upload a clear photo of the tomato leaf for instant analysis</p>
            </div>

            <div className="detection-content">
                {!result && (
                    <div className="upload-section">
                        {isAnalyzing && (
                            <div className="analyzing-overlay">
                                <div className="scanner"></div>
                                <div className="loader"></div>
                                <p>Analyzing leaf patterns...</p>
                            </div>
                        )}
                        <ImageUpload onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />
                    </div>
                )}

                {result && (
                    <PredictionResult result={result} resetAnalysis={resetAnalysis} />
                )}
            </div>
        </div>
    );
};

export default Detection;
