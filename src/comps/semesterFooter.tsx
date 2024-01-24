import React from "react"
import { modulProps } from "./modul"


export interface semsterFooterProps{

    stateArray: modulProps[],
    semesterNumber: number
}


//shows LP unter each semester
export default function SemesterFooter(props: semsterFooterProps){


    function getExpression():string{

        let points: number = 0
        
        const count: number = props.stateArray.length
        const index: number = props.semesterNumber
    

        for(let i = 0; i < count; i++){

            //if modul is in same semester as this footer --> add points
            if(props.stateArray[i].semester === index){

                points += props.stateArray[i].lp
            }
        }
        return points + "LP"
    }


    return(
        <div className="semesterFooter">
            <p className="footerLp">{getExpression()}</p>
        </div>
    )

}