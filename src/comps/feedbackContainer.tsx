import React, { SyntheticEvent, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { CloseButton, closeButtonProps } from "./closeButton"
import { FeedbackStatus } from "../messages"


export interface feedbackContainerProps{

    show: boolean
    showFeedback: (bool: boolean) => void
    setStatus: (status: string) => void
}

export default function FeedbackContainer(props: feedbackContainerProps){

    const maxLength: number = 256
    const [letters, setLetters] = useState<number>(0)

    const handleClose = () => props.showFeedback(false)
    const handleShow = () => props.showFeedback(true)

    async function submit(e: any): Promise<any>{

        //prevent browser from reloading the page
        e.preventDefault()

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        //anti injection
        const formJson = Object.fromEntries(formData.entries());
        const formJsonLength: number = formJson.postContent.toString().length

        //too long
        if(formJsonLength > maxLength){
            setLetters(formJsonLength)
            handleClose()
            props.setStatus(FeedbackStatus.tooLong)
            return
        }
        
        // You can pass formData as a fetch body directly:
        const response = await fetch('http://localhost:8000/database/submitFeedback.php', { method: form.method, body: formData });
        await response.json().then(
            function(value){props.setStatus(FeedbackStatus.success)},
            function(error){props.setStatus(FeedbackStatus.error);console.log(error)}
        )

        handleClose()
        
    }

    const closeProps: closeButtonProps = {

        close: handleClose
    }

    function getCounterClasses(): string{

        if(letters > maxLength){
            return "letterCount modalFooter red"
        }
        return "letterCount modalFooter"
    }

    const dm: string = "Enter Feedback here..."
    const [text, setText] = useState<string>("")
    const [wasBackspace, setBackspace] = useState<boolean>(false)
    useEffect(() => {

        if(text == "" && !wasBackspace){
            setText(dm)
            setLetters(0)
        }
    },[text])
    const validKeys: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.,;:"
    function keyDown(e: any){

        

        if(e.ctrlKey || e.altKey)return
        if(e.key.length > 1){

            
            if(e.key == "Backspace" && text == dm){
                setBackspace(true)
                setLetters(0)
                setText("")
            }
            //text is marked
            else if(e.key == "Backspace" && getSelectedText().length > 0){

                //set only remaining
                const elem = document.querySelector(".feedbackContainer") as HTMLTextAreaElement
                const rem: string = elem.value.replace(getSelectedText(),"")
                const len: number = rem.length
                setBackspace(true)
                setText(rem)
                setLetters(len)

            }
            else if(e.key == "Backspace"){
                setBackspace(true)
                
                if(text.length > 0){
                    setLetters(text.length - 1)
                }
                else{
                    setLetters(0)
                }
                setText(text.slice(0, text.length-1))
            }
            return
        }
        setBackspace(false)

        if(text == dm){
            setText(e.key)
            setLetters(1)
        }    
        else{

            setLetters(text.length + 1)
            setText(text + e.key)
        }
    }

    //returns the selected (marked) text of the feedback textarea
    function getSelectedText(): string{

        const elem = document.querySelector(".feedbackContainer") as HTMLTextAreaElement
        
        const start = elem.selectionStart
        const end = elem.selectionEnd

        return elem.value.substring(start, end)
    }

    //because is needed 
    function crimeaRiver(){}


    return(

        <Modal className="modal modalWrapper" show={props.show} onHide={handleClose}>
            <Modal.Header className="modalHeader">
                <Modal.Title className="modalTitle">Feedback</Modal.Title>
                <CloseButton {...closeProps}/>
            </Modal.Header>
            <form method="post" onSubmit={submit}>
            <Modal.Body className="modalBody">
                <textarea className="feedbackContainer" name="postContent" value={text} onKeyDown={keyDown} onChange={crimeaRiver} autoFocus/> 
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <button className="button submit modalFooter">Submit</button>
                <span className={getCounterClasses()}>{letters} / {maxLength} Buchstaben</span>
            </Modal.Footer>
            </form>
      </Modal>
    )
}