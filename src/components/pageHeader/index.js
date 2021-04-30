import "./index.scss";
export default function pageHeader(props) {
  return (
    <div className="header">
      <div className="header__section">{props.left}</div>
      <div className="header__section">{props.right}</div>
    </div>
  );
}
