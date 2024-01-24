import React, { useState } from "react"
import { modulProps } from "./modul"
import { ModulKatalog, SpacerText } from "../messages"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { lastSpacerIndex } from "../App"


export interface spacerProps{

    //id -> requiered as there are multiple spacers 
    id: number
    //function to hide and show the modules when clicked
    hideModules:(spacerIndex: number, isOpen: boolean) => void
    //the index number --> every modul has a spacerIndex in their prop
    //so this links the spacer with the corresponding modules
    spacerIndex: number
    //show the spacer itself
    show: boolean
    //show message if spacer is empty
    //if null then show no message
    showFalseMessage: string | null
    childSpacer: spacerProps[] | null

    //content text
    title: string

    minPoints: number | null
    maxPoints: number
    points: number

    //show modules of spacer
    isOpen: boolean

    //should modules in the spacer be colored
    modsColored: boolean
}

export default function Spacer(props: spacerProps){

    const spacerID: number = 600

    function getUniqueID(){

        return spacerID + props.id
    }

    function getClasses(): string{

        return "spacer " + props.id.toString()
    }

    function getContent(): JSX.Element{

        //props.show == show spacer
        if(props.showFalseMessage != null && !props.show){
            return <span>{props.showFalseMessage}</span>
        }
        else{

            return (
            <div className="spacerOverview">
                <span className="bigFont">{props.title}</span>
                <p className="mediumFont">{getCompleteLpString()}</p>
                <div id={"spacerIcon wrapper " + props.id} className="spacerIcon wrapper"><KeyboardArrowDownIcon className="spacerIcon icon"/></div>
                
            </div>
            )
        }

        function getCompleteLpString(): string{

            if(props.maxPoints == 0){

                //unique for passed spacer
                if(props.title == SpacerText.bestandeTitle1){

                    //bestanden spacer gibt einfach akuelle punkte 
                    return props.points.toString() + " LP"
                }

                // keine LP zugelassen
                return SpacerText.spacerZeroMaxPoints
            }
            else{

                if(props.minPoints == null){

                    // 0/6LP
                    return props.points + "/" + props.maxPoints + " LP"
                }
                
                else{
                    // 0/6-12LP
                    return props.points + "/" + props.minPoints + "-" + props.maxPoints + " LP"
                }
            }
        }
    }

    //spacer clicked
    function clicked():void {


        //invert the var 
        props.isOpen = !props.isOpen



        //<--- All only for animation ---> 

        //update the arrow icon (animation)
        let elem = document.getElementById("spacerIcon wrapper " + props.id)

        //update the modulWrapper (animation)
        let elem2 = document.getElementById("modulWrapper " + props.id)
        


        if(elem != undefined && elem2 != undefined){

            //get index of curr modul wrapper elem
            let indexOfElem2: number = parseInt(elem2.id.split(" ")[1])

            if(props.isOpen){

                elem.classList.remove("up")
                elem.classList.add("down")

                //is last spacer
                //dont remove wapper div 
                if(indexOfElem2 == lastSpacerIndex){

                    elem2.classList.remove("despawn")
                }
                else{

                    elem2.classList.remove("despawnComplete")
                }
                
                elem2.classList.add("spawn")
            }
            else{

                elem.classList.remove("down")
                elem.classList.add("up")

                elem2.classList.remove("spawn")


                //is last spacer
                if(indexOfElem2 == lastSpacerIndex){

                    elem2.classList.add("despawn")
                }
                else{

                    elem2.classList.add("despawnComplete")
                }
            }
        }




        


        
        //ckeck for child spacers
        if(props.childSpacer == null){
            props.hideModules(props.spacerIndex, props.isOpen)
        }
        //if spacer is super spacer
        //--> has children, then all children should hide with their modules
        else{
            for(let i = 0; i < props.childSpacer.length; i++){

                props.childSpacer[i].hideModules(props.childSpacer[i].spacerIndex, props.isOpen)
                props.childSpacer[i].show = !props.childSpacer[i].show
            }
        }
    }

    return(
        <div id={getClasses()} className={getClasses()} key={getUniqueID()} onClick={() => clicked()}>
             {getContent()}
        </div>
    )
}
