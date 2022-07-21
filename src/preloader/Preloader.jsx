import React from "react";
import preloaderSVG from '../img/preloaderSVG.svg'

function Preloader (){
    return <div><img src= {preloaderSVG} alt="Loading" /></div>
}

export default Preloader