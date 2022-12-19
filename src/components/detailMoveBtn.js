import "./detailMoveBtn.css";
import { useNavigate } from "react-router-dom";

const DetailMoveBtn = ({
  text,
  blockNumber,
  type,
  url,
  firstPage,
  lastPage,
}) => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    if (type === "next" && lastPage > blockNumber) {
      navigate(`${url}${Number(blockNumber) + 1}`);
    }
    if (type === "prev" && firstPage < blockNumber) {
      navigate(`${url}${Number(blockNumber) - 1}`);
    }
  };

  return (
    <button className="detailBtnContainer" onClick={onClickBtn}>
      {text}
    </button>
  );
};

export default DetailMoveBtn;
