function PopupWithForm({children, name, title, onClose, isOpen, buttonText, onSubmit}) {
  return (
      <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <form
            name={`${name}_form`}
            className={`popup__form popup__content-${name}`}
            noValidate
            onSubmit={onSubmit}
          >
            <h2 className="popup__title">{title}</h2>
            <button type="button" className="popup__close-button" onClick={onClose}></button>
            {children}
            <button type="submit" className="popup__save-button">
            {buttonText}
            </button>
          </form>
        </div>
      </div>
  );
}
export default PopupWithForm;