const Pagination = ({
  current,
  origin,
  maxView,
  maxPage,
  previous,
  next,
  change,
}) => {
  var navButtons = [];

  for (let i = origin; i < origin + maxView; i++) {
    if (i > maxPage) break;

    navButtons.push(() => {
      return (
        <div
          className={`btn ${i === current ? "dark" : ""} minline5`}
          onClick={() => change(i)}
        >
          {i}
        </div>
      );
    });
  }
  return (
    <div className="justify-between w100 justify-center">
      <div className="flex row">
        {current > 1 ? (
          <div className="btn bright mr5" onClick={previous}>
            {"<"}
          </div>
        ) : null}

        {navButtons.map((Btn, i) => {
          return <Btn key={i} />;
        })}
        {current < maxPage && maxPage > maxView ? (
          <div className="btn bright ml5" onClick={next}>
            {">"}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
