const sidesNlo=['left','right']

export let randomInitCoord =flyingObject=>{
    //flyingObject = flyingObject.flyingObject

    let coord = -Math.floor(Math.random()*(window.innerHeight-167)+100) ///исправить на посоянное значение нижней стенки
    
    coord = coordYRandInit(100)
    //console.log(coord)
    flyingObject.forEach((element,index)=>{
       // console.log(index)
        if(flyingObject.length==index) return coord
        if(Math.abs(coord-element.y)<=70) {
            console.log(Math.abs(coord-element.y))
            randomInitCoord(flyingObject)
        }
    })
    return coord
}   
export let randomSides = (sides)=>{
    return sides[Math.floor(Math.random()*2)]
}
export let randomXCoord =()=>{
     if(Math.floor(Math.random()*2))
        return -window.innerWidth
    else return window.innerWidth
}
export let coordYRandInit = (value)=>{
   return -(Math.random()*(window.innerHeight-140)/2+value) //исправить нижнее положение
}
export let setCoordNlo = ()=>{
    return {id:'randomSides',x:randomXCoord(),y:coordYRandInit(100)}
}

export let ballPosMove = (trig,anke)=>{ // движение шара через синус и косинус
    if(trig == 'sin')
     return 5*(Math.sin((anke)*Math.PI/180))
    else if(trig == 'cos')
     return 5*(Math.cos((anke)*Math.PI/180))
    else console.warn('sin or cos is incorrectly')
}
let ankeFun = (ancle)=>{
    if (ancle < 0) return ancle = 90 - ancle
    else return ancle = 270 - ancle
  }
export let formPosObjectBall = (posXY,anke)=>{
   return {x:posXY.x+ballPosMove('sin',ankeFun(anke)),y:posXY.y+ballPosMove('cos',ankeFun(anke))}
  }