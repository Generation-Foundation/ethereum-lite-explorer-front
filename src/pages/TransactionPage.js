/* eslint-disable */
// import './TransactionsPage.css'
// css는 blockpage.css에서 한것과 동일함
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTransaction } from "../redux/action/getTransaction";
import { HiOutlineClipboard } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiTimer2Line } from "react-icons/ri";
import { NullTxsData } from "../components/_index";
import { dbLatestBlocks } from "../redux/action/dbLatestBlocks";
import { ethers } from "ethers";
import DetailMoveBtn from "../components/detailMoveBtn";

const TransactionPage = () => {
  const { params } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textarea = useRef();
  const [copyCheckHash, setCopyCheckHash] = useState(false);
  const [copyCheckFrom, setCopyCheckFrom] = useState(false);
  const [copyCheckTo, setCopyCheckTo] = useState(false);
  const [decode, setDecode] = useState(false);
  const {
    txInfo,
    txReceiptInfo,
    txDbInfo,
    txDecodeInputData,
    airdropLogTopic,
    txTimeago,
  } = useSelector((state) => state.transactionData);
  const { addressCheck } = useSelector((state) => state.addressData);
  const { latestBlocks } = useSelector((state) => state.mainpageData);

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
    5;
  };

  const goToBlock = (blockNumber, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + blockNumber);
    } else {
      navigate("/block/" + blockNumber);
    }
  };

  const hashCopy = (data) => {
    navigator.clipboard.writeText(data);
    setCopyCheckHash(true);
    setTimeout(() => {
      setCopyCheckHash(false);
    }, 1000);
  };
  const fromCopy = (data) => {
    navigator.clipboard.writeText(data);
    setCopyCheckFrom(true);
    setTimeout(() => {
      setCopyCheckFrom(false);
    }, 1000);
  };
  const toCopy = (data) => {
    navigator.clipboard.writeText(data);
    setCopyCheckTo(true);
    setTimeout(() => {
      setCopyCheckTo(false);
    }, 1000);
  };

  const handleResizeHeight = () => {
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const decoding = () => {
    if (decode) {
      setDecode(false);
    } else {
      setDecode(true);
    }
  };

  useEffect(() => {
    // url로 검색시 예외 처리 추가 반영
    if (params.length != 66) {
      navigate("/" + params);
    } else {
      dispatch(getTransaction.getTransactionApi(params));
      dispatch(dbLatestBlocks.dbLatestBlocksApi());
    }
  }, [params]);

  return (
    <>
      <div className="blockDataContainer">
        <div className="blockDataTitle">
          <h1>Transaction Details</h1>
        </div>
        {txInfo && txDbInfo != null ? (
          <>
            <div className="blockDataInfo">
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Transaction Hash</div>
                </div>
                <div className="blockData-col2">
                  <div className="flexbox">
                    <p>{txInfo.hash}</p>
                    {copyCheckHash ? (
                      <div className="copyButton">
                        <AiFillCheckCircle size={20} />
                      </div>
                    ) : (
                      <div
                        className="copyButton"
                        onClick={() => hashCopy(txInfo.hash)}
                      >
                        <HiOutlineClipboard size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Status</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(txReceiptInfo.status, 16) == 1 ? (
                    <div>Success</div>
                  ) : (
                    <div>Fail</div>
                  )}
                </div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Block</div>
                </div>
                <div className="blockData-col2">
                  <div className="confirm">
                    <span onClick={(e) => goToBlock(parseInt(txInfo.blockNumber, 16), e)}>
                      # {parseInt(txInfo.blockNumber, 16)}
                    </span>
                    {/* { latestBlocks != null ? <>{latestBlocks[0].blocknumber}</> : null }         */}
                    <div className="blockData-col2-confirmation">
                      <div className="triangle"> </div>
                      <p>
                        {latestBlocks[0].blocknumber - txInfo.blockNumber} Block
                        Confirmations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Block Hash</div>
                </div>
                <div className="blockData-col2">{txInfo.blockHash}</div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Timestamp</div>
                </div>
                <div className="blockData-col2">
                  <RiTimer2Line />
                  &nbsp;{txTimeago} ({txDbInfo.time_stamp} UTC)
                </div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">From</div>
                </div>
                <div className="blockData-col2">
                  <div className="flexbox">
                    <span onClick={(e) => goFromAddress(txInfo.from, e)}>
                      {txInfo.from}
                    </span>
                    {copyCheckFrom ? (
                      <div className="copyButton">
                        <AiFillCheckCircle size={20} />
                      </div>
                    ) : (
                      <div
                        className="copyButton"
                        onClick={() => fromCopy(txInfo.from)}
                      >
                        <HiOutlineClipboard size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">To</div>
                </div>
                <div className="blockData-col2">
                  <div className="flexbox">
                    {
                      // 지금 여기서 경우의 수가 너무 많다.. 일단 contractAddress가 있다면 logs에 다 컨트랙어드레스가 존재하는듯? (확실하지는 않음)
                      txInfo.to == null ? (
                        <>
                          <div className="flexbox-flex">
                            <p>Contract</p> &nbsp;&nbsp;&nbsp;
                            <span
                              onClick={(e) =>
                                goToAddress(txReceiptInfo.contractAddress, e)
                              }
                            >
                              {txReceiptInfo.contractAddress}
                            </span>
                          </div>
                          {copyCheckTo ? (
                            <div className="copyButton">
                              <AiFillCheckCircle size={20} />
                            </div>
                          ) : (
                            <div
                              className="copyButton"
                              onClick={() =>
                                toCopy(txReceiptInfo.contractAddress)
                              }
                            >
                              <HiOutlineClipboard size={20} />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flexbox-flex">
                            {addressCheck ? (
                              <p>Contract &nbsp;&nbsp;&nbsp; </p>
                            ) : null}
                            <span onClick={(e) => goToAddress(txInfo.to, e)}>
                              {txInfo.to}
                            </span>
                          </div>
                          {copyCheckTo ? (
                            <div className="copyButton">
                              <AiFillCheckCircle size={20} />
                            </div>
                          ) : (
                            <div
                              className="copyButton"
                              onClick={() => toCopy(txInfo.to)}
                            >
                              <HiOutlineClipboard size={20} />
                            </div>
                          )}
                        </>
                      )
                    }
                  </div>
                </div>
              </div>

              {/* ======= samart contratc parsing ======== */}
              {txReceiptInfo.logs[0] != null &&
              (txReceiptInfo.logs[0].topics[0] ==
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" ||
                txReceiptInfo.logs[0].topics[0] ==
                  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925") &&
              txReceiptInfo.logs[0].topics.length == 3 ? (
                <div className="blockData-row">
                  <div className="blockData-col1">
                    <div className="blockData-col1-title">ERC-20 Transfers</div>
                  </div>
                  <div className="blockData-col2">
                    <p>
                      From{" "}
                      <span>
                        {ethers.utils.defaultAbiCoder
                          .decode(
                            ["uint256"],
                            txReceiptInfo.logs[0].topics[1]
                          )[0]
                          ._hex.substr(0, 19)}
                      </span>
                      ...
                    </p>
                    &nbsp;&nbsp;
                    <p>
                      {" "}
                      To{" "}
                      <span>
                        {ethers.utils.defaultAbiCoder
                          .decode(
                            ["uint256"],
                            txReceiptInfo.logs[0].topics[2]
                          )[0]
                          ._hex.substr(0, 19)}
                      </span>
                      ...
                    </p>
                    &nbsp;&nbsp;
                    <p>
                      {" "}
                      For{" "}
                      {ethers.utils.defaultAbiCoder
                        .decode(["uint256"], txReceiptInfo.logs[0].data)[0]
                        .toString() /
                        10 ** 18}{" "}
                      Tokens
                    </p>
                  </div>
                </div>
              ) : null}
              {txReceiptInfo.logs[0] != null &&
              (txReceiptInfo.logs[0].topics[0] ==
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" ||
                txReceiptInfo.logs[0].topics[0] ==
                  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925") &&
              txReceiptInfo.logs[0].topics.length == 4 ? (
                <div className="blockData-row">
                  <div className="blockData-col1">
                    <div className="blockData-col1-title">
                      ERC-721 Transfers
                    </div>
                  </div>
                  <div className="blockData-col2">
                    {ethers.utils.defaultAbiCoder.decode(
                      ["uint256"],
                      txReceiptInfo.logs[0].topics[1]
                    )[0]._hex == "0x00" ? (
                      <>
                        <p>
                          From Null Address: &nbsp;
                          <span>
                            {ethers.utils.defaultAbiCoder
                              .decode(
                                ["uint256"],
                                txReceiptInfo.logs[0].topics[1]
                              )[0]
                              ._hex.substr(0, 19)}
                          </span>
                          ...
                        </p>
                        &nbsp;
                      </>
                    ) : (
                      <>
                        <p>
                          From{" "}
                          <span>
                            {ethers.utils.defaultAbiCoder
                              .decode(
                                ["uint256"],
                                txReceiptInfo.logs[0].topics[1]
                              )[0]
                              ._hex.substr(0, 19)}
                          </span>
                          ...
                        </p>
                        &nbsp;
                      </>
                    )}
                    &nbsp;&nbsp;
                    <p>
                      To{" "}
                      <span>
                        {ethers.utils.defaultAbiCoder
                          .decode(
                            ["uint256"],
                            txReceiptInfo.logs[0].topics[2]
                          )[0]
                          ._hex.substr(0, 19)}
                      </span>
                      ...
                    </p>
                    &nbsp;&nbsp;
                    <p>
                      For ERC-721 TokenId [
                      <span>
                        {ethers.utils.defaultAbiCoder
                          .decode(
                            ["uint256"],
                            txReceiptInfo.logs[0].topics[3]
                          )[0]
                          .toString()}
                      </span>
                      ]
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Value</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(txDbInfo.value, 16) / 10 ** 18} GEN
                </div>
              </div>

              {/* 인풋데이터 */}
              <div className="blockData-row-input">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Input Data</div>
                </div>
                <div className="blockData-col2-inputData">
                  {decode ? (
                    <>
                      <textarea
                        readOnly
                        spellCheck="false"
                        className="inputData"
                        value={txInfo.input}
                        onChange={handleResizeHeight}
                      ></textarea>
                      <button
                        className="inputData-button"
                        onClick={() => decoding()}
                      >
                        Decoding
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="inputData-table">
                        {txReceiptInfo.logs[0] != null &&
                        txReceiptInfo.logs[0].topics[0] ==
                          "0x47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4" ? (
                          <div className="airdrop">
                            20 GEN Airdrop Completed
                          </div>
                        ) : (
                          <table>
                            <thead>
                              <tr>
                                <th width={50}>#</th>
                                <th width={100}>name</th>
                                <th width={100}>type</th>
                                <th width={400}>data</th>
                              </tr>
                            </thead>
                            <tbody>
                              {txDecodeInputData != ""
                                ? txDecodeInputData.params.map(
                                    (data, index) => {
                                      return (
                                        <tr key={index}>
                                          <td width={50}>{index}</td>
                                          <td width={100}>{data.name}</td>
                                          <td width={100}>{data.type}</td>
                                          {data.type === "bool" ? (
                                            <>
                                              {data.value ? (
                                                <td width={400}>true</td>
                                              ) : (
                                                <td width={400}>false</td>
                                              )}
                                            </>
                                          ) : (
                                            <td width={400}>{data.value}</td>
                                          )}
                                        </tr>
                                      );
                                    }
                                  )
                                : null}
                            </tbody>
                          </table>
                        )}
                      </div>
                      <button
                        className="inputData-button"
                        onClick={() => decoding()}
                      >
                        Original
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="blockData-row-last">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Gas Price</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(txInfo.gasPrice, 16) / 10 ** 9} Gwei
                </div>
              </div>
            </div>
          </>
        ) : (
          <NullTxsData />
        )}
      </div>
    </>
  );
};
{
  /* <div>추가로 하고 싶은거 : Txn Fee / Gas관련 데이터들 / input data</div> */
}

export default TransactionPage;
