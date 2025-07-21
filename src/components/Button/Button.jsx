import './Button.css'

function Button({ onPress, buttonClassName }) {
  return (
    <div onClick={onPress} className={buttonClassName}>
      <p style={{color: 'black'}} >Detayları gör</p>
    </div>
  );
}

export default Button;
