import { useState } from "react";
import Modal from "../../common/Modal/Modal";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import Spinner from "../../common/loader/Spinner";
import "./shareModal.css";

const ShareModal = ({ link, isLoading }) => {
  const modal = useSelector((state) => state.modal.value);
  const [copy, setCopy] = useState(false);
  const pageUrl = window.location.href;
  const whatsappApi = `https://api.whatsapp.com/send?text=${link}`;
  const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${link}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(whatsappApi, "_blank");
  };

  const handleTelegramClick = () => {
    window.open(telegramApi, "_blank");
  };

  return (
    <Modal
      headerTitle={"Share Record"}
      width="400px"
      center={true}
      show={modal === 2}
    >
      {!isLoading && (
        <>
          <div className="social">
            <div className="whats_app social-info">
              <span>
                <IoLogoWhatsapp onClick={handleWhatsAppClick} />
              </span>
            </div>

            <div className="telegram social-info">
              <span>
                <FaTelegramPlane onClick={handleTelegramClick} />
              </span>
            </div>
          </div>

          <div className="share-link">
            <span>or copy link</span>

            <div className="link">
              <span></span>
              <span className="link-example">{link}</span>
              <span className="copy" title="copy Link" onClick={handleCopy}>
                <MdContentCopy />
              </span>
              {copy && <span className="copied">Link Copied</span>}
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div style={{ padding: "10px" }}>
          <Spinner width="30px" />
        </div>
      )}
    </Modal>
  );
};

export default ShareModal;
