import './Button.css'

function Button({ onPress, buttonClassName }) {
  return (
    <div onClick={onPress} className={buttonClassName}>
      <p>Detayları gör</p>
    </div>
  );
}

export default Button;
