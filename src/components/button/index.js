import "./index.scss";
export default function Button(props) {
  return (
    <button
      {...props}
      className={`button ${props.var ? `button--${props.var}` : ""} ${
        props.className
      }`}
    >
      {props.children}
    </button>
  );
}
