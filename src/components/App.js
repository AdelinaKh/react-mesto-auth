import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";
import fail from "../images/fail.svg"
import success from "../images/success.svg"


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [popupImage, setPopupImage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false)
  }

  //Escape
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard ||
      infoTooltip
    ) {
      function handleEscapeKey(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
    infoTooltip,
  ]);

  // получение начальных данных
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  //ставим/удаляем лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .postLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }
  //удаляем карточку
  function handleDeleteClick(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  //обновляем данные пользователя
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  //обновляем аватар
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  //добавляем карточку
  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const navigate = useNavigate();
  //Функция, позволяющие разлогиниться
  function signOut() {
    setUserEmail(null)
    setLoggedIn(false)
    navigate('/sign-in')
    localStorage.removeItem('jwt')
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
    //проверяем токен пользователя
      auth.checkToken(jwt)
      .then((res) => {
        if(res) {
          setUserEmail(res.data.email)
          setLoggedIn(true)
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }
  //проверит токен при загрузке страницы 
  useEffect(() => {
    handleTokenCheck()
  }, [])
  //если залогинен переходим на главную страницу
  useEffect(() => {
    if(loggedIn === true){
      navigate('/')
    }
  }, [loggedIn, navigate])

  //Авторизация пользователя sign-in
  function handleLogin( email, password ) {
    auth.login( email, password )
      .then((res) => {
          localStorage.setItem('jwt', res.token)
          handleTokenCheck()
          navigate('/')
      })
      .catch(() => {
        setPopupImage(fail)
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.")
        handleInfoTooltip()
      });
  }
  //Регистрация пользователя sign-up
  function handleRegister( email, password ) {
    auth.register( email, password )
      .then(() => {
          setPopupImage(success)
          setPopupTitle("Вы успешно зарегистрировались!")
          navigate('/sign-in')
      })
      .catch(() => {
        setPopupImage(fail)
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.")
      })
      .finally(handleInfoTooltip)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            {/* Регистрация */}
            <Route path="/sign-up" element={ 
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={handleRegister} />
              </>
            }
            />
            {/* Авторизация */}
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={handleLogin} />
              </>
            }
            />
            {/* Главная страница */}
            <Route exact path="/" element={
              <>
                <Header title="Выйти" userEmail={userEmail} onClick={signOut} route=''/>
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
                <Footer/>
              </>
            }
            />
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"}/>} />
          </Routes>
          <ImagePopup
            name="resize"
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={infoTooltip}
            image={popupImage}
            title={popupTitle}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
