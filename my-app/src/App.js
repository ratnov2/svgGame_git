import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Canvas from "./components/canvas/canvas";
import { randomInitCoord } from "./InitHelp/HelpFunction";
import { getFlyingObject } from "./reducers/valueBeginSelector";

function App() {
  
  useEffect(()=>{
    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  },[])

  
  // useEffect(()=>{
  //   randomInitCoord(flyingObjectValue)
  //   console.log('eer')
  // },[])
  
  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
