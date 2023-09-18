// ThreadItem.tsx
import React, { useState } from "react";
import { Thread } from "../../../interfaces/thread";
import noImage from "../../../assets/images/noimage.png";
import ImageModal from "../ImageModal";
import useDateFormat from "../../hooks/useDateFormat";
import { ModalThread } from "./ModalThread";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OwnerIndicator } from "./OwnerIndicator";

const baseUrl = import.meta.env.VITE_HOST_URL;

interface ThreadItemProps {
  allData?: Thread;

  user: string | undefined;
}

const safeBase64Encode = (data: string) => {
  const encoded = btoa(data);
  return encoded.replace("+", "-").replace("/", "_").replace(/=+$/, "");
};

const ThreadItem: React.FC<ThreadItemProps> = ({ allData, user }) => {
  const { formatDate } = useDateFormat();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //modal images
  const [showModal, setShowModal] = useState(false); //modal global

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  //pasamos el id a base64
  const dataToEncode = JSON.stringify(allData?._id);
  const handleOpenDetail = () => {
    navigate(`/d/${safeBase64Encode(dataToEncode)}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!allData) {
    return null;
  }

  return (
    <>
      {isModalOpen && (
        <ImageModal
          src={`${baseUrl}/images/${
            allData.threadImages && allData.threadImages[0]
          }`}
          alt={allData.description!}
          onClose={closeModal}
        />
      )}
      <ModalThread
        show={showModal}
        onHide={handleCloseModal}
        data={allData && allData}
      />
      <div className="card ms-3 me-3 mb-3">
        <div className="row thread-item p-3">
          <div className="col-4">
            <div className="thread__square-container">
              <img
                className="thread__square-image"
                src={
                  allData.threadImages && allData.threadImages.length > 0
                    ? `${baseUrl}/images/${allData.threadImages[0]}`
                    : noImage
                }
                alt={allData.description}
                onClick={
                  allData.threadImages && allData.threadImages.length > 0
                    ? openModal
                    : () => {}
                }
              />
            </div>
          </div>
          <div className="col-8 cursor">
            <h4 onClick={handleOpenDetail}>{allData.description}</h4>
            {/* <div className="mb-4 cursor" onClick={handleOpenModal}> */}
            <div className="mb-3 cursor">
              <p className="small sans-serif" onClick={handleOpenDetail}>
                {formatDate(allData.publishDate!, "fullDate")} a las{" "}
                {formatDate(allData.publishDate!, "time")}
              </p>
              <OwnerIndicator ownerId={allData.owner} user={user} />
              <div>
                {allData &&
                  allData.threadTemathic &&
                  allData.threadTemathic.map((theme, index) => (
                    <Badge key={index}>{theme}</Badge>
                  ))}
              </div>
            </div>
            {allData.content && (
              <>
                <div className="small">
                  {showContent
                    ? allData.content
                    : `${allData.content.slice(0, 110)}...`}
                </div>
                <button className="btn-view-more" onClick={toggleContent}>
                  {showContent ? "Ver menos" : "Ver más"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreadItem;
