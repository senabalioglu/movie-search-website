import "./Card.css";
import plcImg from "../../assets/placeholder/asset-img.jpg";
import Button from "../Button/Button";

function Card({ navFunc, title, movieDate,cardImg, className }) {

  return (
    <>
      <div style={{margin: 15}} >
        <img 
        src={`https://image.tmdb.org/t/p/w300${cardImg}`}>
        </img>
        <div>
            <h3>{ title.length < 25 ? title : title.slice(0, 20) + "..."}</h3>
          <p>{ movieDate != "" ?  (movieDate) : "null" }</p>
          <Button buttonClassName={className} onPress={navFunc} />
        </div>
      </div>
    </>
  );
}

export default Card;
