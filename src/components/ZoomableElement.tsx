"use client";

import React, { useState } from 'react';

interface ZoomableElementProps {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
  minScale?: number;
  step?: number;
}

/**
 * ZoomableElement Component
 * 
 * Provides smooth zoom-in and zoom-out functionality for any child element.
 * Ensures the layout remains responsive by using overflow hidden on the container.
 * 
 * @param children - The element to be zoomed (image, div, etc.)
 * @param className - Optional additional styles for the container
 * @param maxScale - Maximum zoom level (default 3)
 * @param minScale - Minimum zoom level (default 1)
 * @param step - Incremental zoom step (default 0.2)
 */
export default function ZoomableElement({ 
  children, 
  className = "", 
  maxScale = 3, 
  minScale = 1,
  step = 0.2
}: ZoomableElementProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + step, maxScale));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - step, minScale));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <div className={`zoom-component-container ${className}`}>
      {/* Controls */}
      <div className="zoom-controls d-flex gap-2 mb-4">
        <button 
          onClick={handleZoomOut}
          disabled={scale <= minScale}
          className="btn-zoom"
          title="Zoom Out"
        >
          <i className="ti ti-minus"></i>
        </button>
        <span className="zoom-level d-flex align-items-center justify-content-center fw-bold">
          {Math.round(scale * 100)}%
        </span>
        <button 
          onClick={handleZoomIn}
          disabled={scale >= maxScale}
          className="btn-zoom"
          title="Zoom In"
        >
          <i className="ti ti-plus"></i>
        </button>
        <button 
          onClick={handleReset}
          className="btn-zoom btn-reset"
          title="Reset Zoom"
        >
          <i className="ti ti-refresh"></i>
        </button>
      </div>

      {/* Zoomable Area */}
      <div className="zoom-viewport rounded-4 overflow-hidden border border-white/10 bg-black/20">
        <div 
          className="zoom-content transition-all duration-300 ease-out"
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .zoom-component-container {
          width: 100%;
          max-width: 100%;
        }
        .zoom-viewport {
          position: relative;
          width: 100%;
          cursor: grab;
        }
        .zoom-viewport:active {
          cursor: grabbing;
        }
        .zoom-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }
        .btn-zoom {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-zoom:hover:not(:disabled) {
          background: #ff7a00;
          border-color: #ff7a00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 122, 0, 0.3);
        }
        .btn-zoom:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .btn-reset {
          background: rgba(255, 122, 0, 0.1);
          color: #ff7a00;
        }
        .zoom-level {
          min-width: 60px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          color: #ff7a00;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
