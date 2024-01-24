import React, {useState} from "react"
import { Dropdown } from "react-bootstrap"


export interface dropDownPropsSort{

    id: number,
    type: string,
    options: string[],
    //fires when option is clicked
    trigger:(chosen: string) => boolean
}



export default function DropDownVertiefung(props: dropDownPropsSort){

    const [state, setState] = useState<string>(props.type)

    function update(option: string){

        //update the state (what is shown in the dropdown)
        setState(option)
        //trigger to the app comp (actual function)
        props.trigger(option)
    }

    return(
        
        <Dropdown>

            <Dropdown.Toggle id={props.type} className="dropDownWrapper override">
                

                {state}

            </Dropdown.Toggle>

            <Dropdown.Menu className="dropDownMenu">
                {
                    props.options.map((option) => 
                    
                    <Dropdown.Item as="button" onClick={() => update(option)} key={option}>{option}</Dropdown.Item>
                    )
                }
                
            </Dropdown.Menu>

        </Dropdown>
    )
}