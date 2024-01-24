import React, { useState } from "react"
import CircleIcon from '@mui/icons-material/Circle'
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { createTooltip } from "../utility"
import { SideHeaderText } from "../messages"
import { studiengang } from "./dropDownStudiengaenge"


export interface sideHeaderProps{

    name: string
    studiengang: studiengang
    isLoggedIn: boolean

    //button methods
    showChangeStudiengangPopup:() => void
}

export function SideHeader(props: sideHeaderProps){

    const [autoSave, setAutoSave] = useState<boolean>(props.isLoggedIn)

    function getSaveTag(): JSX.Element{

        const elemGreen: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.greenAutoSaveTagTextWhenLoggedIn + props.name + "'", "bottom")}>
            <div className="sideHeaderTag autoSaveTag" onClick={toggleAutoSave}>
                <CircleIcon className="sideHeaderTagIcon tinyFont greenFont overwrite"/>
                <span className="sideHeaderTagText tinyFont">Autom. Speichern</span>
            </div>
        </OverlayTrigger>
        

        const elemRedLogout: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.redAutoSaveTagTextWhenNotLoggedIn, "bottom")}>
            <div className="sideHeaderTag autoSaveTag" onClick={toggleAutoSave}>
                <CircleIcon className="sideHeaderTagIcon tinyFont redFont overwrite"/>
                <span className="sideHeaderTagText tinyFont strikethrough">Autom. Speichern</span>
            </div>
        </OverlayTrigger>

        const elemRedLogin: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.redAutoSaveTagTextWhenLoggedIn, "bottom")}>
            <div className="sideHeaderTag autoSaveTag" onClick={toggleAutoSave}>
                <CircleIcon className="sideHeaderTagIcon tinyFont redFont overwrite"/>
                <span className="sideHeaderTagText tinyFont strikethrough">Autom. Speichern</span>
            </div>
        </OverlayTrigger>
        

        if(props.isLoggedIn){

            if(autoSave)return elemGreen
            else return elemRedLogin
        }
        return elemRedLogout
    }

    function toggleAutoSave(): void{

        setAutoSave(!autoSave)
    }

    function getLoginTag(): JSX.Element{

        const elemLoggedIn: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.greenLoggedInTagText + props.name + "'", "bottom")}>
            <div className="sideHeaderTag isLoggedInTag" onClick={showLoginPopup}>
                <CircleIcon className="sideHeaderTagIcon tinyFont greenFont overwrite"/>
                <span className="sideHeaderTagText tinyFont">Angemeldet</span>
            </div>
        </OverlayTrigger>

        const elemNotLoggedIn: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.redNotLoggedInTagText, "bottom")}>
            <div className="sideHeaderTag isLoggedInTag" onClick={showLoginPopup}>
                <CircleIcon className="sideHeaderTagIcon tinyFont greenFont overwrite"/>
                <span className="sideHeaderTagText tinyFont">Nicht Angemeldet</span>
            </div>
        </OverlayTrigger>

        if(props.isLoggedIn)return elemLoggedIn
        return elemNotLoggedIn
    }

    function showLoginPopup(): void{

        
    }

    function getStudiengangTag(): JSX.Element{

        const elem: JSX.Element = 
        <OverlayTrigger placement="bottom" overlay={createTooltip(SideHeaderText.studiengangTagText + props.studiengang.name + "'", "bottom")}>
            <div className="sideHeaderTag studiegangTag" onClick={changeStudiengang}>
                <CircleIcon className="sideHeaderTagIcon tinyFont greenFont overwrite"/>
                <span className="sideHeaderTagText tinyFont">{props.studiengang.name}</span>
            </div>
        </OverlayTrigger>

        return elem
    }

    function changeStudiengang(): void{

        props.showChangeStudiengangPopup()
    }

    return(

        <div className='sideHeader'>
            <div className="sideHeaderWrapper">
                {getSaveTag()}
                {getLoginTag()}
            </div>
            <div className="sideHeaderWrapper">
                {getStudiengangTag()}
            </div>
        </div>
    )
}