import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar_link: avatarRef.current.value
    });
  } 

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        ref={avatarRef}
        id="avatar-link"
        name="avatar-link"
        className="popup__text popup__text_input_link"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__input-error" id="avatar-link-error">
        Введите ссылку на аватар
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
