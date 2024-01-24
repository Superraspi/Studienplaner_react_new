import React, { Component, useEffect, useState } from "react"



export interface navButtonProps{

    name: string,
    icon: React.ReactNode[],
    trigger: () => void
}


export default function NavButton(props: navButtonProps){

    //change theme icon 
    const [curr, setCurr] = useState<number>(0)
    const last = props.icon.length-1
    const [icon, setIcon] = useState<React.ReactNode>(props.icon[curr])

    useEffect(() => {

        setIcon(props.icon[curr])
    }, [curr])

    function getIcon(){

        if(curr < last){

            setCurr(curr + 1)
        }
        else{

            setCurr(0)
        }
        props.trigger()
    }


    return(

        <div className="navButton-wrapper" onClick={getIcon}>
            
            {icon} 

            <div className="textwrapper">
                <div className="text">{props.name}</div>
            </div>

        </div>
    )
}

