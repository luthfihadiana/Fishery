// import React from 'react'
import Select from "react-select";
import "./index.scss";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: `2px solid #dfdede`,
    transition: "all 0.2s ease",
    boxShadow:
      "0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
    "&:focus": {
      outline: "none"
    }
  })
};

export default function Input(props) {
  if (props.type === "dropdown")
    return (
      <Select
        className={props.className}
        styles={customStyles}
        options={props.options}
        placeholder={props.placeholder || "Pilih ....."}
        theme={theme => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: "#5ce0b6",
            primary: "#4bc6a0"
          }
        })}
      />
    );
  return <input {...props} className={`input ${props.className}`} />;
}
