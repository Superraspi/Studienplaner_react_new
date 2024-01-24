import React, { useState } from "react"
import logo_small_white from "../assets/logo_small_white.png"
import logo_big_white from "../assets/logo_big_white.png"
import logo_small_rgb from "../assets/logo_small_rgb.png"
import logo_big_rgb from "../assets/logo_big_rgb.png"

export enum LogoType{

    
}

interface logoProps{

    type: string
}

export function Logo(props: logoProps){

    var logo: string = logo_small_white

    switch(props.type){

        case "big_white":
            logo = logo_big_white
            break
        case "small_white":
            logo = logo_small_white
            break  
        case "big_rgb":
            logo = logo_big_rgb
            break
        case "small_rgb":
            logo = logo_small_rgb
            break          
    }


    return(
        <div className="logoContainer">
            <img className="logo small" src={logo}/>
        </div>
    )
}