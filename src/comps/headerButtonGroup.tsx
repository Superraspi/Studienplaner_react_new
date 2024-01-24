import React from "react"
import { Form } from "react-bootstrap"


export interface headerButtonGroupProps{

    showID: boolean
    setShowID: (value: boolean) => void

    showLp: boolean
    setShowLp: (value: boolean) => void

    showAngebot: boolean
    setShowAngebot: (value: boolean) => void

    showEmpfSem: boolean
    setShowEmpfSem: (value: boolean) => void

    showVorModsInhalt: boolean
    setShowVorModsInhalt: (value: boolean) => void

    showVorModsFormal: boolean
    setShowVorModsFormal: (value: boolean) => void

    showMinLp: boolean
    setShowMinLp: (value: boolean) => void
    
}

export default function HeaderButtonGroup(props: headerButtonGroupProps): JSX.Element{

    function setShowLp(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowLp(bool)
    }

    function setShowID(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowID(bool)
    }

    function setShowAngebot(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowAngebot(bool)
    }

    function setShowEmpfSem(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowEmpfSem(bool)
    }

    function setShowVorModsInhalt(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowVorModsInhalt(bool)
    }

    function setShowVorModsFormal(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowVorModsFormal(bool)
        props.setShowMinLp(bool)
    }
/*
    function setShowMinLp(event: React.ChangeEvent<HTMLInputElement>){

        const bool: boolean = event.target.checked

        props.setShowMinLp(bool)
    }
*/
    return(

        <div className="headerButtonGroup">
            <span className='headerButtonGroupTitle bigFont'>Moduldetails</span>
            <div className="headerButtonRowWrapper">
                <div className="headerButtonWrapper">
                    <Form.Check id="showIDBox" className="headerButton" type="checkbox" checked={props.showID} onChange={(event) => setShowID(event)}></Form.Check>
                    <p className="smallFont headerButtonText">ID</p>
                </div>
                <div className="headerButtonWrapper">
                    <Form.Check id="showLpBox" className="headerButton" type="checkbox" checked={props.showLp} onChange={(event) => setShowLp(event)}></Form.Check>
                    <span className="smallFont headerButtonText">Lp</span>
                </div>
                <div className="headerButtonWrapper">
                    <Form.Check id="showAngebotBox" className="headerButton" type="checkbox" checked={props.showAngebot} onChange={(event) => setShowAngebot(event)}></Form.Check>
                    <span className="smallFont headerButtonText">Angebot</span>
                </div>
                <div className="headerButtonWrapper">
                    <Form.Check id="showEmpfSemBox" className="headerButton" type="checkbox" checked={props.showEmpfSem} onChange={(event) => setShowEmpfSem(event)}></Form.Check>
                    <span className="smallFont headerButtonText">EmpfSem</span>
                </div>
            </div>
            <div className="headerButtonRowWrapper">
                <div className="headerButtonWrapper">
                    <Form.Check id="showVorModInhaltBox" className="headerButton" type="checkbox" checked={props.showVorModsInhalt} onChange={(event) => setShowVorModsInhalt(event)}></Form.Check>
                    <span className="smallFont headerButtonText">Zuvor Empf. Module</span>
                </div>
                <div className="headerButtonWrapper">
                    <Form.Check id="showVorModFormalBox" className="headerButton" type="checkbox" checked={props.showVorModsFormal} onChange={(event) => setShowVorModsFormal(event)}></Form.Check>
                    <span className="smallFont headerButtonText">Formale Voraussetzung</span>
                </div>
                {/* 
                <div className="headerButtonWrapper">
                    <Form.Check id="showMinLpBox" className="headerButton" type="checkbox" checked={props.showMinLp} onChange={(event) => setShowMinLp(event)}></Form.Check>
                    <span className="smallFont headerButtonText">Min. Lp</span>
                </div>
                */}
            </div>
        </div>
    )
}