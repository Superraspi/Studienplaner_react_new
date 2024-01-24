import React, {useState} from "react"
import { Dropdown } from "react-bootstrap"


export interface dropDownPropsSemester{

    id: number,
    
    semester: number[],

    initialState: number,
    //fires when option is clicked
    trigger:(semester: number) => void
}



export default function DropDownSemester(props: dropDownPropsSemester){


    const [state, setState] = useState<string>(props.initialState.toString() + " Semester")

    function update(option: number){

        //update the state (what is shown in the dropdown)
        setState(option.toString() + " Semester")
        //trigger to the app comp (actual function)
        props.trigger(option)
    }


    return(
        
        <Dropdown>

            <Dropdown.Toggle id={props.id.toString()} className="dropDownWrapper override">
                

                {state}

            </Dropdown.Toggle>

            <Dropdown.Menu className="dropDownMenu">
                {
                    props.semester.map((option) => 
                    
                    <Dropdown.Item as="button" onClick={() => update(option)} key={option}>{option}</Dropdown.Item>
                    )
                }
                
            </Dropdown.Menu>

        </Dropdown>
    )
}