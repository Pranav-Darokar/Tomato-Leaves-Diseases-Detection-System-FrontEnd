import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import './ImageUpload.css'; // We'll assume a component-specific CSS file or use inline styles for simplicity here, but let's stick to inline/utility for now to keep file count low, or add specific styles in index.css

const ImageUpload = ({ onImageSelect, isAnalyzing }) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageSelect(file, reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload an image file");
        }
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setPreview(null);
        onImageSelect(null, null);
    };

    return (
        <div className={`upload-container ${dragActive ? 'drag-active' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleChange}
                accept="image/*"
                disabled={isAnalyzing}
            />

            {preview ? (
                <div className="preview-container glass-panel animate-fade-in">
                    <img src={preview} alt="Upload preview" className="image-preview" />
                    <button className="remove-btn" onClick={clearImage} disabled={isAnalyzing}>
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <label htmlFor="file-upload" className="upload-label glass-panel">
                    <div className="upload-content">
                        <div className="icon-circle">
                            <Upload size={32} color="#10b981" />
                        </div>
                        <h3>Upload Tomato Leaf</h3>
                        <p>Drag & drop or click to browse</p>
                        <span className="file-types">Supports JPG, PNG, WEBP</span>
                    </div>
                </label>
            )}

            {/* Hidden drag overlay */}
            {dragActive && <div className="drag-file-element"></div>}
        </div>
    );
};

export default ImageUpload;
