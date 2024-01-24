import React, {useState} from "react"
import Holder from "./holder"
import { holderProps } from "./holder"
import { modulProps } from "./modul"
import SemesterHeader, {semesterHeaderProps} from "./semesterHeader"
import SemesterFooter, { semsterFooterProps } from "./semesterFooter"
import { getCSSVar, getHolderUnderCursor, getSemesterUnderCursor, setCSSVar } from "../utility"
import { type } from "os"

export interface semesterProps{

    id: number
    holderCount: number
    onDrop: (event: React.DragEvent, props: holderProps) => void
    //for color visual
    onHover: (semesterNumber: number, start: boolean) => void
    //workaround color tile 
    setModIsCurrentlyDragges: (modulProps: modulProps | null) => void
    modulState: modulProps[]
    setHolderDifferentSize: boolean
}



export default function Semester(props: semesterProps){


    //return Array of Holder Objects as JSX
    function getHolder(): JSX.Element[]{

        const result = []

        for(let i = 1; i < props.holderCount+1; i++){

            const tempHolderProps: holderProps = {
                
                semesterId: props.id,
                holderId: i,
                onDrop: props.onDrop,
                setModIsCurrentlyDragges: props.setModIsCurrentlyDragges,
                modulState: props.modulState,
                holderCount: props.holderCount,
                setHolderDifferentSize: props.setHolderDifferentSize
            }

            result.push(Holder(tempHolderProps))
        }
        return result
    }

    //return the header element
    function getSemesterHeader(): JSX.Element{

        const date = new Date()
        const currentYear = date.getFullYear() + props.id - 1
        const currentMonth = date.getMonth()

    

        //if the current time is beyond 7. Month (July)
        //the header starts with SS else WS
        const tempSecondYear = (): number | null=> {

            
            if(props.id % 2 == 1){

                if(currentMonth > 7){
                    return currentYear +1
                }
                else{
                    return null
                }
            }
            else{

                if(currentMonth > 7){
                    return null
                }
                else{
                    return currentYear +1
                }
            }
        }

        //returns the semsester type
        //Sommersemester or Wintersemester
        //decides if the second year variable is null or nor
        //WS22/23 -> second year == 23
        const tempSemesterType = (): string => {

            if(tempSecondYear() == null){
                return "SS"
            }
            else{
                return "WS"
            }
        }

        const tempSemesterHeaderProps: semesterHeaderProps = {

            semesterType: tempSemesterType(),
            year: currentYear,
            secondYear: tempSecondYear()
        }

        return SemesterHeader(tempSemesterHeaderProps)
    }

    //footer element to display the lp per semester
    function getSemesterFooter(): JSX.Element{

    
        const tempFooterProps: semsterFooterProps = {

            stateArray: props.modulState,
            semesterNumber: props.id
        }


        return(
            SemesterFooter(tempFooterProps)
        )
    }
    
    //used when dropped on fadetile of semester
    function onDrop(event: React.DragEvent<HTMLDivElement>): void{

        event.preventDefault()
        event.stopPropagation()

        //unMarkAllSems()

        const x = event.pageX
        const y = event.pageY

        const holderObj: number | null = getHolderUnderCursor(x,y,props.id)

        if(holderObj == null)return

        const holderProps: holderProps = {

            semesterId: props.id,
            holderId: holderObj+1,
            onDrop: props.onDrop,
            setModIsCurrentlyDragges: props.setModIsCurrentlyDragges,
            modulState: props.modulState,
            holderCount: props.holderCount,
            setHolderDifferentSize: props.setHolderDifferentSize
        }

        props.onDrop(event, holderProps)
        props.setModIsCurrentlyDragges(null)
    }

    //light semester red if unvalid
    function onDrag(event: React.DragEvent<HTMLDivElement>, bool: boolean){

        event.preventDefault()

        /*
        const sem = getSemesterUnderCursor(event.pageX, event.pageY)
        const holder = getHolderUnderCursor(event.pageX, event.pageY, props.id)

        const allSems: NodeListOf<Element> | null = document.querySelectorAll(".semester")
        if(allSems == null)return 

        //if bool == false => unmark all sems
        //if bool == true => mark cur sem
        if(!bool || sem == null){

            unMarkAllSems()
            
        }
        else{
             
            props.onHover(sem, true)
        }
        */
    }

    function unMarkAllSems(): void{

        const allSems: NodeListOf<Element> | null = document.querySelectorAll(".semester")
        for(let i = 0; i < allSems.length; i++){
    
          props.onHover(i+1, false)
        }
    }
  
    return(
        <div className="semester" key={props.id} id={"semester"+props.id}
        //onDragLeave={(event) => onDrag(event, false)}
        //onDragEnter={(event) => onDrag(event, true)}
        //onDragOver={(event) => onDrag(event, true)}
        //onDrop={(event) => onDrop(event)}
        >
       
            <div className="semesterFadeTile" id={"semesterFadeTile"+props.id} 
            onDragOver={(event) => onDrag(event, true)}
            //onDragLeave={(event) => onDrag(event, false)}
            onDrop={(event) => onDrop(event)}
            />
            
            
            {getSemesterHeader()}
            {getHolder()}
            {getSemesterFooter()}
        
            <div className="semesterUnderLayer"/>
    
        </div>
    )
}