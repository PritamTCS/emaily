import React from "react";

export default ({ label, input, meta }) => {
  // console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {meta.touched ? meta.error : null}
      </div>
    </div>
  );
};
