import './Input.css';
import { CiSearch } from "react-icons/ci";

function Input() {
  return (
    <>
      <div className='search-input-div' >
          <CiSearch style={{fontSize: 18}} />
          <input className="search-input" placeholder={  "Search"} name="myInput" />
      </div>
    </>
  );
}

export default Input;
