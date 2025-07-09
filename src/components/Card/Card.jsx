import "./Card.css";
import plcImg from "../../assets/placeholder/asset-img.jpg";
import Button from "../Button/Button";

function Card({ navFunc }) {
  return (
    <>
      <div className="outline-card">
        <img style={{ maxWidth: 200, maxHeight: 230}} src={plcImg}></img>
        <div style={{margin: 10}} >
          <h3>Film adı</h3>
          <Button onPress={navFunc} />
        </div>
      </div>
    </>
  );
}

export default Card;
