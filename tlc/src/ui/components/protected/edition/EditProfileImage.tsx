import React, { FC, useRef, useState } from "react";
import { cameraIcon, agreeIcon, notAgreeIcon } from "../../../../assets/images";
import { useUpdateImage } from "../../../../services/useUpdateImage";

interface ProfileImageProps {
  userImage: string | undefined;
  user: string | undefined;
}

export const EditProfileImage: FC<ProfileImageProps> = ({
  userImage,
  user,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line no-unused-vars
  const [_file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const { uploadMutation, updateMutation } = useUpdateImage();

  const imageUrl = previewImage || userImage;

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreviewImage(objectURL);

      // Almacenamos el archivo
      setFile(selectedFile);
    }
  };

  const handleSaveImage = async () => {
    if (!inputRef.current?.files?.length) {
      console.error("No file selected");
      return;
    }
    const file = inputRef.current.files[0];

    try {
      const imageUrl = await uploadMutation.mutateAsync(file);
      const updatedUser = await updateMutation.mutateAsync({
        userId: user!,
        newAvatar: imageUrl,
      });
      console.log("Usuario actualizado: ", updatedUser);
    } catch (error) {
      console.error("Hubo un error al actualizar la imagen: ", error);
    }

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(undefined);
    }
  };

  const handleCancelChanges = () => {
    setPreviewImage(undefined);
  };
  return (
    <>
      <div className="row">
        <div className="col-12 image-container">
          <img className="imagen-fluida" src={imageUrl} alt={userImage} />

          <button
            className="camera-icon-btn btn-edit"
            onClick={handleImageClick}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
            />
            <img
              src={cameraIcon}
              alt="Edit Image"
              className="edit-camera-icon"
            />
          </button>

          {previewImage && previewImage !== userImage && (
            <>
              <button
                className="camera-icon-btn btn-save"
                onClick={handleSaveImage}
              >
                <img
                  src={agreeIcon}
                  alt="Edit Image"
                  className="edit-camera-icon"
                />
              </button>
              <button
                className="camera-icon-btn btn-cancel"
                onClick={handleCancelChanges}
              >
                <img
                  src={notAgreeIcon}
                  alt="Edit Image"
                  className="edit-camera-icon"
                />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="row globals">
        <div className="col-12 small sans-serif mt-2 mb-3">
          pulsa el icono para cambiar la imagen de avatar
        </div>
      </div>
    </>
  );
};
