import "./pagination.css";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ page, number, setPage, tatalPage }) => {
  // 페이지 이동을 위해서
  const navigate = useNavigate();
  const url = useLocation().pathname;

  // 페이지 이동 버튼을 클릭 후 상태값을 변경해주고 url를 이동시킨다.
  const onClickPressBtn = (e) => {
    if (e.target.id === "before" && page > 1) {
      setPage((prev) => prev - 1);
      navigate(`${url}?page=${page - 1}${number ? "&number=" + number : ""}`);
    }
    if (e.target.id === "after" && page < tatalPage) {
      setPage((prev) => prev + 1);
      navigate(`${url}?page=${page + 1}${number ? "&number=" + number : ""}`);
    }
    if (e.target.id === "first") {
      setPage(1);
      navigate(`${url}?page=1&${number ? "&number=" + number : ""}`);
    }
    if (e.target.id === "last") {
      setPage(tatalPage);
      navigate(`${url}?page=${tatalPage}${number ? "&number=" + number : ""}`);
    }
  };

  return (
    <div className="pgContainer">
      <div className="pgItem" id="first" onClick={onClickPressBtn}>
        First
      </div>
      <div className="pgItem" id="before" onClick={onClickPressBtn}>
        {"<"}
      </div>
      <div className="pgItem">
        page {page} of {tatalPage}
      </div>
      <div className="pgItem" id="after" onClick={onClickPressBtn}>
        {">"}
      </div>
      <div className="pgItem" id="last" onClick={onClickPressBtn}>
        Last
      </div>
    </div>
  );
};

export default Pagination;
