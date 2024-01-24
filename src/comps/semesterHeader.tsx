import React from "react"

export interface semesterHeaderProps{

    semesterType: string,
    year: number,
    secondYear: number | null
}

//this function retuns the JSX dropHeader element
//which shows the current and folloying semester
export default function SemesterHeader(props: semesterHeaderProps){

    const text = (): string => {

        let result = props.semesterType + props.year

        if(props.secondYear != null){

            result += "/" + props.secondYear
        }

        return result
    }


    return(

        <div className="semesterHeader">
            <p className="semesterHeaderText">{text()}</p>
        </div>
    )
}