/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { dbAllBlocks } from "../redux/action/dbAllBlocks";
import { getBalance } from "../redux/action/getNumberOfBlock";
import Pagination from "../components/pagination";
import Select from "../components/select";

const AllBlocksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().search;
  const { allBlocks, allBlocksTimeago } = useSelector(
    (state) => state.totalData
  );
  const { numberOfBlock } = useSelector((state) => state.addressData);

  // 쿼리문에 page 가져오고 상태값에 초기 값으로 설정
  const [query] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  // 한 페이지에 몇 개의 데이터를 보여줄 지의 대한 상태값
  const [number, setNumber] = useState(Number(query.get("number")) || 50);

  // 전체 page 수를 구하기 위한 로직
  const tatalPage = Math.ceil(numberOfBlock / number);

  const goBlock = (number, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + number);
    } else {
      navigate("/block/" + number);
    }
  };

  useEffect(() => {
    if (!location) {
      dispatch(dbAllBlocks.dbAllBlocksApi(1, 50));
      dispatch(getBalance.getNumberOfBlock());
      setPage(1);
      setNumber(50);
    } else {
      dispatch(dbAllBlocks.dbAllBlocksApi(page, number));
      dispatch(getBalance.getNumberOfBlock());
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="addressDataContainer">
      <div className="addressTitle">
        <h1>All Blocks</h1>
        {/* props로 page 상태값과 setState함수 넘겨주기 */}
        <Pagination
          page={page}
          number={number}
          setPage={setPage}
          tatalPage={tatalPage}
        />
      </div>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th className="th-left-top" width={250}>
                Block
              </th>
              <th width={150}>Age</th>
              <th width={250}>Txn</th>
              <th width={250}>Hash</th>
              <th className="th-right-top" width={200}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {allBlocks != null
              ? allBlocks.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="td-center">
                        <span onClick={(e) => goBlock(data.blocknumber, e)}>
                          {data.blocknumber}
                        </span>
                      </td>
                      <td className="td-center">{allBlocksTimeago[index]}</td>
                      <td className="td-center">{data.transaction_length}</td>
                      <td className="td-left">{data.blockhash}</td>
                      <td className="td-right">0 GEN</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <div className="bottomPg">
        <Select number={number} setNumber={setNumber} setPage={setPage} />
        <Pagination
          page={page}
          number={number}
          setPage={setPage}
          tatalPage={tatalPage}
        />
      </div>
    </div>
  );
};

export default AllBlocksPage;
