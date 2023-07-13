import "./App.css";
import Video from "../jsx/video";
import NavBar from "../jsx/navbar";

function App() {
  function Navitem(props) {
    return (
      <li className="link">
        <a className="item" href={props.link} className="Nav-Item">
          {props.item}
        </a>
      </li>
    );
  }

  return (
    <div className="main">
      <NavBar>
        <Navitem link="./" item="habitats" />
        <Navitem link="./" item="Events" />
        <Navitem link="./" item="Contact Us" />
        <Navitem link="./" item="About" />
      </NavBar>
      <div className="page-container">
        <div className="top">
          <Video />
        </div>
        <div className="middle">
          <p></p>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
}

export default App;
