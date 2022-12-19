import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HiOutlineClipboard } from "react-icons/hi"
import { AiFillCheckCircle } from "react-icons/ai"

const NullTxsData = () => {

  const {params} = useParams()
  const [copyCheckHash, setCopyCheckHash] = useState(false)

  const hashCopy = (data) => {
    navigator.clipboard.writeText(data)
    setCopyCheckHash(true)
    setTimeout(()=>{
        setCopyCheckHash(false)
    }, 1000)
}

  return (
    <div className='blockDataInfo'>
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Transaction Hash</div>
                </div>
                <div className='blockData-col2'>
                    <div className='flexbox'>
                        <p>{params}</p>
                        {   copyCheckHash 
                            ? <div className='copyButton'><AiFillCheckCircle size={20}/></div>
                            : <div className='copyButton' onClick={()=>hashCopy(params)}><HiOutlineClipboard size={20}/></div>
                        }
                    </div>
                </div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Status</div>
                </div>
                <div className='blockData-col2'>
                    Fail
                </div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Block</div>
                </div>
                <div className='blockData-col2'>
                    null
                </div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Block Hash</div>
                </div>
                <div className='blockData-col2'>null</div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Timestamp</div>
                </div>
                <div className='blockData-col2'>null</div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>From</div>
                </div>
                <div className='blockData-col2'>
                    <div className='flexbox'>
                        null
                    </div>
                </div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>To</div>
                </div>
                <div className='blockData-col2'>
                    <div className='flexbox'>
                        null
                    </div>
                </div>
            </div>  
            <div className='blockData-row'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Value</div>
                </div>
                <div className='blockData-col2'>null</div>
            </div>  
            <div className='blockData-row-last'>
                <div className='blockData-col1'>
                    <div className='blockData-col1-title'>Gas Price</div>
                </div>
                <div className='blockData-col2'>null</div>
            </div>  
        </div>
  )
}

export default NullTxsData