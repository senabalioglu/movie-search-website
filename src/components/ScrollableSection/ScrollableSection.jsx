
function ScrollableSection({onClickFunc, compKey, posterPath, formattedTitle, date}){
    return(
        <>
        <div
            className="top-rated-card"
            key={compKey}
            onClick={onClickFunc}
          >
            <div>
              <img src={`https://image.tmdb.org/t/p/w300${posterPath}`} />
              <div>
                <h3 style={{ color: "aliceblue" }}>
                  {formattedTitle}
                </h3>
                <p style={{ color: "aliceblue" }}>
                  {date}
                </p>
              </div>
            </div>
          </div>
        </>
    )
}

export default ScrollableSection