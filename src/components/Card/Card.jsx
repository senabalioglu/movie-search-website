import "./Card.css";
import plcImg from "../../assets/placeholder/asset-img.jpg";
import Button from "../Button/Button";

function Card({ navFunc, title, movieDate,cardImg, itemId }) {

  return (
    <>
      <div className="outline-card">
        <img 
        className="card-image"
        src={`https://image.tmdb.org/t/p/w200${cardImg}`}>
        </img>
        <div style={{margin: 10, marginBottom: 20}} >
            <h3>{ title.length < 25 ? title : title.slice(0, 20) + "..."}</h3>
          <p>{ movieDate != "" ?  (movieDate) : "null" }</p>
          <Button onPress={navFunc} />
        </div>
      </div>
    </>
  );
}

export default Card;
