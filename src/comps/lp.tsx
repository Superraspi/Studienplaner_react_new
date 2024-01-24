import React from "react"
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone'
import { ProgressBar } from "react-bootstrap"


export interface lpProps{

    lpContent: number
    show: boolean
}

export default function Lp(props: lpProps){

    const lp: string = " LP"
    const text: string = "Erfolgreich abgeschlossen"

    //calculate percent
    const progessPercent: number = Math.round((props.lpContent / 180 * 100) % 100)
    

    

    return(
        <div className="lpWrapper">
            <p className="lpText">{props.lpContent}/180 LP</p>
            <div className="progressBarWrapper">
                <ProgressBar className="progressBarLP" now={progessPercent} label={`${progessPercent}%`}/>
            </div>
            <div className="complete">
                {props.show && text && <FileDownloadDoneIcon className="complete icon"/>}
                </div>
        </div>
    )
}