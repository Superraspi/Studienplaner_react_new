import React, {useState} from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { modulProps } from "./modul"

export interface popupProps{

  show: boolean,
  showInfo:(bool: boolean) => void,
  information: popupText
}


//defines the single text porps
export interface popupText{

  headline: JSX.Element 
  //modulProps: modulProps

  additionalText: JSX.Element

}


function Popup(props: popupProps) {

/*
  //gets a input text as string and breaks it by letter \n
  //returns jsx elems
  function getBreakedText(): JSX.Element{
    
    const words: string[] = props.information.additionalText.split(" ")


    let lineArray: string[] = []
    let lineArrayIndex: number = 0    

    for(let i = 0; i < words.length; i++){

      //add line breaker
      if(words[i] == "\n"){

        lineArrayIndex++
        continue
      }
      if(lineArray[lineArrayIndex] == undefined){
        lineArray[lineArrayIndex] = words[i] + " "
      }
      else{
        lineArray[lineArrayIndex] += words[i] + " "
      }
    }
    
    let resArr: JSX.Element[] = []

    for(let i = 0; i < lineArray.length; i++){

      resArr.push(<a key={"1440"+i}>{lineArray[i]}</a>)
      resArr.push(<br key={"1450"+i}/>)
      
    }
    
    let res: JSX.Element = <p>{resArr}</p>
    return res 
  }
*/
  
  return (
    <>

      <Modal className="modal" show={props.show} onHide={() => props.showInfo(false)} centered>
        <Modal.Header>
          <Modal.Title>{props.information.headline}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.information.additionalText}</Modal.Body>
        <Modal.Footer>
          <Button className="button" onClick={() => props.showInfo(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;