import './Input.css';
import { CiSearch } from "react-icons/ci";

function Input({onChangeInput, onSearch}) {
  return (
    <>
      <div className='search-input-div' >
          <CiSearch style={{fontSize: 18}} />
          <input onChange={onChangeInput} className="search-input" placeholder={  "Search"} name="myInput" />
          <button onClick={onSearch} >Search</button>
      </div>
    </>
  );
}

export default Input;
