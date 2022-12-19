import "./select.css";
import { useNavigate, useLocation } from "react-router-dom";

const Select = ({ number, setNumber, setPage }) => {
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const array = [10, 25, 50, 100];

  // const number = Number(query.get("number"));
  // 선택이 된 옵션 값을 가져오기
  const onChangeValue = (e) => {
    setNumber(Number(e.target.value));
    setPage(1);
    navigate(`${url}?page=${1}&number=${e.target.value}`);
  };

  return (
    <div className="selectContainer">
      <div className="text">Show</div>
      <select
        value={number !== 0 ? number : 50}
        onChange={onChangeValue}
        className="select"
      >
        {array.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <div className="text">Records</div>
    </div>
  );
};

export default Select;
