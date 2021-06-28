const MotoInput = ({ label, field, placeholder, onChange, type, ...rest }) => {
  return (
    <div {...rest}>
      <label className="font18 text-start">{label}</label>
      <input
        placeholder={placeholder ? placeholder : ""}
        className="font22"
        type={type ? type : "text"}
        onInput={(e) => {
          if (onChange) onChange(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default MotoInput;
