import "./index.scss";
export default function Button(props) {
  return (
    <button
      className={`button ${props.var ? `button--${props.var}` : ""}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
