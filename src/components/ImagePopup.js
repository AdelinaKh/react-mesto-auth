function ImagePopup({name, card, onClose}) {
  return (
    <div className={`popup popup_${name} ${card && "popup_opened"}`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className={`popup__container-${name}`}>
        <img className="popup__image" src={card && card.link} alt={card && card.name} />
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <p className="popup__description">{card && card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;