import './Button.css'

function Button({ onPress }) {
  return (
    <div onClick={onPress} className="detail-button">
      <p>Detayları gör</p>
    </div>
  );
}

export default Button;
