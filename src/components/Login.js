import { React, useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
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
    if (!email || !password) {
      return;
    }
    onLogin({ email, password });
  }
  return (
    <div className="signform">
      <p className="signform__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="signform__form">
        <input
          required
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="signform__text"
        />
        <input
          required
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
          Войти
        </button>
      </form>

      <div className="signform__message">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="signform__login-link">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}

export default Login;
