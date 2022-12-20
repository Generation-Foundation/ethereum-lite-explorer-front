/* eslint-disable */
import "./BlockPage.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlockInfo } from "../redux/action/getBlockInfo";
import { getBlockInfoHash } from "../redux/action/getBlockInfoHash";
import { getBalance } from "../redux/action/getNumberOfBlock";
import { NullBlockData } from "../components/_index";
import { RiTimer2Line } from "react-icons/ri";
import DetailMoveBtn from "../components/detailMoveBtn";

const BlockPage = () => {
  const { params } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blockInfo, unixTimestamp, blockTimeago } = useSelector(
    (state) => state.blockData
  );
  const { numberOfBlock } = useSelector((state) => state.addressData);
  //해쉬로 블록을 검색을 했을 떄 이동 버튼이 안 되서 blocknumber를 따로 빼주기
  const blockNumber = parseInt(blockInfo?.number, 16);

  const goToTxs = (blockNumber, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/txs/" + blockNumber);
    } else {
      navigate("/txs/" + blockNumber);
    }
  };

  const goToParentHash = (blockHash, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open("/block/" + blockHash);
    } else {
      navigate("/block/" + blockHash);
    }
  };

  useEffect(() => {
    // url로 검색시 예외 처리 추가 반영
    if (params.length < 9) {
      dispatch(getBlockInfo.getBlockInfoApi(params));
      dispatch(getBalance.getNumberOfBlock());
    } else if (params.length == 66) {
      dispatch(getBlockInfoHash.getBlockInfoHashApi(params));
      dispatch(getBalance.getNumberOfBlock());
    } else {
      navigate("/" + params);
      dispatch(getBalance.getNumberOfBlock());
    }
  }, [params]);

  return (
    <>
      <div className="blockDataContainer">
        <div className="blockDataTitle">
          <h1>Block Number</h1>
          <h2>#{params}</h2>
          <div className="btnBox">
            <DetailMoveBtn
              text={"<"}
              blockNumber={blockNumber}
              type="prev"
              url="/block/"
              firstPage={1}
              lastPage={numberOfBlock}
            />
            <DetailMoveBtn
              text={">"}
              blockNumber={blockNumber}
              type="next"
              url="/block/"
              firstPage={1}
              lastPage={numberOfBlock}
            />
          </div>
        </div>
        {blockInfo != null ? (
          <>
            <div className="blockDataInfo">
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Block Number</div>
                </div>
                <div className="blockData-col2">
                  # {parseInt(blockInfo.number, 16)}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Timestamp</div>
                </div>
                <div className="blockData-col2">
                  <RiTimer2Line /> &nbsp; {blockTimeago} ({unixTimestamp})
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Transactions</div>
                </div>
                <div className="blockData-col2">
                  {blockInfo.transactions.length != 0 ? (
                    <button
                      onClick={(e) =>
                        goToTxs(parseInt(blockInfo.number, 16), e)
                      }
                    >
                      {blockInfo.transactions.length} transactions
                    </button>
                  ) : (
                    <div>{blockInfo.transactions.length} transactions</div>
                  )}
                </div>
              </div>

              {/* <div className="blockData-row">
                            <div className="blockData-col1">
                                <div className="blockData-col1-title">
                                    Uncles Reward
                                </div>
                            </div>
                            <div className="blockData-col2">
                                {parseInt(blockInfo.uncles, 16).toFixed(3)} GEN
                            </div>
                        </div> */}

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Difficulty</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(blockInfo.difficulty, 16).toLocaleString()}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Total Difficulty</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(blockInfo.totalDifficulty, 16).toLocaleString()}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Size</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(blockInfo.size, 16).toLocaleString()} bytes
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Gas Used</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(blockInfo.gasUsed, 16).toLocaleString()}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Gas Limit</div>
                </div>
                <div className="blockData-col2">
                  {parseInt(blockInfo.gasLimit, 16).toLocaleString()}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Extra Data</div>
                </div>
                <div className="blockData-col2">
                  {blockInfo.extraData.substr(0, 30)} ...{" "}
                  {blockInfo.extraData.slice(-30)}
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Hash</div>
                </div>
                <div className="blockData-col2">{blockInfo.hash}</div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">ParentHash</div>
                </div>
                <div className="blockData-col2">
                  <span
                    onClick={(e) => goToParentHash(blockInfo.parentHash, e)}
                  >
                    {blockInfo.parentHash}{" "}
                  </span>
                </div>
              </div>

              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Sha3Uncles</div>
                </div>
                <div className="blockData-col2">{blockInfo.sha3Uncles}</div>
              </div>
              <div className="blockData-row">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">StateRoot</div>
                </div>
                <div className="blockData-col2">{blockInfo.stateRoot}</div>
              </div>
              <div className="blockData-row-last">
                <div className="blockData-col1">
                  <div className="blockData-col1-title">Nonce</div>
                </div>
                <div className="blockData-col2">{blockInfo.nonce}</div>
              </div>
            </div>
          </>
        ) : (
          <NullBlockData />
        )}
      </div>
    </>
  );
};

export default BlockPage;
