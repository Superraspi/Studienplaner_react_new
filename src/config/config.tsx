import React from "react"
import {getComputerScienceBSCSpacerVotedMods, getComputerScienceBSCSpacers, getComputerScienceBSCSpacersPoints, getComputerScienceBSCVertiefungsInfoText, getComputerScieneceBSCSpacerIndex, informatikBSCName, informatikBSCSeperateTypes, updateComputerScienceBSCSpacer} from "./informatik_bsc"
import {getComputerScienceMSCSpacerVotedMods, getComputerScienceMSCSpacers, getComputerScienceMSCSpacersPoints, getComputerScienceMSCVertiefungsInfoText, getComputerScieneceMSCSpacerIndex, informatikMSCName, informatikMSCSeperateTypes, updateComputerScienceMSCSpacer} from "./informatik_msc"
import { modulProps } from "../comps/modul"
import { spacerProps } from "../comps/spacer"
import { vertiefung } from "../comps/dropDownVertiefung"
import { SpacerText } from "../messages"
import { studiengang } from "../comps/dropDownStudiengaenge"



//later this config will decide based on the chosen studiengang, what specific context will be provided


export interface updateSpacerProps{

    modulArray: modulProps[]
    vertiefung: vertiefung
    spacerArray: spacerProps[]
    studiengang: studiengang
}

export interface initSpacerArrayProps{

    hideModules:(spacerIndex: number, isOpen: boolean) => void
    chosenVertiefung: vertiefung
    studiengang: studiengang
}

//returns the name
//e.g. "Informatik. B.Sc."
export const getStudiengangName = (studiengang: studiengang):string => {
    
    switch(studiengang.name){

        case informatikBSCName: return informatikBSCName
        case informatikMSCName: return informatikMSCName
        default: return "Unbekannter Studiengang"
    } 
}

//so the app knows how to seperate the different type
//(pflicht; einf; VS,CISS,ES,MI; prakt)
export const getSeperateTypes = (studiengang: studiengang):string[] => {
    
    switch(studiengang.name){

        case informatikBSCName: return informatikBSCSeperateTypes
        case informatikMSCName: return informatikMSCSeperateTypes
        default: return ["Unbekannter Studiengang"]
    }
}


export function getSpacerIndex(studiengang: studiengang, type: string, vertiefung: vertiefung, pflichtIn: string[] | null):number{

    switch(studiengang.name){

        case informatikBSCName: return getComputerScieneceBSCSpacerIndex(type, vertiefung, pflichtIn)
        case informatikMSCName: return getComputerScieneceMSCSpacerIndex(type, vertiefung, pflichtIn)
        default: return -1
    }
    
}
export function getSpacerArray(props: initSpacerArrayProps): spacerProps[]{

    let result: spacerProps[] = []

    switch(props.studiengang.name){

        case informatikBSCName: {result = getComputerScienceBSCSpacers(props)
        break
        }
        case informatikMSCName: {result = getComputerScienceMSCSpacers(props)
        break
        }
    }
    
    //get the specif spacer props from computer science 
    
    //add the bestanden spacer to as the last element
    //we need to tell the app to place the bestanden marked mods under this spacer
    //we do this in the modulscroller component
    const bestandenSpacer: spacerProps = {

        //is always the last spacer
        id: result.length,
        hideModules: props.hideModules,
        spacerIndex: result.length,
        show: true,
        showFalseMessage: null,
        childSpacer: null,
        title: SpacerText.bestandeTitle1,
        minPoints: null,
        maxPoints: 0,
        points: 0,
        isOpen: true,
        modsColored: false
    }
    result.push(bestandenSpacer)

    return result
}

export function getSpacerPoints(props: updateSpacerProps): number[]{

    switch(props.studiengang.name){

        case informatikBSCName: return getComputerScienceBSCSpacersPoints(props)
        case informatikMSCName: return getComputerScienceMSCSpacersPoints(props)
        default: return [-1]
    }
}

export function getSpacerVotedMods(props: updateSpacerProps): modulProps[][]{

    switch(props.studiengang.name){

        case informatikBSCName: return getComputerScienceBSCSpacerVotedMods(props)
        case informatikMSCName: return getComputerScienceMSCSpacerVotedMods(props)
        default: return []
    }
}

export function getVertiefungsInfoText(studiengang: studiengang): JSX.Element[]{

    switch(studiengang.name){

        case informatikBSCName: return getComputerScienceBSCVertiefungsInfoText()
        case informatikMSCName: return getComputerScienceMSCVertiefungsInfoText()
        default: return [<span className="mediumFont">Unbekannter Studiengang</span>]
    }
    
}