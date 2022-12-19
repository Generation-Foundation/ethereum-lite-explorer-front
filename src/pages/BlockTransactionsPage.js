/* eslint-disable */
import './BlockTransactionsPage.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dbBlockTxs } from '../redux/action/dbBlockTxs'
import { BiArrowFromLeft } from "react-icons/bi"

const BlockTransactionsPage = () => {
    //console.log(window.location.search)
    const {params} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blockTxs, blockTxsTimeago } = useSelector(state => state.blockData)

    const goToTransaction = (txHash, e) =>{
        if (e.ctrlKey || e.metaKey) {
            window.open("/tx/" + txHash)
        } else {
            navigate("/tx/" + txHash);
        }
    }

    const goToBlock = (number, e) => {
        if (e.ctrlKey || e.metaKey) {
            window.open("/block/" + number)
        } else {
            navigate("/block/" + number);
        }
    }

    const goToFromAddress = (address, e) => {
        if (e.ctrlKey || e.metaKey) {
            window.open("/address/" + address)
        } else {
            navigate("/address/" + address);
        }
    }

    const goToToAddress = (address, e) => {
        if (e.ctrlKey || e.metaKey) {
            window.open("/address/" + address)
        } else {
            navigate("/address/" + address);
        }
    }

    useEffect(()=>{
        dispatch(dbBlockTxs.dbBlockTxsApi(params))
    },[])


return (
    <div className='addressDataContainer'>
        <div className='addressDataTitle'>
            <h1>Transactions</h1>
            <h3>For Block #{params}</h3>
            <br/>
            { blockTxs != null ? <h3>A total of {blockTxs.length} transactions found</h3> : null }
        </div>
        <div className='tableBox'>
            <table>
                <thead>
                    <tr>
                        <th className='th-left-top' width={250}>Txn Hash</th>
                        <th  width={100}>Block</th>
                        <th  width={150}>Age</th>
                        <th  width={250}>From</th>
                        <th  width={30}></th>
                        <th  width={250}>To</th>
                        <th className='th-right-top' width={200}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blockTxs != null ? 
                        blockTxs.map((data, index)=>{
                        return <tr className='tabledata' key={index}>
                                <td className='td-left-padding'>
                                    <span onClick={(e)=>goToTransaction(data.txHash, e)}>{(data.txHash).substr(0, 20)}...</span>
                                </td>
                                <td className='td-center'>
                                    <span onClick={(e)=>goToBlock(data.blockNumber, e)}>{data.blockNumber}</span>
                                </td>
                                <td className='td-center'>{blockTxsTimeago[index]}</td>
                                <td className='td-center'>
                                    <span onClick={(e)=>goToFromAddress(data.fromAddress, e)}>{(data.fromAddress).substr(0, 20)}...</span>
                                </td>
                                <td className='td-center'><BiArrowFromLeft/></td>
                                <td className='td-center'>
                                    <span onClick={(e)=>goToToAddress(data.toAddress, e)}>{(data.toAddress).substr(0, 20)}...</span>
                                </td>
                                <td className='td-right'>{parseInt(data.value, 16)/10**18} GEN</td>
                            </tr>
                        })
                        : null
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BlockTransactionsPage