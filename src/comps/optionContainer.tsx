import React, { useEffect, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import { CloseButton, closeButtonProps } from "./closeButton"
import { extractNumbers, getCSSVar, setCSSVar, updateSemesterHeight } from "../utility"
import { getStatusTextBlendOutTime } from "../options"


export interface optionContainerProps{

    show: boolean
    holderCount: number
    showOptions: (bool: boolean) => void
    setHolderDifferentSize:(bool: boolean) => void
    setShowEmpfSem:(bool: boolean) => void
    toggleStatusAutoBlendOut: (bool: boolean) => void
    toggleShowInhaltVorWarningPopup: (bool: boolean) => void
}

var checkBoxHolderDifSize: boolean = false
var checkBoxEmpfSem: boolean = false
var checkBoxStatusAutoBlendOut: boolean = true
var checkBoxShowInhaltVorWarning: boolean = true

export default function OptionContainer(props: optionContainerProps){

    const handleClose = () => props.showOptions(false)
    const handleShow = () => props.showOptions(true)

    //saves the holder cell resizer option value
    const [cellSizePercent, setCellSizePercent] = useState<number>(50)

    useEffect(() => {

        setCellSizePercent(getCellSizePercent())
    },[])

    useEffect(() => {

        //console.log(cellSizePercent)
    },[cellSizePercent])

    const closeProps: closeButtonProps = {

        close: handleClose
    }
    
    function setHolderDifferentSize(event: React.ChangeEvent<HTMLInputElement>): void{

        //get the checkbox value
        let bool: boolean = event.target.checked

        //set the value
        props.setHolderDifferentSize(bool)
        checkBoxHolderDifSize = bool
    }
/*
    function showEmpfSem(event: React.ChangeEvent<HTMLInputElement>): void{

        const bool: boolean = event.target.checked
        props.setShowEmpfSem(bool)
        checkBoxEmpfSem = bool
    }
*/ 
    //Change the Drop Panel Cell Size
    function changeCellSize(event: React.ChangeEvent<HTMLInputElement>){

        //from 1 to 100
        const value = parseInt(event.target.value)
        
        changeCellSizeValue(value)
    }

    function changeCellSizeValue(value: number): void{

        //lower intervall border
        const minRem: number = 10
        //upper border
        const maxRem: number = 15

        //calculate new rem value
        const cellSize: string = minRem + (0.05 * value) + "rem"


        setCellSizePercent(value)
        //const cellSize: string = ((parseInt(event.target.value) / 100) * 24) + "rem" 
        setCSSVar("--holder-min-width", cellSize)

        updateSemesterHeight(props.holderCount)
    }

    function getCellSizePercent(): number{

        //get the holder min width
        const cellSize = extractNumbers(getCSSVar("--holder-min-width"))

        if(cellSize == null)return 0


        const value: number = (cellSize - 10) / 0.05

        //set default to 50 if value exeeds limit 
        if(value < 0 || value > 100){

            changeCellSizeValue(50)
            return 50
        }

        return value
    }

    //Change the Statustext auto blend out time
    function toggleStatusAutoBlendOut(event: React.ChangeEvent<HTMLInputElement>){

        checkBoxStatusAutoBlendOut = !checkBoxStatusAutoBlendOut
        props.toggleStatusAutoBlendOut(event.target.checked)
    }

    //toggle if app should show a warning popup if modul has not fullfilled all content relational mods
    function toggleShowInhaltVorWarningPopup(event: React.ChangeEvent<HTMLInputElement>){

        checkBoxShowInhaltVorWarning = !checkBoxShowInhaltVorWarning
        props.toggleShowInhaltVorWarningPopup(event.target.checked)
    }

    return(

        <Modal className="modal modalWrapper" show={props.show} onHide={handleClose}>
            <Modal.Header className="modalHeader">
                <Modal.Title className="modalTitle capitalFont">Optionen</Modal.Title>
                <CloseButton {...closeProps}/>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <div className="optionsContainer">
                    <div className="optionsSection Modul">
                        
                        
                    </div>
                    {/*<div className="optionsSection Scroller"></div>*/}
                    <div className="optionsSection DropPanel">
                        <Form.Label className="optionsSectionLabel bigFont">Drop-Paneleinstellungen</Form.Label>
                        <div className="optionsSectionWrapper">
                            <span className="optionsSectionOption mediumFont">Zellgröße</span>
                            <div className="optionsWrapper">
                                <Form.Range value={cellSizePercent} onChange={(event) => changeCellSize(event)}/>
                                <span className="optionsSectionOption">{/*cellSizePercent + "%"*/}</span>
                            </div>    
                            <div className="optionsWrapper">
                                <Form.Check className="optionsSectionCheck" type="checkbox" checked={checkBoxHolderDifSize} onChange={(event) => setHolderDifferentSize(event)}></Form.Check>
                                <span className="optionsSectionOption mediumFont">Zellgröße LP abhängig</span>
                            </div>
                            <div className="optionsWrapper">
                                <Form.Check className="optionsSectionCheck" type="checkbox" checked={checkBoxShowInhaltVorWarning} onChange={(event) => toggleShowInhaltVorWarningPopup(event)}></Form.Check>
                                <span className="optionsSectionOption mediumFont">Zeige Warnung bei unerfüllten inhaltlichen Voraussetzungen</span>
                            </div>
                        </div>
                    </div>
                    <div className="optionsSection Status">
                        <Form.Label className="optionsSectionLabel bigFont">Statuseinstellungen</Form.Label>
                        <div className="optionsSectionWrapper">
                        
                            <div className="optionsWrapper">
                                <Form.Check className="optionsSectionCheck" type="checkbox" checked={checkBoxStatusAutoBlendOut} onChange={(event) => toggleStatusAutoBlendOut(event)}></Form.Check>
                                <span className="optionsSectionOption mediumFont">Status automatisch ausblenden</span>
                            </div>
                        </div>
                        <div className="optionsSectionWrapper">
                        </div>
                    </div>
                </div>
            </Modal.Body>
      </Modal>
    )
}




/*

                        <Form.Label className="optionsSectionLabel bigFont">Scrollereinstellungen</Form.Label>
                        <div className="optionsSectionWrapper">
                            <span className="optionsSectionOption mediumFont">Zeige: </span>
/*                           <div className="optionsWrapper">
                                <Form.Check className="optionsSectionCheck" type="checkbox" checked={checkBoxEmpfSem} onChange={(event) => showEmpfSem(event)}/>
                                <span className="optionsSectionOption mediumFont">Empfohlenes Semester anzeigen</span>
                            </div> 
                        </div>
*/