import { DISEASES } from '../constants/diseases';

// Mock function to simulate API call
export const analyzeImage = async (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fileName = file.name.toLowerCase();
            let disease;
            let confidence;

            // Simple keyword matching for testing purposes
            if (fileName.includes('healthy')) {
                disease = DISEASES.find(d => d.id === 'healthy');
                confidence = 0.98;
            } else if (fileName.includes('bacterial') || fileName.includes('spot')) {
                disease = DISEASES.find(d => d.id === 'bacterial_spot');
                confidence = 0.89;
            } else if (fileName.includes('early') || fileName.includes('blight')) {
                disease = DISEASES.find(d => d.id === 'early_blight');
                confidence = 0.92;
            } else if (fileName.includes('not') || fileName.includes('random') || fileName.includes('cat') || fileName.includes('dog')) {
                // Simulate non-leaf image
                resolve({
                    success: true,
                    data: {
                        disease_name: "Unknown / Not a Leaf",
                        disease_id: "unknown",
                        confidence: 0.20,
                        treatment: "The image does not appear to be a tomato leaf. Please upload a clear photo of a tomato leaf.",
                        severity: "None"
                    }
                });
                return;
            } else {
                // Fallback to random for other files, but bias towards common diseases
                const randomIndex = Math.floor(Math.random() * (DISEASES.length - 1)); // Exclude last if needed, but here we just pick random
                disease = DISEASES[randomIndex];
                confidence = (0.7 + Math.random() * 0.29).toFixed(2);
            }

            resolve({
                success: true,
                data: {
                    disease_name: disease.name,
                    disease_id: disease.id,
                    confidence: parseFloat(confidence),
                    treatment: disease.treatment,
                    severity: disease.severity
                }
            });
        }, 2000);
    });
};
