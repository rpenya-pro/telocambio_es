import React from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  if (!src) {
    return null;
  }
  if (!alt) {
    return null;
  }

  return (
    <div className="thread-item">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <img src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
