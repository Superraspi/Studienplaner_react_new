import React, { useState } from "react"
import { ModulKatalog } from "../messages"
import { modulProps } from "../comps/modul"
import { spacerProps } from "../comps/spacer"
import {initSpacerArrayProps, updateSpacerProps} from "./config"
import { vertiefung } from "../comps/dropDownVertiefung"


//THIS IS THE HARDCODE SPECIFIC FILE
//FOR SUBJECT COMPUTER SCIENCE

/* <--- Computer Science Global Variables ---> */

export const informatikBSCName: string = "Informatik B.Sc."
export const informatikBSCSeperateTypes: string[] = [ModulKatalog.pflicht, ModulKatalog.einf, "VC;CISS;MI;ES", ModulKatalog.prak]






//vertiefungs abhaengige punkt intervalle //informatik 

//ES
//pflicht
const informatikPflichtESPunkteMin: number | null = null
const informatikPflichtESPunkteMax: number = 138

//einfuehrung
const informatikVertiefungESEinfPunkteMin: number | null = null
const informatikVertiefungESEinfPunkteMax: number = 6

//eigene vertiefungsmodule
const informatikVertiefungESEigVerPunkteMin: number | null = 18
const informatikVertiefungESEigVerPunkteMax: number = 30

//andere vertiefungsmodule 
const informatikVertiefungESAndVerPunkteMin: number | null = 0
const informatikVertiefungESAndVerPunkteMax: number = 12

//praktika
const informatikVertiefungESPraktikaPunkteMin: number | null = null
const informatikVertiefungESPraktikaPunkteMax: number | null = 6
   


//VC
//pflicht
const informatikPflichtVCPunkteMin: number | null = null
const informatikPflichtVCPunkteMax: number = 162

//einfuehrung
const informatikVertiefungVCEinfPunkteMin: number | null = null
const informatikVertiefungVCEinfPunkteMax: number = 6

//eigene vertiefungsmodule
const informatikVertiefungVCEigVerPunkteMin: number | null = 6
const informatikVertiefungVCEigVerPunkteMax: number = 12

//andere vertiefungsmodule 
const informatikVertiefungVCAndVerPunkteMin: number | null = 0
const informatikVertiefungVCAndVerPunkteMax: number = 6

//praktika
const informatikVertiefungVCPraktikaPunkteMin: number | null = null
const informatikVertiefungVCPraktikaPunkteMax: number | null = 6


//CISS
//pflicht
const informatikPflichtCISSPunkteMin: number | null = null
const informatikPflichtCISSPunkteMax: number = 138

//einfuehrung
const informatikVertiefungCISSEinfPunkteMin: number | null = null
const informatikVertiefungCISSEinfPunkteMax: number = 6

//eigene vertiefungsmodule
const informatikVertiefungCISSEigVerPunkteMin: number | null = 18
const informatikVertiefungCISSEigVerPunkteMax: number = 30

//andere vertiefungsmodule 
const informatikVertiefungCISSAndVerPunkteMin: number | null = 0
const informatikVertiefungCISSAndVerPunkteMax: number = 12

//praktika
const informatikVertiefungCISSPraktikaPunkteMin: number | null = null
const informatikVertiefungCISSPraktikaPunkteMax: number | null = 6


//MI
//pflicht
const informatikPflichtMIPunkteMin: number | null = null
const informatikPflichtMIPunkteMax: number = 168

//einfuehrung
const informatikVertiefungMIEinfPunkteMin: number | null = null
const informatikVertiefungMIEinfPunkteMax: number = 6

//eigene vertiefungsmodule
const informatikVertiefungMIEigVerPunkteMin: number | null = null
const informatikVertiefungMIEigVerPunkteMax: number = 6

//andere vertiefungsmodule 
const informatikVertiefungMIAndVerPunkteMin: number | null = null
const informatikVertiefungMIAndVerPunkteMax: number | null = null

//praktika
const informatikVertiefungMIPraktikaPunkteMin: number | null = null
const informatikVertiefungMIPraktikaPunkteMax: number | null = 6




/* <--- Spacer Overview for Computer Science --->*/ 






   



