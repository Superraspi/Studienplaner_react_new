import React, { useEffect, useRef, useState } from "react"
import './imageCubeStyle.css'
import image1 from './images/image-1.jpg'
import image2 from './images/image-2.jpg'
import image3 from './images/image-3.jpg'
import image4 from './images/image-4.jpg'


interface imageCubeProps{

    autoTurnTime: number
}

export function ImageCube(props: imageCubeProps): JSX.Element{

    var pos: number = 0
    var timerID: NodeJS.Timer | null = null



    //when size isnt shown 
    //otherwise cube is not rendered but turn position is still updated
    //this results in an very fast spinning cube (looks not intended)
    document.addEventListener("visibilitychange", function() {
        const elem = document.querySelector(".wrapperIMG")
        if(elem == null)return
        if (document.visibilityState === "hidden") {
            stopTurning()
        } 
        else if (document.visibilityState === "visible") {
            turnRight()
        }
      });



    

    //comp mounts
    useEffect(() => {

        turnRight()
    },[])
    

    //called every autoTurnTime intervall
    function turnRight(): void{

        timerID = setInterval(turn, props.autoTurnTime)        
    }

    function turn(): void{

        const cube: any = document.querySelector(".image-cube")

        if(cube != null){

            pos = pos - 90
            cube.style.transform = `rotateY(${pos}deg)`
        }
    }

    function stopTurning(): void{

        if(timerID != null){
            clearInterval(timerID)
        }
    }

    return (
        <div className="wrapperIMG">
            <div className="container">
            <div className="image-cube">
                    <div className="front">
                    <img src={image1} />
                    </div>
                    <div className="right">
                    <img src={image2} />
                    </div>
                     <div className="back">
                     <img src={image3} />
                    </div>
                     <div className="left">
                     <img src={image4} />
                    </div>
            </div>     
            </div> 
        </div>
    )
}

