import React, {useState} from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { desiredModulVoting, modulProps } from "./modul"
import { popupText } from "./popup"

export enum PopupTypes{

  modulConfirmationPopup="modConfirm",
  resetInhaltVorPopup="vorInhaltReset",
  resetFormalVorPopup="vorFormalReset"

}

export interface askPopupProps{

  show: boolean
  text: popupText

  abortButtonText: string
  abort:() => void
  confirmButtonText: string
  confirm:() => void

}

//popup with ok or abort option
function AskPopup(props: askPopupProps) {

    
  
  return (
    <>

      <Modal className="modal" show={props.show} /*onHide={() => props.showInfo(false)}*/ centered>
        <Modal.Header>
          <Modal.Title>{props.text.headline}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text.additionalText}</Modal.Body>
        <Modal.Footer className="modalFooter">
        <Button className="button background1 override" onClick={() => props.confirm()}>
            {props.confirmButtonText}
          </Button>
          <Button className="button" onClick={() => props.abort()}>
            {props.abortButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AskPopup;