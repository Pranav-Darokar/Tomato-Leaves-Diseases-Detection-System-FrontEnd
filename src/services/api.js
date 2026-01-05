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

                // Sample pixels to check for green/leaf-like colors
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                let greenPixels = 0;
                let totalPixels = pixels.length / 4;

                // Check for green-ish pixels (common in leaves)
                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];

                    // Check if pixel is greenish or brownish (diseased leaves)
                    // Green: g > r && g > b
                    // Brown/Yellow (diseased): r > 100 && g > 80
                    if ((g > r && g > b && g > 50) || (r > 100 && g > 80 && Math.abs(r - g) < 50)) {
                        greenPixels++;
                    }
                }

                const greenPercentage = (greenPixels / totalPixels) * 100;

                // If less than 15% green/brown pixels, likely not a leaf
                resolve(greenPercentage > 15);
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
