import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      title: name,
      subtitle: description,
    });
  } 
  
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        id="name"
        name="title"
        className="popup__text popup__text_input_name"
        type="text"
        value={name || ""}
        onChange={handleChangeName}
        placeholder="Имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error" id="name-error">
        Вы пропустили это поле.
      </span>
      <input
        id="job"
        name="subtitle"
        className="popup__text popup__text_input_job"
        type="text"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="О себе"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error" id="job-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
