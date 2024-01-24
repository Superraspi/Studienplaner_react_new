import React, { Children, Ref, useEffect, useRef, useState } from "react"
import Holder, { holderProps } from "./holder"
import Semester from "./semester"
import { modulProps } from "./modul"
import { semesterProps } from "./semester"
import SemesterHeader, { semesterHeaderProps } from "./semesterHeader"
import SemesterFooter, { semsterFooterProps } from "./semesterFooter"


export interface dropTableProps{

    chosenModuleArray: modulProps[]
    appendModul: (modul: modulProps ,semester: number, holder: number) => void
    onSemesterHover: (semesterNumber:number, start: boolean) => void
    setModIsCurrentlyDragges: (modulProps: modulProps | null) => void
    semesterCount: number
    holderCount: number
    setHolderDifferentSize: boolean
}


export default function DropTable(props: dropTableProps){

    


    //create Semester grid
    function getSemester(): JSX.Element[]{

        const result = []


        //loop over for the semester count --> how many semesters should be there
        for(let i = 1; i < props.semesterCount+1; i++){

            //we need to pass down information as well as the drop function to the child component
            //this is archieved via the semesterProps Interface
            //we pass the id of the semester id=1==first semester 
            //the drop function ref as well as the modulState which tells if a module is chosen
            //are then passed further to the holder Child comp also via an Interface
            //but we need to pass down for perfomance reasons only the modules that are contained 
            //inside that specific semester, for example smester 3 need only to know what modules
            //are chosen in semester 3 --> as the state array is unsorted (also performance)
            //we need to filter it by looping throught

            
            const tempSemesterProps: semesterProps = {

                id: i,
                holderCount: props.holderCount,
                onDrop: onDrop,
                onHover: props.onSemesterHover,
                setModIsCurrentlyDragges: props.setModIsCurrentlyDragges,
                modulState: props.chosenModuleArray,
                setHolderDifferentSize: props.setHolderDifferentSize
            }

            result.push(Semester(tempSemesterProps))
        }
        return result
    }

    //is fired through the holder child
    function onDrop(event: React.DragEvent, targetProps: holderProps): void{

        event.preventDefault()
        event.stopPropagation()

        const input: modulProps = JSON.parse(event.dataTransfer.getData("modul"))
        const semester: number | null = targetProps.semesterId
        const holder: number | null = targetProps.holderId
        //fires voteModul Function in App 
        props.appendModul(input, semester, holder)
    }

    
    return(
        <div className="dropSection" key={600}>

            <div className="dropTable">
                
                {getSemester()}
                
            </div>

        </div>
        
    )
}