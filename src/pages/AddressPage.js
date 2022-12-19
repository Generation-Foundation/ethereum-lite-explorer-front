/* eslint-disable */
import "./AddressPage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { dbAddressTxs } from "../redux/action/dbAddressTxs";
import { getBalance } from "../redux/action/getBalance";
import { BiArrowFromLeft } from "react-icons/bi";
import { HiOutlineClipboard } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { dbAddressCheck } from "../redux/action/dbAddressCheck";
import { dbAddressTxsNum } from "../redux/action/dbAdressTxsNum";
import Pagination from "../components/pagination";

const AddressPage = () => {
  const { params } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    accountBalance,
    addressTxs,
    addressTxsTimeago,
    addressCheck,
    addressTsxNum,
  } = useSelector((state) => state.addressData);
  const [copyCheckAddress, setCopyCheckAddress] = useState(false);

  // 페이지네이션
  const [query] = useSearchParams();
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  const totalPage = Math.ceil(addressTsxNum / 25);

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

  const addressCopy = (data) => {
    navigator.clipboard.writeText(data);
    setCopyCheckAddress(true);
    setTimeout(() => {
      setCopyCheckAddress(false);
    }, 1000);
  };

  useEffect(() => {
    // url로 검색시 예외 처리 추가 반영
    if (Number(query.get("page")) === 0) {
      setPage(1);
    }
    if (params.length != 42) {
      navigate("/" + params);
    } else {
      dispatch(getBalance.getBalanceApi(params));
      dispatch(dbAddressTxs.dbAddressTxsApi(params, page));
      dispatch(dbAddressCheck.dbAddressCheckApi(params));
      dispatch(dbAddressTxsNum.dbAddressTxsNumApi(params));
    }
  }, [params, page]);

  return (
    <>
      <div className="addressTitleContainer">
        <div className="addressTitle">
          <h1>Overview</h1>
        </div>
        <div className="addressDataSection">
          <div className="addressDataInfo1">
            <div className="addressData-row">
              <div className="addressData-col1">
                <div className="addressData-col1-title">
                  {addressCheck ? "Contract" : "Address"}
                </div>
              </div>
              <div className="addressData-col2">
                <div className="flexbox">
                  <p>{params}</p>
                  {""}
                  {copyCheckAddress ? (
                    <div className="copyButton">
                      <AiFillCheckCircle size={20} />
                    </div>
                  ) : (
                    <div
                      className="copyButton"
                      onClick={() => addressCopy(params)}
                    >
                      <HiOutlineClipboard size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="addressData-row">
              <div className="addressData-col1">
                <div className="addressData-col1-title">Balance</div>
              </div>
              <div className="addressData-col2">{accountBalance} GEN</div>
            </div>
          </div>
          {/* <div className="addressDataInfo2">
                        <div className="addressData-row">
                            <div className="addressData-col1">
                                <div className="addressData-col1-title">
                                    ???
                                </div>
                            </div>
                            <div className="addressData-col2">
                                여긴 뭐 넣을까
                            </div>
                        </div>
                        <div className="addressData-row">
                            <div className="addressData-col1">
                                <div className="addressData-col1-title">
                                    ???
                                </div>
                            </div>
                            <div className="addressData-col2">test</div>
                        </div>
                    </div> */}
        </div>
      </div>
      {/* === Table Data === */}
      <div className="addressDataContainer">
        <div className="addressTitle">
          <h1>Transaction History</h1>
          <Pagination
            page={page}
            // number={number}
            setPage={setPage}
            tatalPage={totalPage}
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
                <th width={200}>Age</th>
                <th width={250}>From</th>
                <th width={30}></th>
                <th width={250}>To</th>
                <th className="th-right-top" width={200}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {addressTxs != null
                ? addressTxs.map((data, index) => {
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
                        <td className="td-center">
                          {addressTxsTimeago[index]}
                        </td>
                        <td className="td-center">
                          <span
                            onClick={(e) => goFromAddress(data.fromAddress, e)}
                          >
                            {data.fromAddress.substr(0, 20)}...
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
                          {parseInt(data.value, 16) / 10 ** 18}
                          &nbsp;GEN
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
