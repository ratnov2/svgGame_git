

function classMassive(props){
    let styleMas
    if(!props.length){
        styleMas =  Object.values(props).map(u=>u +' ')
    }
    return styleMas;
}
 export default classMassive