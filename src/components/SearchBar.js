/* eslint-disable */
import React, { useRef, useState } from 'react'
import './SearchBar.css'
import { BiSearch } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate()
    const [inputData, setInputData] = useState()
    const inputRef = useRef()

    const changeInput = (e) => {
        e.preventDefault()
        //console.log(e.target.value)
        setInputData(e.target.value)
    } 
    
    const pressEnter = (e) => {
        if(e.key == 'Enter'){
            movePageFunc(inputData, e)
        }
    }
    
    const onClearInput = () => {
        inputRef.current.value = ''
    }

    // 서치바 페이지이동
    const movePageFunc = (blockData, e) => {
        //console.log("this는?",e.target.value)
        let number = Number(blockData)
        //console.log("여기가뭔데그래서",isNaN(number))
        // console.log("여기가뭔데그래서",isNaN(blockData))
        // console.log("여기가뭔데그래서",blockData.length)
        // console.log("타입확인",typeof(blockData))

        // 블럭 번호
        if(isNaN(number) === false && blockData.length < 9) {
            if(e.ctrlKey || e.metaKey){
                window.open('/block/' + blockData)
                onClearInput()
            } else {
                navigate('/block/' + blockData)
                onClearInput()
            }
        } 
        // 계정주소 
        else if(isNaN(number) === false && blockData.length === 42){
            if(e.ctrlKey || e.metaKey){
                window.open('/address/' + blockData)
                onClearInput()
            } else {
                navigate('/address/' + blockData)
                onClearInput()
            }
        } 
        // 트랜잭션 해시 
        else if(isNaN(number) === false && blockData.length === 66){
            if(e.ctrlKey || e.metaKey){
                window.open('/tx/' + blockData)
                onClearInput()
            } else {
                navigate('/tx/' + blockData)
                onClearInput()
            }
        }
        // 해시는 66자리인데.. 블록해시랑, Tx해시를 어케 구분해야할지..
        else {
            if(e.ctrlKey || e.metaKey){
                window.open('/' + blockData)
                onClearInput()
            } else {
                navigate('/' + blockData)
                onClearInput()
            }
        }
    } 

  return (
    <div className='searchContainer'>
        <input type="text" 
            className='searchInput' 
            placeholder='Search by transaction hash, block number or account hash...'
            onKeyDown={pressEnter}
            onChange={changeInput}
            ref={inputRef}
            />
            
        <button type="submit" 
            className='searchButton' 
            aria-label='Search'
            onClick={(e)=>movePageFunc(inputData, e)}
            >
            <div><BiSearch size={25} /></div>
        </button>
    </div>
  )
}

export default SearchBar