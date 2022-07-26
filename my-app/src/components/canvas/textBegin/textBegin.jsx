

import React from "react";
import StartGame from "./startGame";
import Title from "./title";

const TextBegin =(props)=>{
    let startGame = ()=>{props.changeStartGame(true)}
    return (
        <>
            <StartGame changeStartGame = {startGame}/>
            <Title />
        </>
    )
}
export default TextBegin