import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({userEmail, title, route, onClick}) {

  return (
    <div className="header section">
      <img className="header__logo" src={logo} alt="логотип" />
      <nav className="header__nav">
        <p className="header__text">{userEmail}</p>
        <Link
          to={route}
          type="button"
          className="header__button"
          onClick={onClick}
        >
          {title}
        </Link>
      </nav>
    </div>
  );
}
export default Header;
