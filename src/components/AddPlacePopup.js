import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setTitle(currentUser.title);
    setLink(currentUser.link);
  }, [currentUser]);

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      title: title,
      subtitle: link,
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="cards"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        id="title"
        name="title"
        className="popup__text popup__text_input_name"
        type="text"
        value={title || ""}
        onChange={handleChangeTitle}
        placeholder="Название"
        autoComplete="off"
        minLength="1"
        maxLength="30"
        required
      />
      <span className="popup__input-error" id="title-error">
        Вы пропустили это поле.
      </span>
      <input
        id="link"
        name="subtitle"
        className="popup__text popup__text_input_link"
        type="url"
        value={link || ""}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__input-error" id="link-error">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
