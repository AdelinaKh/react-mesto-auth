import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
  }
  return (
    <div className="signform">
      <p className="signform__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="signform__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="signform__text"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          className="signform__text"
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="signform__button"
        >
          Зарегистрироваться
        </button>
      </form>

      <div className="signform__message">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="signform__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
