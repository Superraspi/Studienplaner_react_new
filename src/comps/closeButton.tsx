import React from "react"
import CloseIcon from '@mui/icons-material/Close'


export interface closeButtonProps{

    close:() => void
}

export function CloseButton(props: closeButtonProps): JSX.Element{



    return(
        <button className="closeButton" onClick={props.close}>
            <CloseIcon className="closeButton icon"/>
        </button>
    )
}