//input: modul array // chosen vertiefung // function hideModules
//returns an array obj with the specific spacers JSX elems for the scroller
//the index of the returend array must be equal to the spacer number in the modul prop
//e.g. "Modul 1": {spacer: 2} ---> is placed under this.return[2]  --> this.return[2] = "Pflichtmodule: 0 von 1000LP"
export function getComputerScienceBSCSpacers(props: initSpacerArrayProps): spacerProps[]{

    const ver: vertiefung = props.chosenVertiefung

    switch(ver.kurz){

        case "ES":

            return getESSpacers()
        case "VC":

            return getVCSpacers()
        case "CISS":

            return getCISSSpacers()
        case "MI":
            
            return getMISpacers()    
        default:
            
            return getComputerScienceBSCDefaultSpacers()
    }

    //when no ver is chosen 
    function getComputerScienceBSCDefaultSpacers(): spacerProps[]{


        const defaultSpacer: spacerProps = {

            id: 0,
            hideModules: props.hideModules,
            spacerIndex: 0,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Pflichtmodule ohne Vertiefung: ",
            minPoints: null,
            maxPoints: 132,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const defaultSpacer1: spacerProps = {

            id: 1,
            hideModules: props.hideModules,
            spacerIndex: 1,
            show: false,
            showFalseMessage: null,
            childSpacer: null,
            title: "",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: false,
            modsColored: false
        }

        const defaultSpacer2: spacerProps = {

            id: 2,
            hideModules: props.hideModules,
            spacerIndex: 2,
            show: false,
            showFalseMessage: null,
            childSpacer: null,
            title: "",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: false,
            modsColored: false
        }

        const defaultSpacer3: spacerProps = {

            id: 3,
            hideModules: props.hideModules,
            spacerIndex: 3,
            show: false,
            showFalseMessage: null,
            childSpacer: null,
            title: "",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: false,
            modsColored: false
        }

        const defaultSpacer4: spacerProps = {

            id: 4,
            hideModules: props.hideModules,
            spacerIndex: 4,
            show: false,
            showFalseMessage: null,
            childSpacer: null,
            title: "",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: false,
            modsColored: false
        }

        return [defaultSpacer, defaultSpacer1, defaultSpacer2, defaultSpacer3, defaultSpacer4]
    }

    function getESSpacers(): spacerProps[]{

        const pflichtSpacer: spacerProps = {

            id: 0,
            hideModules: props.hideModules,
            spacerIndex: 0,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Pflichtmodule:",
            minPoints: null,
            maxPoints: 138,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const einfSpacer: spacerProps = {

            id: 1,
            hideModules: props.hideModules,
            spacerIndex: 1,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagen einer anderen Vertiefungsrichtung:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const verFreeSpacer: spacerProps = {

            id: 2,
            hideModules: props.hideModules,
            spacerIndex: 2,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Vertiefung Embedded Systems:",
            minPoints: 18,
            maxPoints: 30,
            points: 0,
            isOpen: true,
            modsColored: false
        }
    
        const verOtherSpacer: spacerProps = {
    
            id: 3,
            hideModules: props.hideModules,
            spacerIndex: 3,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Andere Vertiefungsmodule:",
            minPoints: 0,
            maxPoints: 12,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        const prakSpacer: spacerProps = {

            id: 4,
            hideModules: props.hideModules,
            spacerIndex: 4,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagenpraktikum:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        return [pflichtSpacer, einfSpacer, verFreeSpacer, verOtherSpacer, prakSpacer]
    }

    function getVCSpacers(): spacerProps[]{

        const pflichtSpacer: spacerProps = {

            id: 0,
            hideModules: props.hideModules,
            spacerIndex: 0,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Pflichtmodule:",
            minPoints: null,
            maxPoints: 162,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const einfSpacer: spacerProps = {

            id: 1,
            hideModules: props.hideModules,
            spacerIndex: 1,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagen einer anderen Vertiefungsrichtung:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const verFreeSpacer: spacerProps = {

            id: 2,
            hideModules: props.hideModules,
            spacerIndex: 2,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Vertiefung Visual Computing:",
            minPoints: 6,
            maxPoints: 12,
            points: 0,
            isOpen: true,
            modsColored: false
        }
    
        const verOtherSpacer: spacerProps = {
    
            id: 3,
            hideModules: props.hideModules,
            spacerIndex: 3,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Andere Vertiefungsmodule:",
            minPoints: 0,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        const prakSpacer: spacerProps = {

            id: 4,
            hideModules: props.hideModules,
            spacerIndex: 4,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagenpraktikum:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        return [pflichtSpacer, einfSpacer, verFreeSpacer, verOtherSpacer, prakSpacer]
    }

    function getCISSSpacers(): spacerProps[]{

        const pflichtSpacer: spacerProps = {

            id: 0,
            hideModules: props.hideModules,
            spacerIndex: 0,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Pflichtmodule:",
            minPoints: null,
            maxPoints: 138,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const einfSpacer: spacerProps = {

            id: 1,
            hideModules: props.hideModules,
            spacerIndex: 1,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagen einer anderen Vertiefungsrichtung:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const verFreeSpacer: spacerProps = {

            id: 2,
            hideModules: props.hideModules,
            spacerIndex: 2,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Vertiefung CISS:",
            minPoints: 18,
            maxPoints: 30,
            points: 0,
            isOpen: true,
            modsColored: false
        }
    
        const verOtherSpacer: spacerProps = {
    
            id: 3,
            hideModules: props.hideModules,
            spacerIndex: 3,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Andere Vertiefungsmodule:",
            minPoints: 0,
            maxPoints: 12,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        const prakSpacer: spacerProps = {

            id: 4,
            hideModules: props.hideModules,
            spacerIndex: 4,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagenpraktikum:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        return [pflichtSpacer, einfSpacer, verFreeSpacer, verOtherSpacer, prakSpacer]
    }
    
    function getMISpacers(): spacerProps[]{

        const pflichtSpacer: spacerProps = {

            id: 0,
            hideModules: props.hideModules,
            spacerIndex: 0,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Pflichtmodule:",
            minPoints: null,
            maxPoints: 168,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const einfSpacer: spacerProps = {

            id: 1,
            hideModules: props.hideModules,
            spacerIndex: 1,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagen einer anderen Vertiefungsrichtung:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const verFreeSpacer: spacerProps = {

            id: 2,
            hideModules: props.hideModules,
            spacerIndex: 2,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Vertiefung Medizinische Informatik:",
            minPoints: null,
            maxPoints: 6,
            points: 0,
            isOpen: true,
            modsColored: false
        }

        const verOtherSpacer: spacerProps = {

            id: 3,
            hideModules: props.hideModules,
            spacerIndex: 3,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Module anderer Vertiefungen",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: false,
            modsColored: true
        }

        const prakSpacer: spacerProps = {

            id: 4,
            hideModules: props.hideModules,
            spacerIndex: 4,
            show: true,
            showFalseMessage: null,
            childSpacer: null,
            title: "Grundlagenpraktikum:",
            minPoints: null,
            maxPoints: 0,
            points: 0,
            isOpen: true,
            modsColored: true
        }

        return [pflichtSpacer, einfSpacer, verFreeSpacer, verOtherSpacer, prakSpacer]
    }
}

//returns the sum of all curr spacers points 
//returns an array where the index is equal to the spacer index => result[0] == spacer[0].points
export function getComputerScienceBSCSpacersPoints(props: updateSpacerProps): number[]{

    let pflichtPoints: number = 0
    let einfPoints: number = 0
    let prakPoints: number = 0
    let verPoints: number = 0
    let verFreePoints: number = 0
    let verOtherPoints: number = 0

    for(let i = 0; i < props.modulArray.length; i++){

        //negative condition
        if(props.modulArray[i].isVoluntarily){
            console.log(props.modulArray[i].name)
            continue
        }

        //positive condition
        if(props.modulArray[i].bestanden || props.modulArray[i].semester != null){

            switch(props.modulArray[i].katalog){

                case ModulKatalog.pflicht:
                    pflichtPoints += props.modulArray[i].lp
                    break
                case ModulKatalog.einf: 
                    einfPoints += props.modulArray[i].lp
                    break
                case ModulKatalog.prak: 
                    prakPoints += props.modulArray[i].lp
                    break
                default:
                    verPoints += props.modulArray[i].lp
                    if(props.modulArray[i].katalog == props.vertiefung.kurz){
                        verFreePoints += props.modulArray[i].lp
                    }
                    else{
                        verOtherPoints += props.modulArray[i].lp
                    }
                    break
            }
        }
    }
    return [pflichtPoints, einfPoints, verFreePoints, verOtherPoints, prakPoints]
}

//returns the chosen / voted mods that are related to the spacer
export function getComputerScienceBSCSpacerVotedMods(props: updateSpacerProps): modulProps[][]{

    let result: modulProps[][] = []

    let pflichtMods: modulProps[] = []
    let einfMods: modulProps[] = []
    let verFreeMods: modulProps[] = []
    let verOtherMods: modulProps[] = []
    let prakMods: modulProps[] = []

    for(let i = 0; i < props.modulArray.length; i++){


        //negative condition
        if(props.modulArray[i].isVoluntarily){

            continue
        }

        //positive condition
        if(props.modulArray[i].bestanden || props.modulArray[i].semester != null){

            switch(props.modulArray[i].katalog){

                case ModulKatalog.pflicht:
                    pflichtMods.push(props.modulArray[i])
                    break
                case ModulKatalog.einf: 
                    einfMods.push(props.modulArray[i])
                    break
                case ModulKatalog.prak: 
                    prakMods.push(props.modulArray[i])
                    break
                default:

                    //mod is pflicht in ver
                    if(props.modulArray[i].pflicht_in?.includes(props.vertiefung.kurz)){

                        pflichtMods.push(props.modulArray[i])
                    }
                    else if(props.modulArray[i].katalog == props.vertiefung.kurz){
                        verFreeMods.push(props.modulArray[i])
                    }
                    else{
                        verOtherMods.push(props.modulArray[i])
                    }
                    break
            }
        }
    }
    result = [pflichtMods, einfMods, verFreeMods, verOtherMods, prakMods]
    return result 
}

//keeps track of the specific points  
//requieres the spacer props of the modules to be correct
export function updateComputerScienceBSCSpacer(props: updateSpacerProps): spacerProps[]{

    const points: number[] = getComputerScienceBSCSpacersPoints(props)
    let spacer: spacerProps[] = [...props.spacerArray]

    for(let i = 0; i < spacer.length; i++){

        switch(i){

            case 0:
                spacer[0].points = points[i]
                break
            case 1:
                spacer[1].points = points[i]
                break
            case 2:
                spacer[2].points = points[i]
                break  
            case 3:
                spacer[3].points = points[i]
                break
            case 3:
                spacer[3].points = points[i]
                break      
        }
    }
    return spacer
}


//tells the app what modules are linked to the spacers
//type == modul prop //"pflicht" //"einf"
//vertiefug == user selected vertiefung
export function getComputerScieneceBSCSpacerIndex(katalog: string, vertiefung: vertiefung, pflichtIn: string[] | null): number{

    //VC ES CISS

    //pflicht spacer == 0
    //einfuhrung spacer == 1
    //aus eigener vertiefung == 2
    //aus anderes vertiefung == 3
    //praktikum == 4

    //MI
    //pflicht == 0
    //einführung == 1
    //aus eigener Vertiefung == 2
    //prak == 3
    
    switch(katalog){

        //pflicht
        case ModulKatalog.pflicht:
            return 0
            
        //einfuhrungs modul    
        case ModulKatalog.einf:

            //mods is pflicht 
            if(pflichtIn?.includes(vertiefung.kurz)){

                return 0
            }
            return 1
            
        case ModulKatalog.prak:

            //modul fuer andere vertiefung
            if(vertiefung.kurz != katalog){}

            /*
            //MI prak ist in pflicht spacer 
            if(vertiefung.kurz == "MI"){
                return 0
            }
            */
            if(pflichtIn?.includes(vertiefung.kurz)){

                return 0
            }
            return 4

        //alle Vertiefungen
        default:
            //unchosen
            if(vertiefung.kurz == ModulKatalog.ver)return -1

            //modul ist vertiefungs modul und pflicht in der vertiefung
            else if(pflichtIn?.includes(vertiefung.kurz)){

                return 0
            }

            //normales vertieungs modul aus der gewahlten vertiefung
            else if(vertiefung.kurz == katalog){

                return 2
                
            }

            //anderes vertiefungsmodul
            else{

                //if(vertiefung.kurz == "MI")return -1
                return 3
            }
    }
}




//vertiefungs info text popup
export function getComputerScienceBSCVertiefungsInfoText(): JSX.Element[]{

    const title: JSX.Element = <span className="capitalFont">Bitte vergiss nicht eine Vertiefung zu wählen</span>
    const ref: string = "https://www.eti.uni-siegen.de/dekanat/pruefungsamt/dokumente/informatik/pruefungsordnung-etc-2021/studiengangsbroschuere-bachelor-informatik.pdf"

    const a: string[] = [
        "In den ersten Semestern sollte man sich für eine von vier Vertiefungen entscheiden.",
        "Im Informatik Bachelor Studiengang der Univrsität Siegen hast du die Wahl zwischen:",
        "-Complex and Intelligent Software Systems",
        "-Embedded Systems",
        "-Visual Computing",
        "-Medizinische Informatik",
        "Weitere Informationen findest du "]

    
    const content = 
        <p>
            <span className="bigFont">{a[0]}</span><br/><br/>
            <span className="mediumFont">{a[1]}</span><br/><br/>
            <span className="mediumFont">{a[2]}</span><br/>
            <span className="mediumFont">{a[3]}</span><br/>
            <span className="mediumFont">{a[4]}</span><br/>
            <span className="mediumFont">{a[5]}</span><br/><br/>
            <span className="smallFont">{a[6]}<a href={ref} target="_blank">hier</a></span><br/>
        </p>

    return [title,content]    
}
