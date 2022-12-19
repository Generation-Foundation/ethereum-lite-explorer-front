import React from 'react'
import { useParams } from 'react-router-dom'

const NullBlockData = () => {

    const {params} = useParams()

  return (
    <div className="blockDataInfo">
        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Block Number
                </div>
            </div>
            <div className="blockData-col2">
                #{params}
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Timestamp
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Transactions
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>
        
        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Mined by
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        {/* <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Uncles Reward
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div> */}

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Difficulty
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Total Difficulty
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">Size</div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Gas Used
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Gas Limit
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Extra Data
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">Hash</div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    ParentHash
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>

        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Sha3Uncles
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>
        <div className="blockData-row">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    StateRoot
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>
        <div className="blockData-row-last">
            <div className="blockData-col1">
                <div className="blockData-col1-title">
                    Nonce
                </div>
            </div>
            <div className="blockData-col2">
                null
            </div>
        </div>
    </div>
    )
}

export default NullBlockData