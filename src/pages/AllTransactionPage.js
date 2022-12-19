/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { dbAllTxs } from "../redux/action/dbAllTxs";
import { dbTotalTxsNum } from "../redux/action/dbTotalTxsNum";
import Pagination from "../components/pagination";
import Select from "../components/select";

const AllTransactionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().search;
  const { allTxs, allTxsTimeago } = useSelector((state) => state.totalData);
  const { totalTxsNum } = useSelector((state) => state.mainpageData);

  // 쿼리문에 page 가져오고 상태값에 초기 값으로 설정
  const [query] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  // 한 페이지에 몇 개의 데이터를 보여줄 지의 대한 상태값
  const [number, setNumber] = useState(Number(query.get("number")) || 50);

  // 전체 page 수를 구하기 위한 로직
  const tatalPage = Math.ceil(totalTxsNum / number);

  const goBlock = (number, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + number);
    } else {
      navigate("/block/" + number);
    }
  };

  const goFromAddress = (address, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/address/" + address);
    } else {
      navigate("/address/" + address);
    }
  };

  const goToAddress = (address, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/address/" + address);
    } else {
      navigate("/address/" + address);
    }
  };

  const goTransaction = (txHash, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/tx/" + txHash);
    } else {
      navigate("/tx/" + txHash);
    }
  };

  useEffect(() => {
    if (!location) {
      dispatch(dbAllTxs.dbAllTxsApi(1, 50));
      dispatch(dbTotalTxsNum.dbTotalTxsNumApi());
      setPage(1);
      setNumber(50);
    } else {
      dispatch(dbAllTxs.dbAllTxsApi(page, number));
      dispatch(dbTotalTxsNum.dbTotalTxsNumApi());
    }
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="addressDataContainer">
      <div className="addressTitle">
        <h1>All Transactions</h1>
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
                Txn Hash
              </th>
              <th width={100}>Block</th>
              <th width={150}>Age</th>
              <th width={250}>From</th>
              <th width={30}></th>
              <th width={250}>To</th>
              <th className="th-right-top" width={200}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {allTxs != null
              ? allTxs.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="td-left-padding">
                        <span onClick={(e) => goTransaction(data.txHash, e)}>
                          {data.txHash.substr(0, 20)}...
                        </span>
                      </td>
                      <td className="td-center">
                        <span onClick={(e) => goBlock(data.blockNumber, e)}>
                          {data.blockNumber}
                        </span>
                      </td>
                      <td className="td-center">{allTxsTimeago[index]}</td>
                      <td className="td-center">
                        <span
                          onClick={(e) => goFromAddress(data.fromAddress, e)}
                        >
                          {data.fromAddress.substr(0, 20)}
                          ...
                        </span>
                      </td>
                      <td className="td-center">
                        <BiArrowFromLeft />
                      </td>
                      <td className="td-center">
                        <span onClick={(e) => goToAddress(data.toAddress, e)}>
                          {data.toAddress.substr(0, 20)}...
                        </span>
                      </td>
                      <td className="td-right">
                        {parseInt(data.value, 16) / 10 ** 18} GEN
                      </td>
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

export default AllTransactionPage;
