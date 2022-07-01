function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <div className={`popup popup_info ${isOpen && "popup_opened"}`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__container">
        <img
          className="popup__picture"
          src={image}
          alt=""
        />
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <p className="popup__title">{title}</p>
      </div>
    </div>
  );
}
export default InfoTooltip;
