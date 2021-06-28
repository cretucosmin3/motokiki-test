const MotoSelect = ({ label, options, onSelected, type, ...rest }) => {
  return (
    <div {...rest}>
      {label ? <label className="font18 text-start">{label}</label> : null}
      <select
        className="font18"
        onChange={(e) => {
          onSelected(e.target.value);
        }}
      >
        {options
          ? options.map((op, i) => {
              return (
                <option key={i} value={op.value}>
                  {op.label}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};

export default MotoSelect;
