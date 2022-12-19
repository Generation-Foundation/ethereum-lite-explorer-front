/* eslint-disable */
import "./MainPage.css";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dbLatestBlocks } from "../redux/action/dbLatestBlocks";
import { dbLatestTxs } from "../redux/action/dbLatestTxs";
import { dbTotalTxsNum } from "../redux/action/dbTotalTxsNum";
import { getTokenData } from "../redux/action/getTokenData";
import { Chart } from "../components/_index";
import { dbAddressArr } from "../redux/action/dbAddressArr";
import { dbChartWeeklyTxsByDate } from "../redux/action/dbChartWeeklyByDate";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chartWeeklyTxsByDate } = useSelector((state) => state.chartData);
  const {
    tokenData,
    totalTxsNum,
    allAddressArr,
    latestBlocks,
    latestBlocksTimeago,
    latestTxs,
    latestTxsTimeago,
  } = useSelector((state) => state.mainpageData);

  const getCardSectionFunc = () => {
    dispatch(getTokenData.getTokenDataApi());
    dispatch(dbTotalTxsNum.dbTotalTxsNumApi());
    dispatch(dbAddressArr.dbAddressArrApi());
    dispatch(dbLatestBlocks.dbLatestBlocksApi());
    dispatch(dbLatestTxs.dbLatestTxsApi());
    dispatch(dbChartWeeklyTxsByDate.dbChartWeeklyTxsByDateApi());
  };

  // 페이지이동
  const goToBlock = (blockNumber, e) => {
    // 키보드에서 ctrl, command 키를 눌렀는 지 판단
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + blockNumber);
    } else {
      navigate("/block/" + blockNumber);
    }
  };

  const goToBlockHash = (blockHash, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + blockHash);
    } else {
      navigate("/block/" + blockHash);
    }
  };

  const goToTxs = (blockNumber, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/txs/" + blockNumber);
    } else {
      navigate("/txs/" + blockNumber);
    }
  };

  const goToTxHash = (blockHash, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/tx/" + blockHash);
    } else {
      navigate("/tx/" + blockHash);
    }
  };

  const goToAddress = (address, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/address/" + address);
    } else {
      navigate("/address/" + address);
    }
  };

  const goToAllBlocks = (e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/blocks");
    } else {
      navigate("/blocks");
    }
  };

  const goToAllTxs = (e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/txs");
    } else {
      navigate("/txs");
    }
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    getCardSectionFunc();
    console.log("check");
  }, 5000);

  useEffect(() => {
    getCardSectionFunc();
  }, []);

  return (
    <div className="mainPage">
      <div className="blockInfoContainer">
        <div className="blockInfoBox">
          <div className="blockInfoSection1">
            <div className="block-col1">
              <div className="block-col1-row1">
                <h1>GEN Price</h1>
                {tokenData != null ? <h3>$ {tokenData.last}</h3> : null}
              </div>
              <div className="block-col1-row2">
                <h1>All Address</h1>
                {allAddressArr != null ? (
                  <h3>{allAddressArr.length} accounts</h3>
                ) : null}
              </div>
            </div>
            <div className="block-col2">
              <div className="block-col2-row1">
                <h1>Transactions</h1>
                {totalTxsNum != null ? <h3>{totalTxsNum}</h3> : null}
              </div>
              <div className="block-col2-row2">
                <h1>Latest Block</h1>
                {latestBlocks != null ? (
                  <h3>#{latestBlocks[0].blocknumber}</h3>
                ) : null}
              </div>
            </div>
          </div>

          <div className="blockInfoSection2">
            <div className="block-col3-line">
              <p></p>
            </div>
            <div className="block-col3">
              <div className="block-col3-row1">
                <h1>Gen Transactions History</h1>
              </div>
              <div className="block-col3-row2">
                {chartWeeklyTxsByDate != null ? (
                  <Chart chartDate={chartWeeklyTxsByDate} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LatestDataSection====== */}
      <div className="latestDataContainer">
        <div className="card-section1">
          <div className="card-header">
            <h1>Latest Block</h1>
          </div>
          {latestBlocks != null ? (
            <>
              {latestBlocks.map((datas, index) => {
                return (
                  <div className="card-contents" key={index}>
                    <div className="card-contents-item">
                      <p className="card-contents-item-col1-left">Bk</p>
                      <div className="card-contents-item-col2">
                        <div className="card-contents-item-col2-row1">
                          <span
                            onClick={(e) => goToBlock(datas.blocknumber, e)}
                          >
                            {datas.blocknumber}
                          </span>
                        </div>
                        <div className="card-contents-item-col2-row2">
                          {/* {(datas.time_stamp).substr(5,)} */}
                          {latestBlocksTimeago[index]}
                        </div>
                      </div>
                      <div className="card-contents-item-col3">
                        <div className="card-contents-item-col3-row1">
                          Hash :{" "}
                          <span
                            onClick={(e) => goToBlockHash(datas.blockhash, e)}
                          >
                            {datas.blockhash.substr(0, 35)}
                          </span>
                          ...
                        </div>
                        <div className="card-contents-item-col3-row2">
                          <span onClick={(e) => goToTxs(datas.blocknumber, e)}>
                            {datas.transaction_length} Txn
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
          <div className="card-footer">
            <button
              className="card-footer-btn"
              onClick={(e) => goToAllBlocks(e)}
            >
              VIEW ALL BLOCKS
            </button>
          </div>
        </div>

        <div className="card-section2">
          <div className="card-header">
            <h1>Latest Transaction</h1>
          </div>
          {latestTxs != null ? (
            <>
              {latestTxs.map((datas, index) => {
                return (
                  <div className="card-contents" key={index}>
                    <div className="card-contents-item">
                      <p className="card-contents-item-col1-right">Tx</p>
                      <div className="card-contents-item-col2">
                        <div className="card-contents-item-col2-row1">
                          <span onClick={(e) => goToTxHash(datas.txHash, e)}>
                            {datas.txHash.substr(0, 14)}
                          </span>
                          ...
                        </div>
                        <div className="card-contents-item-col2-row2">
                          {latestTxsTimeago[index]}
                        </div>
                      </div>
                      <div className="card-contents-item-col2-sapcebetween">
                        <div className="card-contents-item-col3">
                          <div className="card-contents-item-col3-row1">
                            From :{" "}
                            <span
                              onClick={(e) => goToAddress(datas.fromAddress, e)}
                            >
                              {datas.fromAddress.substr(0, 20)}
                            </span>
                            ...
                          </div>
                          <div className="card-contents-item-col3-row2">
                            To :{" "}
                            <span
                              onClick={(e) => goToAddress(datas.toAddress, e)}
                            >
                              {datas.toAddress.substr(0, 20)}
                            </span>
                            ...
                          </div>
                        </div>
                        <div className="card-contents-item-col3-confirmation">
                          <div className="triangle-main"> </div>
                          {(parseInt(datas.value, 16) / 10 ** 18).toFixed(4) ==
                          0 ? (
                            <p>0 GEN</p>
                          ) : (
                            <p>
                              {(parseInt(datas.value, 16) / 10 ** 18).toFixed(
                                4
                              )}{" "}
                              GEN
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
          <div className="card-footer">
            <button className="card-footer-btn" onClick={(e) => goToAllTxs(e)}>
              VIEW ALL TRANSACTIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
