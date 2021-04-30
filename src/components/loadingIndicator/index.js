import Logo from "../../assets/img/Fishery.png";
import "./index.scss";
export default function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div class="loading-indicator--spinner">
        <figure>
          <img src={Logo} alt="Icon Loading" />
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </figure>
      </div>
    </div>
  );
}
