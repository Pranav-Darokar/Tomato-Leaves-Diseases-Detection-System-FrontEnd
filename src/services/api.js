import { DISEASES } from '../constants/diseases';

// Helper function to validate if image contains leaf-like characteristics
const validateLeafImage = async (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas to analyze image pixels
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Sample pixels to check for leaf-like characteristics
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                let leafLikePixels = 0;
                let totalPixels = pixels.length / 4;
                let colorVariation = 0;
                let prevPixel = null;

                // Check for leaf-like color patterns
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];

                    // Skip transparent/nearly transparent pixels
                    if (a < 128) continue;

                    // Check if pixel is in leaf color range
                    // Healthy leaf: medium to dark green
                    // Diseased leaf: yellow, brown, dark spots
                    const isGreen = g > r && g > b && g > 70 && r < 180 && b < 180;
                    const isYellowBrown = (r > 140 && g > 100 && b < 100) || (r > 160 && g > 120 && b < 80);
                    const isDarkSpot = r < 80 && g < 80 && b < 80;
                    const isLightGreen = g > 90 && r < g && b < g && (r + b) < 200;

                    if (isGreen || isYellowBrown || isDarkSpot || isLightGreen) {
                        leafLikePixels++;
                    }

                    // Track color variation for texture
                    if (prevPixel) {
                        const diff = Math.abs(r - prevPixel.r) + Math.abs(g - prevPixel.g) + Math.abs(b - prevPixel.b);
                        if (diff > 10) colorVariation++;
                    }
                    prevPixel = { r, g, b };
                }

                const leafPercentage = (leafLikePixels / totalPixels) * 100;
                const variationPercentage = (colorVariation / totalPixels) * 100;

                // Stricter validation:
                // Need at least 30% leaf-like colors AND reasonable texture variation (at least 20%)
                const isLeaf = leafPercentage > 30 && variationPercentage > 20;

                resolve(isLeaf);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

// Get multiple diseases for infected leaves
const getMultipleDiseases = () => {
    // Exclude 'healthy' from disease selection
    const diseaseList = DISEASES.filter(d => d.id !== 'healthy');

    // Randomly select 2-3 diseases
    const numDiseases = Math.random() > 0.5 ? 3 : 2;
    const selectedDiseases = [];
    const usedIndices = new Set();

    while (selectedDiseases.length < numDiseases && selectedDiseases.length < diseaseList.length) {
        const randomIndex = Math.floor(Math.random() * diseaseList.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            const disease = diseaseList[randomIndex];
            selectedDiseases.push({
                ...disease,
                confidence: parseFloat((0.75 + Math.random() * 0.23).toFixed(2))
            });
        }
    }

    // Sort by confidence (highest first)
    return selectedDiseases.sort((a, b) => b.confidence - a.confidence);
};

// Enhanced function to analyze image with validation
export const analyzeImage = async (file) => {
    try {
        // First, validate if the image is a leaf
        const isLeaf = await validateLeafImage(file);

        if (!isLeaf) {
            return {
                success: false,
                error: "Please upload a proper tomato leaf image. The uploaded image does not appear to be a plant leaf."
            };
        }

        // Simulate API processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const fileName = file.name.toLowerCase();

        // Check if it's a healthy leaf (based on filename for testing)
        if (fileName.includes('healthy')) {
            const healthyDisease = DISEASES.find(d => d.id === 'healthy');
            return {
                success: true,
                data: {
                    isHealthy: true,
                    diseases: [{
                        disease_name: healthyDisease.name,
                        disease_id: healthyDisease.id,
                        confidence: 0.96,
                        treatment: healthyDisease.treatment,
                        severity: healthyDisease.severity
                    }]
                }
            };
        }

        // For infected leaves, return multiple diseases
        const diseases = getMultipleDiseases();

        return {
            success: true,
            data: {
                isHealthy: false,
                diseases: diseases.map(d => ({
                    disease_name: d.name,
                    disease_id: d.id,
                    confidence: d.confidence,
                    treatment: d.treatment,
                    severity: d.severity
                }))
            }
        };
    } catch (error) {
        console.error('Image analysis error:', error);
        return {
            success: false,
            error: "Failed to analyze the image. Please try again with a clear tomato leaf photo."
        };
    }
};
