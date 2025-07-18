import './Input.css';
import { CiSearch } from "react-icons/ci";

function Input({onChangeInput, onSearch, className}) {
  return (
    <>
      <div className={className}>
          <CiSearch style={{fontSize: 18}} />
          <input onChange={onChangeInput} className="search-input" placeholder={  "Search"} name="myInput" />
          <button onClick={onSearch} >Search</button>
      </div>
    </>
  );
}

export default Input;
