import { Button } from "antd";
import React, { useState }  from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageUserButton } from "../redux/users-reducer"; 
import { setCurrentCount, setCurrentUserCount } from "../redux/users-reducer";
import { getIsFetchingUserDataSelector, getPageDataSelector } from "../redux/users-selector";
import style from './Users/Users.module.css'
function Paginator(props){
    const {currentPage,count,term} = useSelector(getPageDataSelector)
    const dispatch = useDispatch()
    const setCurrentUserCountDis=useCallback(
        (currentUser) => dispatch(setCurrentUserCount(currentUser)),
        [dispatch]
    )
    const setCurrentCoutDis=useCallback(
        (count) => dispatch(setCurrentCount(count)),
        [dispatch]
    )
    const setCurrentPage=useCallback(
        (currentPage) => dispatch(setPageUserButton(currentPage)),
        [dispatch]
    )
  

    const isFetchingUserData = useSelector(getIsFetchingUserDataSelector)
    
    const [color,setColor] = useState(currentPage)
       
    let test2 = Math.floor(currentPage/(count))
    const [state, setState] = useState(0)
    
  let right = (test2*count+20+state)
  let left = (test2*count+state)
  
  let page = []
  for(let i = 1;i<=(props.totalCount/props.count)+1;i++){
    page.push(i)
  }
  return(
      <>
      {/* Кнопка 1 */}
        {left<=0
        ? '' 
        : <Button disabled={isFetchingUserData}
            onClick={()=>{props.getUsersData(1,props.count,term);
                         setColor(1);
                         setState(0)
                         setCurrentCoutDis(0)
                         setCurrentPage(1)
                         setCurrentUserCountDis(1);
                         }}> 1 
          </Button>}
        {/* кнопка Prev */}
        
        <Button type="primary" disabled={left<=0 
            ? 'disabled' 
            : ''} onClick={()=>{setState(state-20);setCurrentCoutDis(count)}}>prev
        </Button>
        {/* all buttons */}

    {page.filter((k)=> k >=left && k<right).
    map((k,index)=>{
        return <Button disabled={isFetchingUserData}
            className={currentPage==(k) ? style.active : ''} 
            key={index} 
            onClick={()=>{;
                         setState(0)
                         setColor(k)
                         setCurrentUserCountDis(k);
                         setCurrentPage(k)
                         }}> {k} 
            </Button>
        })}   
    {/* next button */}

    <Button type="primary" disabled={state>=(page.length+state-left-count) 
        ? 'disabled' 
        : ''} 
        onClick={()=>{setState(state+20);
        setCurrentCoutDis(count+props.count);
        }}>next
    </Button>
        {/* max button */}
        {right>=(page.length) 
        ? '' 
        : <Button disabled={isFetchingUserData} onClick={()=>{props.getUsersData(page.length,props.count,term);
                              setColor(page.length);
                              setCurrentUserCountDis(page.length)
                              setState(Math.floor(page.length/10)*10+state-left);
                              setCurrentCoutDis(page.length-props.count);
                             }}> {page.length} 
          </Button>}
     </>
  )
    
}

export default Paginator