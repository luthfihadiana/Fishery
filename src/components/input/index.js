// import React from 'react'
import "./index.scss";
export default function Input(props) {
  return <input {...props} className={`input ${props.className}`} />;
}
