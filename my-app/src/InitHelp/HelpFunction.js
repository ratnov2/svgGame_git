
export let randomInitCoord =flyingObject=>{
    //flyingObject = flyingObject.flyingObject
    let coord = -Math.floor(Math.random()*(window.innerHeight-167)+100) ///исправить на посоянное значение нижней стенки
    flyingObject.forEach(element=>{
        console.log('dude')
        if(Math.abs(coord+element.y)<=70) randomInitCoord(flyingObject)
    })
    return coord
}   
export let randomSides = (sides)=>{
    console.log(sides[Math.floor(Math.random()*2)])
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

export let ballPosMove = (trig,anke)=>{ // движение шара через синус и косинус
    if(trig == 'sin')
     return 5*(Math.sin((anke)*Math.PI/180))
    else if(trig == 'cos')
     return 5*(Math.cos((anke)*Math.PI/180))
    else console.warn('sin or cos is incorrectly')
}