import React, {useState} from "react"
import Modul, {modulProps} from "./modul"
import Spacer, { spacerProps } from "./spacer"
import { ResizableBox } from 'react-resizable'
import { Resizable } from 're-resizable'

export interface modulScrollerProps{

    moduleArray: modulProps[],
    dropInScroller:(event: React.DragEvent) => void,
    spacerArray: spacerProps[]
}


export default function ModulScroller(props: modulScrollerProps){


    //function gets called every time an object in the props array is changed
    //renders all the modules into the scroller

    //semester and holder both != null -> chosen
    //semester == null -> in scroller
    //holder == null -> "passed"
    function getModules(): JSX.Element[]{

        let result: JSX.Element[] = []

        //to notice when the katalog (type) changes is initialized with "Ver"
        //so as there are no modules with katalog == "Ver" there will be a spacer right at the beggining
        for(let i = 0; i < props.spacerArray.length; i++){

            if(props.spacerArray[i].show){

                //add spacer
                result.push(Spacer(props.spacerArray[i]))

                //add wrapper (contains the mods)
                const mwp: modulWrapperProps = {

                    moduleArray: props.moduleArray,
                    spacerIndex: i,
                    spacerArray: props.spacerArray
                }
                result.push(ModulWrapper(mwp))

                
            }
            else if(props.spacerArray[i].showFalseMessage != null){

                result.push(Spacer(props.spacerArray[i]))
            }            
        }        
        return result
    }

    //drop from table to scroller (unvote)
    function onDragOver(event: React.DragEvent){

        event.preventDefault()
        event.stopPropagation()
    }



    function scrollScroller(event: React.UIEvent<HTMLDivElement, UIEvent>): void{

        const elem = document.querySelector(".modulScroller") as HTMLDivElement
        elem.scrollTop += (event.nativeEvent as WheelEvent).deltaY

    }
    return(
        <div className="modulScroller" key={500} onDragOver={onDragOver} onDrop={(event) => props.dropInScroller(event)}>
            <div className="fadeTile" onWheel={(event) => scrollScroller(event)}/>
            {getModules()}
        </div>
    )
}



interface modulWrapperProps{

    moduleArray: modulProps[]
    spacerArray: spacerProps[]
    spacerIndex: number
}

//modul scroller contains spacers and modulwrappers which then contain the actual moduls
function ModulWrapper(props: modulWrapperProps): JSX.Element{



    function getMods(): JSX.Element[]{

        let result: JSX.Element[] = []

        for(let j = 0; j < props.moduleArray.length; j++){
            
            //mod is bond to spacer
            if(props.moduleArray[j].spacer == props.spacerIndex){
                result.push(Modul(props.moduleArray[j]))
            }
        }
        return result
    }

    return(

        <div id={"modulWrapper " + props.spacerIndex} className="modulWrapper" key={"keyModulWrapper " + props.spacerIndex}>
            {getMods()}
        </div>
    )
}