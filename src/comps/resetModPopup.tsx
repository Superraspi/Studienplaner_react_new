import React, {useState} from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { desiredModulVoting, modulProps } from "./modul"
import { popupText } from "./popup"
import { ResetVorModule } from "../messages"
import { Form } from "react-bootstrap"



export interface resetModPopupProps{

  show: boolean
  
  //modul das zurück gesetzt werden soll
  inputMod: modulProps
  //davon formal abhängige
  formalMods: modulProps[]
  //davon inhaltlich abhängige 
  inhaltMods: modulProps[]

  //übergibt leeren array wenn keine module resettet werden sollen
  callBack:(modsToBeResettet: modulProps[]) => void
}

//popup with ok or abort option
function ResetModPopup(props: resetModPopupProps) {


    function getBody(): JSX.Element{

        return(
            getInhaltVorModsBox()
        )
    }

    function getInhaltVorModsBox(): JSX.Element{

        let inhaltVorModBars: JSX.Element[] = []

        for(let i = 0; i < props.inhaltMods.length; i++){

            inhaltVorModBars.push(getModResetBar(props.inhaltMods[i], false))
        }

        return(
            <div className="resetModBox">
                <span className="mediumFont">{ResetVorModule.inhaltModsText1}</span>
                <div className="resetModBoxList">
                    <div className="resetModBoxListHeader">
                        <span className="smallFont">{ResetVorModule.name}</span>
                        <span className="smallFont">{ResetVorModule.reset}</span>
                    </div>
                    <div className="resetModBoxListBody">
                        {inhaltVorModBars}
                    </div>
                </div>  
            </div>
        )
    }

    //returns a single bar with mod and reset or not button
    //formal checkbox already checked and disabled 
    function getModResetBar(mod: modulProps, isFormal: boolean): JSX.Element{

        const getCheckbox = (text: string): JSX.Element => {

            const formalCheckbox: JSX.Element = <Form.Check id={"resetCheckbox-"+mod.id} className="resetModCheckbox checkbox optionsSectionCheck" type="checkbox" disabled checked></Form.Check>
            const inhaltCheckbox: JSX.Element = <Form.Check id={"resetCheckbox-"+mod.id} className="resetModCheckbox checkbox optionsSectionCheck" type="checkbox"></Form.Check>

            return isFormal ? formalCheckbox : inhaltCheckbox
        }

        return(
            <div key={12346542+mod.id} id={"resetModBar"+mod.id} className="resetModBar">
                <span className="smallFont resetModBarText">{mod.name}</span>
                {getCheckbox(mod.name)}
            </div>
        )
    }

    function abort(): void{

        props.callBack([])
    }

    function reset(): void{

      //get all reset mods
      const allCheckboxes: NodeListOf<Element> = document.querySelectorAll(".resetModCheckbox")
      
      console.log(allCheckboxes)
    }
  
  return (
    <>

      <Modal className="modal" show={props.show} /*onHide={() => props.showInfo(false)}*/ centered>
        <Modal.Header>
          <Modal.Title>{ResetVorModule.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getBody()}</Modal.Body>
        <Modal.Footer className="modalFooter">
        <Button className="button background1 override" onClick={() => reset()}>
            {ResetVorModule.reset}
          </Button>
          <Button className="button" onClick={() => abort()}>
            {ResetVorModule.abbrechen}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetModPopup;