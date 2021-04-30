import "./index.scss";
export default function Button(props) {
  let attribute = { ...props };
  delete attribute["outline"];
  return (
    <button
      {...attribute}
      className={`button ${props.var ? `button--${props.var}` : ""} ${
        (props.outline && `button--outline`) || ""
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
}
