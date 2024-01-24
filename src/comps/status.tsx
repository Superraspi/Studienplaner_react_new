import React, { useEffect } from "react"
import { ModulStatus } from "../messages"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { isModalOpen } from "../utility"


export interface statusProps{

    text: string | null
    scrollToMod:(modulId: string) => void
    autoBlendOut: boolean
    modIsCurrentlyDragged: boolean
}

export default function Status(props: statusProps){


    //status text classes
    const inActive: string = "statusText"
    const active: string = "statusText active"

    //restarts the css animation
    function resetAnimation(): void{

        let elem: HTMLElement | null = document.getElementById(inActive)
        if(elem != null){

            elem.style.animation = 'none'
            //triggers reflow (and we need to save that otherwise TS is sad)
            const egal = elem.offsetHeight
            elem.style.animation = ''
        }
    }



    function getClasses(): string{

        //option to disable status blend out
        if(!props.autoBlendOut || props.text == null){
            
            return inActive
        }
        //an open modal triggers an animation reset
        if(props.autoBlendOut && props.text != ""){
           
            resetAnimation()
            return active
        }
        return inActive
    }

    function getModRef(modulRef: string): JSX.Element{

        const id = "modulRefButton" + modulRef

        return(
            <button className="modulRefButton" id={id} key={id} onClick={() => props.scrollToMod(modulRef)}>{modulRef}<ArrowForwardIcon/></button>
        )
    }

    //adds buttons as refs to the modids
    function getContent(): JSX.Element{

       
        //filter vor modules requiered
        if(props.text?.includes(ModulStatus.ErrorVor1) && props.text?.includes(ModulStatus.ErrorVor2) || 
            props.text?.includes(ModulStatus.ErrorVor1s) && props.text.includes(ModulStatus.ErrorVor2s)){

                const firstHalf = (): string => { 

                    if(props.text?.includes(ModulStatus.ErrorVor1))return ModulStatus.ErrorVor1
                    else return ModulStatus.ErrorVor1s
                }
                const secondHalf = (): string => {

                    if(props.text?.includes(ModulStatus.ErrorVor2))return ModulStatus.ErrorVor2
                    else return ModulStatus.ErrorVor2s 
                }
                const modulRefs = (): string[] => {

                    //e.g. id1;id2
                    //or id1
                    let id = props.text?.split(" ")[1]
                    if(id == undefined)return ["[404 - modul not found]"]
                    let ids: string[] = []
                    if(id?.includes(","))ids = id.split(",")
                    else ids[0] = id
                    return ids
                }

                const content = (): JSX.Element => {

                    let refs: JSX.Element[] = []
                    const modRefs = modulRefs()
                    for(let i = 0; i < modRefs.length; i++){
                        refs.push(getModRef(modRefs[i]))
                    }

                    return(
                        <p className={getClasses()} id={inActive}>
                        {firstHalf()}
                        {refs}
                        {secondHalf()}
                        </p>
                    )
                }
                /**/
                return content()
        }
        return <p className={getClasses()} id={inActive}>{props.text}</p>
    }

    return(
        
        <div className="statusWrapper">
            {getContent()}
        </div>
    )
}
