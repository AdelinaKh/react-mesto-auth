import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import profileIcon from "../images/profileIcon.svg";
import Card from "./Card";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div>
      <section className="profile section page__content">
        <div className="profile__description">
          <div className="profile__overlay">
          {currentUser.avatar && (<img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="аватар"
              onClick={onEditAvatar}
            />)}
            <img
              src={profileIcon}
              className="profile__icon"
              alt="иконка для изменения аватара"
            />
          </div>
          <div className="profile__block">
            <div className="profile__element">
              <h1 className="profile__input profile__name block">
                {currentUser.name}
              </h1>
              <p className="profile__input profile__job block">
                {currentUser.about}
              </p>
            </div>
            <button
              type="button"
              className="profile__open-button"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements section page__content">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            link={card.link}
            name={card.name}
            like={card.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </div>
  );
}
export default Main;
