import React, { DragEventHandler, useEffect, useState } from "react"
//import "../mainPage.scss"
import Popup from "./popup"
import InfoIcon from '@mui/icons-material/Info'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DoneIcon from '@mui/icons-material/Done'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { ModulAngebot, ModulColor } from "../messages"
import { createTooltip, getHolderUnderCursor, getSemesterUnderCursor, getStartSem } from "../utility"
import { OverlayTrigger } from "react-bootstrap"

export interface modulProps{

    //modul funktionen 
    showInfo:(props: modulProps) => void
    modulDone:(props: modulProps) => void
    setModIsDragged:(props: modulProps | null) => void

    //eigenschaften
    semester: number | null
    holder: number | null
    bestanden: boolean
    id: string
    name: string
    lp: number
    angebot: string
    empfWS: number
    empfSS: number
    //is set to 0 if no min lp are required
    minPunkte: number
    vorModuleInhalt: string[]
    vorModuleFormal: string[]
    vorLeistung: boolean
    katalog: string
    pflicht_in: string[] | null
    empfohlen_fuer: string[] | null
    nicht_fuer: string[] | null
    url: string
    show: boolean
    color: string
    spacer: number
    oldSpacer: number
    
    isVoluntarily: boolean 

    //show Info about mod
    inhalt: string
/*
    //app optionen 
    showID: boolean
    showLp: boolean
    showAngebot: boolean
    showEmpfSem: boolean
    showVorModsInhalt: boolean
    showVorModsFormal: boolean
    showMinLp: boolean
    */
}

//this is for the status bar 
//to show what is done
export interface votingModulReasons{

    minPunkte: number | null
    vorModule: string[] | null
    verForbidden: boolean
    spacerPoints: boolean
    angebot?: string
    bestanden?: boolean
}

export interface coloredModul{

    index: number
    color: ModulColor
}

export interface desiredModulVoting{

    modul: modulProps
    newSemester: number
    newHolder: number
}


export default function Modul(props: modulProps){

    
    function onDragStart(event: React.DragEvent){

        //event.preventDefault()
        props.setModIsDragged(props)

        //pass Props Object as Transfer Data
        event.dataTransfer.setData("modul", JSON.stringify(props))   
    }
    
    function onDragEnd(event: React.DragEvent){

        //event.preventDefault()
        props.setModIsDragged(null)
    }
    
    //react set color prop of modul ---> state change, so react fires the get classes function of the specific modul
    //this function then assins an additional class to the JSX element, which will then be overwritten by CSS to display the correct color
    function getClasses(): string{

        //let classes: string = "modul modGlobalIndex-" + props.globalIndex + " modLocalIndex-" + props.localIndex + props.color
        let classes: string = "modul " + props.color

        //hide modul in scroller
        if(!props.show){

            classes += " hide"
        }

        return classes
    }

    function getDoneButtonID(): string{

        return props.id + "doneButton" 
    }

    function getEmpfSem(): JSX.Element{


        const getSem = (): number => getStartSem() == "WS" ? props.empfWS : props.empfSS

        return(
            <p className="empfSem hidden smallFont">{getSem().toString() + ". Fachsemester"}</p>
        )
    }

    function getVorModsInhalt(): JSX.Element{

        let result: string = ""

        for(let i = 0; i < props.vorModuleInhalt.length; i++){

            result += props.vorModuleInhalt[i] + "; "
        }

        result = result.slice(0, -2)

        return <p className="vorModsInhalt smallFont yellowFont"> - {result}</p>

        
    }

    function getVorModsFormal(): JSX.Element{

        let result: string = ""

        for(let i = 0; i < props.vorModuleFormal.length; i++){

            result += props.vorModuleFormal[i] + "; "
        }

        result = result.substring(0, result.length -2)

        return <p className="vorModsFormal smallFont redFont"> - {result}</p>
    }

    function getMinLp(): JSX.Element | null{

        return <p className="minLp smallFont redFont">{"min: " + props.minPunkte + " LP"}</p>
    }

    function getTooltip(): JSX.Element{

        const obj: JSX.Element = 

            <OverlayTrigger placement="bottom" overlay={createTooltip("Prüfungsvorleistung benötigt", "bottom")}>
                <div className="vorLeistung">
                    {props.vorLeistung && <WarningAmberIcon/>}
                </div>
            </OverlayTrigger>

        return obj
    }

    return(
        <div id={(props.id)} key={props.id} className={getClasses()} draggable={!props.bestanden} onDragStart={(event) => onDragStart(event)} onDragEnd={(event) => onDragEnd(event)}>
                <p className="name mediumFont">{props.name}</p>
                <div className="modulInfos">
                    <p className="id smallFont"> - {props.id}</p>
                    <p className="lp smallFont"> - {props.lp}LP </p>
                    <p className="angebot smallFont"> - {props.angebot}</p>
                </div>
                {getEmpfSem()}
                <div className="modulVorInfos">
                    {props.vorModuleInhalt[0] != "" && getVorModsInhalt()}
                    {props.vorModuleFormal[0] != "" && getVorModsFormal()}
                    {props.minPunkte > 0 && getMinLp()}
                </div>
                <div className="modulButtons">
                    <div className="infoButton" onClick={() => props.showInfo(props)}>
                        <InfoOutlinedIcon className="infoButton icon"/>
                    </div>
                    <div id={getDoneButtonID()} className="doneButton" onClick={() => props.modulDone(props)}>
                        {!props.bestanden &&<DoneIcon className="doneButton icon"/>}
                        {props.bestanden && <CloseOutlinedIcon className="doneButton icon"/>}
                    </div>
                    {getTooltip()}
                </div> 
        </div>
    )
}