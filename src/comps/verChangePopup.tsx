import React, { useEffect, useState } from "react"
import { Button, CloseButton, Modal } from "react-bootstrap";
import { closeButtonProps } from "./closeButton";
import { modulProps } from "./modul";
import { vertiefung } from "./dropDownVertiefung";
import { KonfliktModule } from "../messages";

export interface verChangePopup{

    show: boolean
    newVer: vertiefung
    callbackWhenDone: (newVer: vertiefung, modID: string, type: string, simpleList: boolean, allMods?: modulProps[]) => void

    //der nutzer soll sich entscheiden ob er einzelne oder alle module
    //als zusatzleistung markieren oder in den scroller zurücksetzen soll
    //es gibt zwei arten von listen mit modulen
    //1. eine einfache liste, mit den jeweiligen modulen, davon brauchen wir nier mehr als eine 
    //2. eine n von m module liste, also zb. 3 von 5 dieser module müssen zurückgesetzt werden

    //die zweite variante ist von der datenstruktur sehr aufwendig

    //1. variante
    simpleListOfConflictedMods: modulProps[]
    //2. variante
    complexListOfConflictedMods: complexConflictListProps[]
}

export interface complexConflictListProps{

    listOfConflictedMods: modulProps[]
    //how many lp need to be resettet (way to set how many mods at least need to be resettet)
    minLpToBeReset: number 
}

export function VerChangePopup(props: verChangePopup){


    //gets the simple list of conflicted mods after ver has changed as JSX elems
    function getSimpleList(): JSX.Element {

        //fill from the props interface passed
        let result: JSX.Element[] = []

        if(props.simpleListOfConflictedMods.length > 0){

            result.push(
                <p key={"1240"} className="bigFont">{countSimpleList() + KonfliktModule.konfliktSimpleTitle}</p>
            )
        }
        

        for(let i = 0; i < props.simpleListOfConflictedMods.length; i++){

            const elem: JSX.Element = 
            <div key={"120" + i} className="conflictedMod">
                <p key={"121" + i} className="conflictedModText mediumFont">{props.simpleListOfConflictedMods[i].name}</p>
                <p key={"124" + i} className="conflictedModLP mediumFont">{props.simpleListOfConflictedMods[i].lp + "LP"}</p>
                <button key={"122" + i} className="conflictedModButton reset smallFont" onClick={() => props.callbackWhenDone(props.newVer, props.simpleListOfConflictedMods[i].id, "reset", true)}>Zurücksetzen</button>
                <button key={"123" + i} className="conflictedModButton free smallFont" onClick={() => props.callbackWhenDone(props.newVer, props.simpleListOfConflictedMods[i].id, "voluntary", true)}>Freiwillige Zusatzleistung</button>
            </div>
            result.push(elem)
        }

        const wrapper = <div className="simpleList">{result}</div>

        return wrapper
    }

    function countSimpleList(): string {

        return props.simpleListOfConflictedMods.length.toString() + " "
    }

    function getComplexList(): JSX.Element[] {

        let result: JSX.Element[] = []


        //outer loop through the single complex lists
        for(let i = 0; i < props.complexListOfConflictedMods.length; i++){

            const complexListMods: modulProps[] = props.complexListOfConflictedMods[i].listOfConflictedMods
            const lp: number = props.complexListOfConflictedMods[i].minLpToBeReset

            let innerElem: JSX.Element[] = []

            //inner loop through mods
            for(let j = 0; j < complexListMods.length; j++){

                innerElem .push(
                <div key={"135" + j} className="conflictedMod">
                    <p key={"136" + j} className="conflictedModText mediumFont">{complexListMods[j].name}</p>
                    <p key={"139" + i} className="conflictedModLP mediumFont">{props.complexListOfConflictedMods[i].listOfConflictedMods[j].lp + "LP"}</p>
                    <button key={"137" + j} className="conflictedModButton reset smallFont" onClick={() => 
                        props.callbackWhenDone(props.newVer, complexListMods[j].id, "reset", false)}>Zurücksetzen</button>
                    <button key={"138" + j} className="conflictedModButton free smallFont" onClick={() => 
                        props.callbackWhenDone(props.newVer, complexListMods[j].id, "voluntary", false)}>Freiwillige Zusatzleistung</button>
                </div>)
            
            }


             result.push( 
            <div key={"130" + i} className="complexList">
                <p key={"131" + i} className="bigFont">{lp + KonfliktModule.konfliktComplexTitle}</p>
                <div className="complexListWrapper">
                    {innerElem}
                </div>
            </div>)
        }    
        return result 
    }

    //is only for the reset all button
    function getAllMods(): modulProps[] {

        const simpleMods: modulProps[] = props.simpleListOfConflictedMods
        const complexLists: complexConflictListProps[] = props.complexListOfConflictedMods

        //get complex mods
        let complesMods: modulProps[] = []

        for(let i = 0; i < complexLists.length; i++){

            for(let j = 0; j < complexLists[i].listOfConflictedMods.length; j++){

                complesMods.push(complexLists[i].listOfConflictedMods[j])
            }
        }

        //result obj
        let allMods: modulProps[] = []

        //loop through simple list
        for(let i = 0; simpleMods.length; i++){

            allMods.push(simpleMods[i])
        }

        for(let i = 0; i < complesMods.length; i++){

            allMods.push(complesMods[i])
        }
        return allMods
    }


    return (
        <Modal dialogClassName="conflictedModsModal" className="modal modalWrapper" show={props.show}>
            <Modal.Header className="modalHeader">
                <Modal.Title className="modalTitle">{KonfliktModule.konfliktPopupTitle}</Modal.Title>
                  
            </Modal.Header>
            
            <Modal.Body className="modalBody verChangeModalBody"> 
                {getSimpleList()}   
                {getComplexList()}
            </Modal.Body>
            <Modal.Footer className="modalFooter">

                <button className="button" onClick={() => props.callbackWhenDone(props.newVer, "", "abort", true)}>{KonfliktModule.konfliktAbortButton}</button>
                <button className="button bk2" onClick={() => props.callbackWhenDone(props.newVer, "", "resetAll", true, getAllMods())}>{KonfliktModule.konfliktResetAllButton}</button>
            </Modal.Footer>
            
      </Modal>
      );
}