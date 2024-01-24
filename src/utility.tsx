import React, { RefObject, useEffect, useMemo, useState } from "react"
import { modulProps } from "./comps/modul"
import { ModulKatalog } from "./messages"
import { vertiefung } from "./comps/dropDownVertiefung"
import { spacerProps } from "./comps/spacer"
import { Tooltip } from "react-bootstrap"
import { Placement } from "react-bootstrap/esm/types"
import { studiengang } from "./comps/dropDownStudiengaenge"





//css setter / getter
export function setCSSVar(name: string, value: string){

  document.documentElement.style.setProperty(name, value)
}
export function getCSSVar(name: string){

  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

//gets name of css var and returns their percent value as an float
//returns -1 if css var not found
export function getCSSPerCentValue(name: string): number{
  
  const v: string = getCSSVar(name)

  if(v.includes("%")){

    return (parseFloat(v.split("%")[0])) / 100 
  }
  return -1
}

//gets a string input like Hello 12.789 My Friend
//returns 12.789
//or null if no number was found
export function extractNumbers(txt: string): number | null{

  const numbers: string[] = ["0","1","2","3","4","5","6","7","8","9"]

  let comma: boolean = false
  let first: string = ""
  let second: string = ""

  for(let i = 0; i < txt.length; i++){

    let c = txt.charAt(i)

    if(c == "."){
      comma = true
    }
    else if(numbers.includes(c) && !comma){

      first += c
    }
    else if(numbers.includes(c) && comma){

      second += c
    }
  }
  if(first == "")return null
  else if(comma)return parseFloat(first + "." + second)
  else return parseFloat(first) 
}

export function updateSemesterHeight(holderCount: number): void{

  //so there is a bug in css with position: sticky and overflow: scroll
  //this results in the semester headers been scrolled away after the semester viewport height is reached
  //the best way to work around this is to update the semester height to a fixed size
  //but as we dynamically adjust the amout of holder panels the needed fixed size changes
  const holderHeight: number | null = extractNumbers(getCSSVar("--holder-min-height"))
  const holderHeaderHeight = extractNumbers(getCSSVar("--holder-header-min-height"))
  if(holderHeight == null || holderHeaderHeight == null)return

  let semesterHeight = (holderCount * holderHeight + 2 * holderHeaderHeight).toString() + "rem"
  setCSSVar("--semester-height", semesterHeight)
}



//function that detectes if comp is shown in viewport
//this is currently used to track if the image cube of the login page is visible
//needed to start/stop the timers of the imagecube
//if we dont track this the cube spins extremly fast after we refocus the tab after a while
export default function useOnScreen(ref: RefObject<HTMLElement>): boolean {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])
  
  
    useEffect(() => {
    
        if(ref.current == null)return
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
  
    return isIntersecting
  }






  // get sum of pflicht modules lp of passed modul in the depending spacer
  export function getAllPflichtPointsOfSpacer(spacerIndex: number, moduleArray: modulProps[], vertiefung: vertiefung): number{

    let result: number = 0

    for(let i = 0; i < moduleArray.length; i++){

      //mod is in spacer
      if(moduleArray[i].spacer == spacerIndex){

        //mods is pflicht
        if(moduleArray[i].katalog == ModulKatalog.pflicht || moduleArray[i].pflicht_in?.includes(vertiefung.kurz)){

          result += moduleArray[i].lp
        }
      }
    }
    return result
  }


  //remaining points of the spacer are equal of the max points minus the current points minus the lp of the dropped modul
  export function getRemainingPointsOfSpacer(spacer: spacerProps): number{

    if(spacer == undefined || spacer == null)return 0
    return spacer.maxPoints - spacer.points
  }

  export function isPflichtMod(modul: modulProps, vertiefung: vertiefung){

    if(modul == undefined || vertiefung == undefined)return false
    if(modul.katalog == ModulKatalog.pflicht || modul.pflicht_in?.includes(vertiefung.kurz))return true
    return false
  }

  //check function returns sum of all passed modules
  export function getAllPointsFromBestanden(modulArray: modulProps[]): number{

    let result: number = 0

    for(let i = 0; i < modulArray.length; i++){

      if(modulArray[i].bestanden){

        result += modulArray[i].lp
      }
    }
    return result
  }

  //check functions returns bool depending if all vor mods of modul are marked as passed
  export function allVorModulesAreBestanden(modul: modulProps, modulArray: modulProps[]): boolean{

    let result: boolean = true

    const allVorIds: string[] = modul.vorModuleFormal

    for(let i = 0; i < modulArray.length; i++){

      //modul is vor and bestanden
      if(allVorIds.includes(modulArray[i].id) && !modulArray[i].bestanden){

        result = false
      }
    }
    return result
  }

  //returns WS or SS depending on the first semester
  export function getStartSem(): string{

    const firstSem: HTMLDivElement | null = document.querySelectorAll(".semester")[0] as HTMLDivElement


    if(firstSem == null)return "404 - sem not found"

    const child: HTMLDivElement | null = (firstSem.firstChild as HTMLDivElement)

    if(child == null)return "404 - sem not found"

    const semCon: string = child.innerText
    return semCon.includes("WS") ? "WS" : "SS"
  }

  //updates class of jsx modules elems in array depending on their index in array
  export function markModulesCount(): void{

    

    let jsxMods: NodeListOf<Element> = document.querySelectorAll(".modul")
    if(jsxMods.length == 0)return 

    let localCount: number = -1
    let lastSpacerIndex: number = 0

    for(let i = 0; i < jsxMods.length; i++){

      jsxMods[i].classList.add("modGlobalIndex-"+i)

      //gets parent spacer index 
      let currentSpacerIndex: number = parseInt(jsxMods[i].parentElement!.id.split(" ")[1])

      if(lastSpacerIndex == currentSpacerIndex){

        localCount++
      }
      else{

        localCount = 0
        lastSpacerIndex++
      }

      jsxMods[i].classList.add("modLocalIndex-"+localCount)
    }
  }


  export function isModalOpen(): boolean{


    return document.body.classList.length > 0 
  }

  

  export function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  //returns holder from specific props
  export function getHolder(semId: number, holderId: number): Element | null{

    const elem = document.getElementById("semester"+semId)
    if(elem == null)return null

    const elem2 = elem.children[holderId-1]
    if(typeof elem2 == "undefined")return null
    return elem2
  }
  

  //returns position of given div
  export function getOffsetDiv(el: Element) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.scrollX || document.documentElement.scrollLeft,
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft, bottom: rect.bottom, right: rect.right}
  }

  export function getViewportOffset(el: Element) {

    var viewportOffset = el.getBoundingClientRect();
    // these are relative to the viewport
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    return { top: top, left: left}
  }

  export function getSemesterUnderCursor(positionX: number, posiitonY: number): number | null{

    const allSems: NodeListOf<Element> | null = document.querySelectorAll(".semester")
    if(allSems == null)return null

    for(let i = 0; i < allSems.length; i++){

      const semPos: {top: number, left: number, bottom: number, right: number} = getOffsetDiv(allSems[i])

      if(positionX > semPos.left && positionX < semPos.right && posiitonY > semPos.top && posiitonY < semPos.bottom){

        return i+1
      }
    }
    return null
  }

  //returns index nums or null depending if a holder lays under the mouse cursor pos
  export function getHolderUnderCursor(positionX: number, positionY: number, semId: number): number | null{

    
    //get position of dropTable
    const dropTable: Element | null = document.querySelector(".dropTable")
    if(dropTable == null)return null
    const dropTablePos: {top: number, left: number} = getOffsetDiv(dropTable)

    //check if cursor is over drop table
    const cursorOverDropTable = (): boolean => {

      //x
      if(positionX < dropTablePos.left && positionX > dropTablePos.left + dropTable.clientWidth)return false
      //y
      if(positionY < dropTablePos.top && positionY > dropTablePos.top + dropTable.clientHeight)return false
      return true
    }
    //cursor is in drop talbe boundaries
    if(!cursorOverDropTable())return null



    //get semesterheader height
    const semesterHeaderHeight: number = convertRemToPixels(parseInt(getCSSVar("--holder-header-min-height")))
    
    const holder: NodeListOf<Element> | undefined = document.querySelector(".semester")?.querySelectorAll(".holder")
    

    if(typeof holder == "undefined")return null

    const holderCount = holder.length

    //get size of holder
    const sizeOfHolderpx: number = convertRemToPixels(parseInt(getCSSVar("--holder-min-height")))
    const sizeOfGappx: number = convertRemToPixels(parseInt(getCSSVar("--holder-gap")))

      
    //loops all holders
    for(let j = 0; j < holderCount; j++){

      const holderPos: {top: number, left: number} = getOffsetDiv(holder[j])

      //console.log(j+".Holder vor: " + holderPos.top + " bis: " + (holderPos.top+sizeOfHolderpx))

      if(positionY > holderPos.top && positionY < holderPos.top+sizeOfHolderpx){

        return j
      }
    }
    return null
  }


  //returns the semester number where the first module is placed
  //returns 0 if no mod has been placed
  export function getStartingSem(modulArray: modulProps[]): number{

    let result: number = 0

    for(let i = 0; i < modulArray.length; i++){

      const semOfMod: number | null = modulArray[i].semester

      if(semOfMod == null)continue

      if(result == 0)result = semOfMod

      if(semOfMod < result && semOfMod > 0){

        result = semOfMod
      }
    }

    return result
  }

  export function getEndingSem(modulArray: modulProps[]): number{

    let result: number = 0

    for(let i = 0; i < modulArray.length; i++){

      const semOfMod: number | null = modulArray[i].semester

      if(semOfMod == null)continue

      if(semOfMod > result && semOfMod > 0){

        result = semOfMod
      }
    }

    return result
  }


  export function createTooltip(text: string, pos: Placement | undefined): JSX.Element{

    const tooltip: JSX.Element = <Tooltip className="tooltip" placement={pos}>{text}</Tooltip>
    return tooltip
  }

  export function getEmptyStudiengang(): studiengang{

    const obj: studiengang = {

      name: "Studiengang",
      fpo: "---"
    }

    return obj
  }