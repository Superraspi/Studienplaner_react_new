import React, {useState} from "react"
import { Dropdown } from "react-bootstrap"


export interface dropDownPropsVertiefung{

    id: number,
    //CISS /VC
    options: vertiefung[],
    //intital e.g. "Prim.." then what option is chosen
    state: vertiefung,
    //fires when option is clicked
    trigger:(chosen: vertiefung) => void
}

export interface vertiefung{

    kurz: string,
    lang: string
}


export default function DropDownVertiefung(props: dropDownPropsVertiefung){


    return(
        
        <Dropdown>

            <Dropdown.Toggle id={props.id.toString()} className="dropDownWrapper override">
                

                {props.state.lang}

            </Dropdown.Toggle>

            <Dropdown.Menu className="dropDownMenu">
                {
                    props.options.map((option) => 
                    
                    <Dropdown.Item as="button" onClick={() => props.trigger(option)} key={option.kurz}>{option.lang}</Dropdown.Item>
                    )
                }
                
            </Dropdown.Menu>

        </Dropdown>
    )
}