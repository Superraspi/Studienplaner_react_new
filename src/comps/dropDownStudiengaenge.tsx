import React, {useState} from "react"
import { Dropdown } from "react-bootstrap"


export interface dropDownPropsStudiengaenge{

    id: string
    
    studiengaenge: studiengang[]
    
    state: studiengang
    
    trigger:(option: studiengang) => void
}

export interface studiengang{

    name: string
    fpo: string
  }


export default function DropDownStudiengaenge(props: dropDownPropsStudiengaenge){

    
    const emptyStudiengang: studiengang = {

        name: "Studiengang",
        fpo: ""
    }


    const [state, setState] = useState<studiengang>(emptyStudiengang)

    function trigger(option: studiengang): void {

        props.trigger(option)

        setState(option)
    }


    return(
        
        <Dropdown>

            <Dropdown.Toggle id={props.id} className="dropDownWrapperLogin override">
                

                {state.name}

            </Dropdown.Toggle>

            <Dropdown.Menu className="dropDownMenu">
                {
                    props.studiengaenge.map((studiengang) => 
                    
                    <Dropdown.Item as="button" onClick={() => trigger(studiengang)} key={studiengang.name}>{studiengang.name}</Dropdown.Item>
                    )
                }
                
            </Dropdown.Menu>

        </Dropdown>
    )
}