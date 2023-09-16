import { useState } from "react";
import ImageModal from "../ImageModal";

interface InteractiveImageProps {
  allImages: string[] | undefined;
  alt: string;
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({
  allImages,
  alt,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const openModal = (image: string) => setActiveImage(image);
  const closeModal = () => setActiveImage(null);

  if (!allImages) {
    return null;
  }

  const mainImage = allImages[0];
  const otherImages = allImages.slice(1); //las demás imágenes excluyendo la primera.

  return (
    <>
      <div className="thread__square-container">
        <img
          className="thread__square-image"
          src={`/images/${mainImage}`}
          alt={alt}
          onClick={() => openModal(`/images/${mainImage}`)}
        />
      </div>
      <div className="d-flex justify-content-left mt-2">
        {otherImages.map((image, index) => (
          <div key={index} className="thread__square-container-mini me-2">
            <img
              className="thread__square-image-mini"
              src={`/images/${image}`}
              alt={alt}
              onClick={() => openModal(`/images/${image}`)}
            />
          </div>
        ))}

        {activeImage && (
          <ImageModal
            src={activeImage}
            alt={activeImage}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};
