import React, { useState } from "react"
import { modulProps } from "./modul"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DoneIcon from '@mui/icons-material/Done'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { createTooltip, getStartSem } from "../utility"
import { OverlayTrigger } from "react-bootstrap"

export interface holderProps{

    semesterId: number
    holderId: number
    onDrop: (event: React.DragEvent, props: holderProps) => void
    setModIsCurrentlyDragges: (modulProps: modulProps | null) => void
    modulState: modulProps[]
    holderCount: number
    setHolderDifferentSize: boolean
}

export default function Holder(props: holderProps){

    const holder: string = "holder"
    const holderLast: string = "last"

    const holder3: string = "holder three"
    const holder6: string = "holder six"
    const holder9: string = "holder nine"
    const holder12: string = "holder twelve"
    //returns the css classes
    //holder last is to remove the border of the last one (better looking layout)
    //the holders should be different size depending on the lp
    //6 lp -> mid 
    //9 lp -> bigger 
    function getClasses(): string{

        let result: string = holder

        //remove border of last holder
        let isLast: boolean = false
        if(props.holderCount == props.holderId)isLast = true 
        

        //holder should have different size depending on lp
        const index: number | null = getIndex()

        if(index != null){

            //option to disable different holder sizes
            if(props.setHolderDifferentSize){
            
                const lp: number = props.modulState[index].lp

                switch(lp){

                case 3:
            
                    result = holder3
                    break
                case 6:
                    
                    result = holder6
                    break
                case 9:
                    
                    result = holder9
                        break
                case 12:
                    
                    result = holder12
                    break
                default:
                    
                    result = holder6  
                    break              
                }
            }
            //if mod is voluntary
            if(props.modulState[index].isVoluntarily){

                result += " gray"
            }
            if(isLast)result += holderLast
        }
        return result
    }

    function onDragOver(event: React.DragEvent){

        event.preventDefault()

        let i = getIndex()
        if(i != null){

            const modulProps: modulProps = props.modulState[i]

            console.log("curr dragged: " + modulProps.name)
            props.setModIsCurrentlyDragges(modulProps)
        }
    }

    function onDragStart(event: React.DragEvent){

        let i = getIndex()
        if(i != null){

            const modulProps: modulProps = props.modulState[i]
            event.dataTransfer.setData("modul", JSON.stringify(modulProps))

            //this is pretty dirty but it does a solid job (occurs because of the pointer events of the fede tile)
            //actually i do not understand why i have to do this but i accepted the fate 
            setTimeout(() => props.setModIsCurrentlyDragges(modulProps), 1)
            
        }
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>){

        console.log("drop")
        event.preventDefault()
        event.stopPropagation()

        props.onDrop(event, props)

        props.setModIsCurrentlyDragges(null)
    }

    function onDragEnd(event: React.DragEvent<HTMLDivElement>): void{

        //console.log("drag end")
        props.setModIsCurrentlyDragges(null)
    }

    //returns the index number if the holder holds a modul
    //return null if not
    const getIndex = (): number | null => {

        let result = null

        for(let i = 0; i < props.modulState.length; i++){

            if(props.modulState[i].semester === props.semesterId && props.modulState[i].holder === props.holderId){

                result = i
            }
        }

        return result
    }

    function getDoneButtonID(index: number): string{

        return props.modulState[index].id + "doneButton" 
    }

    function getEmpfSem(index: number): JSX.Element{


        const getSem = (): number => getStartSem() == "WS" ? props.modulState[index].empfWS : props.modulState[index].empfSS

        return(
            <p className="empfSem hidden smallFont">{getSem().toString() + ". Fachsemester"}</p>
        )
    }

    function getVorModsInhalt(index: number): JSX.Element{

        let result: string = ""

        for(let i = 0; i < props.modulState[index].vorModuleInhalt.length; i++){

            result += props.modulState[index].vorModuleInhalt[i] + "; "
        }

        result = result.slice(0, -2)

        return <p className="vorModsInhalt smallFont yellowFont"> - {result}</p>

        
    }

    function getVorModsFormal(index: number): JSX.Element{

        let result: string = ""

        for(let i = 0; i < props.modulState[index].vorModuleFormal.length; i++){

            result += props.modulState[index].vorModuleFormal[i] + "; "
        }

        result = result.substring(0, result.length -2)

        return <p className="vorModsFormal smallFont redFont"> - {result}</p>
    }

    function getMinLp(index: number): JSX.Element | null{

        return <p className="minLp smallFont redFont">{"min: " + props.modulState[index].minPunkte + " LP"}</p>
    }

    //returns the JSX Element of the index State array
    //return empty JSX Element of no module is chosen
    function getLegacyModul(): JSX.Element{

        let i = getIndex()

        if(i != null){

            return(

                <div className="modulHolder" id={"modulHolder"+props.semesterId+":"+props.holderId} draggable 
                //onDragStart={onDragStart}
                
                >
                <p className="name">{props.modulState[i].name}</p>
                <p className="id">{props.modulState[i].id}</p>
                <p className="lp">{props.modulState[i].lp}LP</p>
                
                </div>
            )
        }
        else{

            return(

                <div className="modulHolder" id={"modulHolder"+props.semesterId+":"+props.holderId}/>
            )
        }
    }

    function getTooltip(index: number): JSX.Element{

        const obj: JSX.Element = 

            <OverlayTrigger placement="bottom" overlay={createTooltip("Prüfungsvorleistung benötigt", "bottom")}>
                <div className="vorLeistung">
                    {props.modulState[index].vorLeistung && <WarningAmberIcon/>}
                </div>
            </OverlayTrigger>

        return obj
    }

    function getModul(): JSX.Element{

        let i = getIndex()

        if(i != null){

            return(

                <div className="modulHolder" id={"modulHolder"+props.semesterId+":"+props.holderId} draggable>
                {/*<div id={(props.id)} key={props.id} className={getClasses()} draggable={!props.bestanden} onDragStart={(event) => onDragStart(event)} onDragEnd={(event) => onDragEnd(event)}>*/}
                    <p className="name mediumFont">{props.modulState[i].name}</p>
                    <div className="modulInfos">
                        <p className="id smallFont"> - {props.modulState[i].id}</p>
                        <p className="lp smallFont"> - {props.modulState[i].lp}LP </p>
                        <p className="angebot smallFont"> - {props.modulState[i].angebot}</p>
                    </div>
                    {getEmpfSem(i)}
                    <div className="modulVorInfos">
                        {props.modulState[i].vorModuleInhalt[0] != "" && getVorModsInhalt(i)}
                        {props.modulState[i].vorModuleFormal[0] != "" && getVorModsFormal(i)}
                        {props.modulState[i].minPunkte > 0 && getMinLp(i)}
                    </div>
                    <div className="modulButtons">
                        <div className="infoButton" onClick={() => props.modulState[i!].showInfo(props.modulState[i!])}>
                            <InfoOutlinedIcon className="infoButton icon"/>
                        </div>
                        <div id={getDoneButtonID(i)} className="doneButton" onClick={() => props.modulState[i!].modulDone(props.modulState[i!])}>
                            {!props.modulState[i].bestanden &&<DoneIcon className="doneButton icon"/>}
                            {props.modulState[i].bestanden && <CloseOutlinedIcon className="doneButton icon"/>}
                        </div>
                        {getTooltip(i)}
                    </div> 
                </div>
            )
        }
        else{

            return(

                <div className="modulHolder" id={"modulHolder"+props.semesterId+":"+props.holderId}/>
            )
        }
    }

    

    return(
        <div className={getClasses()} key={props.holderId} 
        onDragStart={(event) => onDragStart(event)}
        //onDrop={(event) => onDrop(event)}
        onDragEnd={(event) => onDragEnd(event)}
        //onDragOver={onDragOver} 
        >
            {
            getModul()
            }
        </div>
    )
}