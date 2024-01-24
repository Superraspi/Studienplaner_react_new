import React, { useState, useEffect, useRef } from 'react'
import './mainPage.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropTable, { dropTableProps } from './comps/dropTable'
import ModulScroller, { modulScrollerProps } from './comps/modulScroller'
import Modul, { coloredModul, desiredModulVoting, modulProps, votingModulReasons } from './comps/modul'
import Status, { statusProps } from './comps/status'
import Lp, {lpProps} from './comps/lp'
import Navbar, { NavBarProps } from './comps/navbar'
import DropDownVertiefung, { dropDownPropsVertiefung, vertiefung } from './comps/dropDownVertiefung'
import DropDownSemester, { dropDownPropsSemester} from './comps/dropDownSemester'
import { ErrorMessages, FeedbackStatus, ModulAngebot, ModulColor, ModulKatalog, ModulStatus, SortMessages } from './messages'
import Popup, { popupProps, popupText } from './comps/popup'
import OptionContainer, { optionContainerProps } from './comps/optionContainer'
import DropDownSort, { dropDownPropsSort } from './comps/dropDownSort'
import Spacer, { spacerProps } from './comps/spacer'
import { SideHeader, sideHeaderProps } from './comps/sideHeader'
import { getSpacerIndex, getStudiengangName, getSpacerArray, initSpacerArrayProps, updateSpacerProps, getSpacerVotedMods, getVertiefungsInfoText, getSpacerPoints } from './config/config'
import { Button } from 'react-bootstrap'
import FeedbackContainer, { feedbackContainerProps } from './comps/feedbackContainer'
import Overview from './comps/overview'
import Login, { loginProps } from './comps/login'
import { allVorModulesAreBestanden, convertRemToPixels, getAllPflichtPointsOfSpacer, getAllPointsFromBestanden, getCSSVar, getEmptyStudiengang, getEndingSem, getOffsetDiv, getRemainingPointsOfSpacer, getSemesterUnderCursor, getStartSem, getStartingSem, isPflichtMod, markModulesCount, setCSSVar, updateSemesterHeight } from './utility'
import { modulHighlightTime, getStatusTextBlendOutTime, showVerInfoPopupTimeMills, showVerInfoPopupInSem, showVerInfoPopupSecPassed } from './options'
import { SearchBar, searchBarProps } from './comps/searchBar'
import { VerChangePopup, complexConflictListProps, verChangePopup } from './comps/verChangePopup'
import { semesterProps } from './comps/semester'
import { Logo } from './comps/logo'
import HeaderButtonGroup, { headerButtonGroupProps } from './comps/headerButtonGroup'
import { PDFFile, pDFFileProps, pdfResultVotedObject } from './comps/pdfFile'
import ReactPDF, { BlobProvider, PDFDownloadLink, pdf } from '@react-pdf/renderer'
import { studiengang } from './comps/dropDownStudiengaenge'
import AskPopup, { PopupTypes, askPopupProps } from './comps/askPopup'
import ResetModPopup, { resetModPopupProps } from './comps/resetModPopup'



export interface userdata{

  username: string
  studiengang: studiengang
  module_belegt: string
  module_bestanden: string
  vertiefung: string
  sort: string
  theme: string
}


//run function only once

//runs one time in useEffect
var first: boolean = true
var isAnyModalOpen: boolean = false
//var statusAutoBlendOutVar: boolean = true

//to assure the general information popup is only shown once each session
var verInfoPopupWasShown: boolean = false

//to reassign the modulDone as a new snapshot to the mod array
//used in useEffect of spacer array and voteVertiefung()
var verHasChanged: boolean = false


var sessionStart: string | null = null



export var lastSpacerIndex: number = 0




function App() {


  /* <--- App Config Vars ---> m*/

  //theme state
  const [isBright, setBright] = useState<boolean>(false)


  /* <--- Login Vars ---> */

  //store userdata -> set by login funtion
  const [userData, setUserData] = useState<userdata | null>(null)
  //bool if user login was successful
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

  //when userdata is set show app page
  useEffect(() =>{

    initUserData()
  }, [userData])
  





  /* <--- All App States ---> */

  //major error detected
  const [fatalError, setFatalError] = useState<boolean>(false)

  //curr initialized with getStudiengangName() -> return Informatik
  //will later be changed to user selection
  const [studiengang, setStudiengang] = useState<studiengang>(getEmptyStudiengang())
  const [studiengaenge, setStudiengaenge] = useState<studiengang[]>([])
  
  //overall is complete (combination is complete and valid)
  const [isComplete, complete] = useState<boolean>(false)


  //this is the kernel object //stores all modules and their states
  const [moduleArray, setModule] = useState<modulProps[]>([])

  //this contains the spacers --> initialized through the config
  const [spacerArray, setSpacerArray] = useState<spacerProps[]>([])
  
  



  //dropdown selects
  //when drop down option is clicked it is stored here
  //the drop down menu pulls the displayed string from here
  //initial value is the id of the depending drop down e.g. "Vertiefung"
  //const [vertiefungen, setVertiefungen] = useState<vertiefung[]>([])
  //const [chosenVertiefung, choseVertiefung] = useState<vertiefung>(emptyVer())
  const [chosenVertiefung, setVertiefung] = useState<vertiefung>(getInitVertiefung())
  const [vertiefungen, setVertiefungen] = useState<vertiefung[]>([])
  const [newVertiefung, setNewVertiefung] = useState<vertiefung>(getInitVertiefung())




  //status text 
  const [statusText, setStatus] = useState<string>("")
  
  
  //lp
  const [lpText, setLp] = useState<number>(0)


  //we have one info box its either shown or not
  //everytime we change the popupText the modal is shown
  //popup show (infobox) 
  const [show, setShow] = useState<boolean>(false)
  //popup content
  const [popupText, setPopupText] = useState<popupText>(getInitPopupInfo())

  //options container modal
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [showChangeStudiengangPopup, setShowChangeStudiengangPopup] = useState<boolean>(false)


  /* <--- Popup Ask Modul Voting ---> */
  //show the asking popup after its props have been set
  const [showAskPopup, setShowAskPopup] = useState<boolean>(false)
  //needed to handle callback of the asking popup
  const [askPopupType, setPopupType] = useState<PopupTypes>(PopupTypes.modulConfirmationPopup)
  //disable asking popup from options
  const [askPopupText, setAskPopupText] = useState<popupText>(getInitPopupInfo())
  //save inhalt vor mod to vote after conformation 
  const [askingMod, setAskingMod] = useState<desiredModulVoting | null>(null)

  /* <--- Popup Reset Vor Mods ---> */
  const [resetVorModsPopup, setResetVorModsPopup] = useState<resetModPopupProps>(getInitResetMod())


  //when ver is changed state
  const [showVerChange, setShowVerChange] = useState<boolean>(false)
  //the simple list of mods that are in conflict
  const [simpleListOfConflictedMods, setSimpleListOfConflictedMods] = useState<modulProps[]>([])
  //the complex list of mods like chose 1 of 2 
  const [complexListOfConflictedMods, setComplexListOfConflictedMods] = useState<complexConflictListProps[]>([])


  //counter for how many semester grids the table should contain
  //table is initilized with default value of 8 semester
  const [semesterCount, setSemesterCount] = useState<number>(6)
  const [holderCount, setHolderCount] = useState<number>(18)



  

  /* <--- App Intern Information ---> */
  //modul is currently being dragged //updated through modul class
  const [currentDraggedMod, setCurrentDraggedMod] = useState<modulProps|null>(null)
  const [currentHoveredSem, setCurrentHoveredSem] = useState<number>(0)



  /* <--- Header Button Options ---> */
  const [showID, setShowID] = useState<boolean>(true)
  const [showLp, setShowLp] = useState<boolean>(true)
  const [showAngebot, setShowAngebot] = useState<boolean>(true)
  const [showEmpfSem, setShowEmpfSem] = useState<boolean>(true)
  const [showVorModsInhalt, setShowVorModsInhalt] = useState<boolean>(true)
  const [showVorModsFromal, setShowVorModsFormal] = useState<boolean>(true)
  const [showMinLp, setShowMinLp] = useState<boolean>(true)

  /* <--- App Options ---> */
  const [holderDifferentSize, setHolderDifferentSize] = useState<boolean>(false)
  const [statusAutoBlendOut, setStatusAutoBlendOut] = useState<boolean>(true)
  //option to disable the asking popup (confirmation popup)
  const [showInhaltVorWarningPopup, setShowInhaltWarningPopup] = useState<boolean>(true)
  




  /* <--- Property Objects ---> */

  //props for the info popup
  //contains the trigger and the show function
  //also the information that need to be displayed
  const popupProps: popupProps ={

    show: show,
    showInfo: (bool) => setShow(bool),
    information: popupText
  }
  const askPopupProps: askPopupProps ={

    show: showAskPopup,
    text: askPopupText,

    abortButtonText: "Abbrechen",
    abort:() => callBackFromAskPopupAbort(askPopupType),
    confirmButtonText: "Bestätigen",
    confirm:() => callBackFromAskPopupConfirm(askPopupType)
  }
  //defines options Container (also popup)
  const optionsContainerProps: optionContainerProps = {

    show: showOptions,
    holderCount: holderCount,
    showOptions: toggleOptions,
    setHolderDifferentSize: setHolderDifferentSize,
    setShowEmpfSem: setShowEmpfSem,
    toggleStatusAutoBlendOut: toggleStatusAutoBlendOut,
    toggleShowInhaltVorWarningPopup: setShowInhaltWarningPopup
  }
  const feedbackContainerProps: feedbackContainerProps = {

    show: showFeedback,
    showFeedback: toggleFeedback,
    setStatus: updateStatus2
  }
  const verChangePopupProps: verChangePopup = {

    show: showVerChange,
    newVer: newVertiefung,
    callbackWhenDone: callBackFromVerChangePopup,
    simpleListOfConflictedMods: simpleListOfConflictedMods,
    complexListOfConflictedMods: complexListOfConflictedMods
  }
  
  //pass functions to the navbar
  const navBarProps: NavBarProps ={

    resetAll: resetAll,
    shopOptions: toggleOptions,
    showFeedback: toggleFeedback,
    changeTheme: changeTheme,
    downloadPDF: downloadPDF,
    logOut: logOut
  }
  //drop table props
  const dropTableProps: dropTableProps = {

    chosenModuleArray: moduleArray,
    appendModul: voteModul,
    onSemesterHover: modHoverSemester,
    setModIsCurrentlyDragges: setCurrentDraggedModWrapper,
    semesterCount: semesterCount,
    holderCount: holderCount,
    setHolderDifferentSize: holderDifferentSize
  }


  //all drop downs 
  const vertiefungDropDown: dropDownPropsVertiefung = {

    id: 211,
    //CISS /VC
    options: vertiefungen,
    //intital e.g. "Prim.." then what option is chosen
    state: chosenVertiefung,
    //fires when option is clicked
    trigger: checkVoteVertiefung
  }
  const semesterDropDown: dropDownPropsSemester = {

    id: 22,
    semester: [6,7,8,9,10,11,12],
    initialState: 6,
    trigger: semesterDropDownFunction

  }
  const sortDropDown: dropDownPropsSort = {

    id: 20,
    type: SortMessages.init,
    options: [
      SortMessages.type1, SortMessages.type2, SortMessages.type3, SortMessages.type4,
      SortMessages.type5, SortMessages.type6, SortMessages.type7, SortMessages.type8
    ],
    trigger: sortBy
  }
  //searchbar
  const searchBarProps: searchBarProps = {

    modulArray: moduleArray,
    scrollToMod: scrollToMod
  }
  const headerButtonGroupProps: headerButtonGroupProps = {

    showID: showID,
    setShowID: setShowID,

    showLp: showLp,
    setShowLp: setShowLp,

    showAngebot: showAngebot,
    setShowAngebot: setShowAngebot,

    showEmpfSem: showEmpfSem,
    setShowEmpfSem: setShowEmpfSem,

    showVorModsInhalt: showVorModsInhalt,
    setShowVorModsInhalt: setShowVorModsInhalt,

    showVorModsFormal: showVorModsFromal,
    setShowVorModsFormal: setShowVorModsFormal,

    showMinLp: showMinLp,
    setShowMinLp: setShowMinLp
  }
  const sideHeaderProps: sideHeaderProps = {

    name: userData == null ? "gast" : userData.username,
    studiengang: studiengang,
    isLoggedIn: isLoggedIn,
    showChangeStudiengangPopup: () => setShowChangeStudiengangPopup(true)
  }

  const statusProps: statusProps = {

    text: statusText, 
    scrollToMod: scrollToMod, 
    autoBlendOut: statusAutoBlendOut,
    modIsCurrentlyDragged: currentDraggedMod == null ? false : true
  }

  const loginProps: loginProps = {

    studiengaenge: studiengaenge,
    studiengang: studiengang,
    setSuccessLogin: setUserData,
    toggleTheme: changeTheme,
    triggerStudiengang: updateStudiengangState,
    isBright: isBright
  }
  




 /* <--- INIT Functions ---> */

  //loads modules from db to state object
  async function initModules(): Promise<any>{

    if(studiengang.name == "Studiengang")return

    let result: modulProps[] = []

    const bodyObj = JSON.stringify({studiengang: studiengang.name})

    const fetchConfig = {
      method: 'POST',
      
      headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: bodyObj
  }

    const response = await fetch("http://localhost:8000/database/getMod.php", fetchConfig)
    await response.json().then(
      function(value){split(value)},
      function(error){console.log(error)}
    )

    function split(obj: any){

      initVertiefung(obj.specializations)
      convertMods(obj.modules)
    }
    
    function convertMods(obj: any): void{


      for(let i = 0; i < obj.length; i++){
        let temp: modulProps = {
  
          semester: null,
          holder: null,
          bestanden: false,
          showInfo: showInfo,
          modulDone: modulDone,
          setModIsDragged: setCurrentDraggedModWrapper,
          id: obj[i].id,
          name: obj[i].name,
          lp: obj[i].lp,
          angebot: obj[i].ah,
          empfWS: obj[i].esw,
          empfSS: obj[i].ess,
          minPunkte: obj[i].min,
          vorModuleInhalt: obj[i].vorInhalt,
          vorModuleFormal: obj[i].vorFormal,
          vorLeistung: obj[i].vorLeistung,
          katalog: obj[i].kat,
          pflicht_in: obj[i].pflicht.split(";"),
          empfohlen_fuer: obj[i].empf.split(";"),
          nicht_fuer: obj[i].nicht.split(";"),
          url: "null",
          show: true,
          color: "white",
          spacer: getSpacerIndex(studiengang, obj[i].kat, chosenVertiefung, obj[i].pflicht.split(";")),
          oldSpacer: getSpacerIndex(studiengang, obj[i].kat, chosenVertiefung, obj[i].pflicht.split(";")),
          isVoluntarily: false,
          inhalt: obj[i].inhalt
        }
        result.push(temp)
      }
    setModule(result)
    }



  //is called from initModules
  //fills the vertiefungs drop down
  function initVertiefung(ver: any): void{

    let result: vertiefung[] = []
    
    //define all "specializations" (i dont like that i cant write this word correct, so ill go with vertiefung)
    for(let i = 0; i < ver.length; i++){

      const temp: vertiefung = {

        kurz: ver[i].short,
        lang: ver[i].name
      }
      result.push(temp)
    }

    //after we loaded all vers from db we can pass them to react
    const vertiefungDropDowntemp: dropDownPropsVertiefung = {

      id: 21,
      options: result,
      state: getInitVertiefung(),
      trigger: voteVertiefung
    }
    
    setVertiefungen(result)
  }
  }

  //fills up state to get all different studiengaenge
  async function initStudiengaenge(): Promise<any>{

    const response = await fetch("http://localhost:8000/database/getStudiengaenge.php")
    await response.json().then(
      function(value){addStudiengaenge(value)},
      function(error){console.log(error)}
    )

    function addStudiengaenge(obj: any): void{

      let result: studiengang[] = []

      for(let i = 0; i < obj.length; i++){

        const elem: studiengang = {

          name: obj[i].name,
          fpo: obj[i].fpo
        }
        result.push(elem)
      }
      setStudiengaenge(result)
    }
  }

  function initUserData(): void{


    if(userData != null){
      
      //set vertiefung
      var verIsChosen: boolean = false
      for(let i = 0; i < vertiefungen.length; i++){

        if(vertiefungen[i].kurz == userData.vertiefung){

          voteVertiefung(vertiefungen[i])
          verIsChosen = true
        }
      }
      
      //set studiengang
      setStudiengang(userData.studiengang)

      //set theme
      if(userData.theme == "dark" && isBright || userData.theme == "light" && !isBright){

        changeTheme()
      }

      //mark modules as passed
      const allPassedOnes: string[] = userData.module_bestanden.split(";")

      for(let i = 0; i < moduleArray.length; i++){

        if(allPassedOnes.includes(moduleArray[i].id)){

          setModulProp(i, "bestanden", true)
        }
      }


      //load modules
      const shid: string[] = userData.module_belegt.split(";")

      for(let i = 0; i < shid.length; i++){

        const id: string = shid[i].split("=")[1]
        const vote: string = shid[i].split("=")[0]

        const index = getIndex(id)

        if(index != null){

          setModulProp(index, "vote", vote)
        }
        

      }

      sortBy(userData.sort)

      //show app 
      setLoggedIn(true)
    }  
  }

  //init spacer array
  function getInitSpacerArrayProps(): initSpacerArrayProps{
    const obj: initSpacerArrayProps={

      hideModules: hideModules,
      chosenVertiefung: chosenVertiefung,
      studiengang: studiengang
    }
    return obj
  }
  
  //returns an empty modul (for popup to initialize and for spacer)
  //both need an modul defined in their interface 
  function getEmptyModul(): modulProps{

    const emptyModul: modulProps = {

      semester: null,
      holder: null,
      bestanden: false,
      showInfo: showInfoWrapper,
      modulDone: modulDone,
      setModIsDragged: setCurrentDraggedModWrapper,
      
      id: "",
      name: "",
      lp: 0,
      angebot: "",
      empfWS: 0,
      empfSS: 0,
      minPunkte: 0,
      vorModuleInhalt: [""],
      vorModuleFormal: [""],
      vorLeistung: false,
      katalog: "",
      pflicht_in: null,
      empfohlen_fuer: null,
      nicht_fuer: null,
      url: "",
      show: false,
      color: "white",
      spacer: 1,
      oldSpacer: 1,
      isVoluntarily: false,
      inhalt: "initial"
    }
    //wrapper function
    function showInfoWrapper(modulProps: modulProps): void{
  
      const text: popupText = {

        headline: <span>{emptyModul.name}</span>,
        additionalText: <p>""</p>
      }
      setPopupText(text)
    }

    return emptyModul
  }

  //empty initial vertiefung
  function getInitVertiefung(): vertiefung{

    const temp: vertiefung = {

      kurz: ModulKatalog.ver,
      lang: ModulKatalog.vertiefung
    }
    return temp
  }

  function getInitPopupInfo():popupText {

    //initial text for our popup
    const text: popupText = {

      headline: <span>initial</span>,
      additionalText: <p>"initial"</p>
    }
    return text
  }

  function getInitAskingModul(): desiredModulVoting{

    const mod: modulProps = getEmptyModul()
    const sem: number = 0
    const hol: number = 0

    const obj: desiredModulVoting = {

      modul: mod,
      newSemester: sem,
      newHolder: hol
    }

    return obj
  }

  function getInitResetMod(): resetModPopupProps{

    const obj: resetModPopupProps = {

      show: false,
      inputMod: getEmptyModul(),
      formalMods: [],
      inhaltMods: [],
      callBack: callBackFromResetVorModPopup
    }
    return obj
  }













  //init function (works like class constructor)
  //is fired when the "App" Component is mounted and dismounted
  useEffect(() => {

    initStudiengaenge()


    //init modules after studiengang has been set => successful login or registration
    //initModules()
    //init start time of app
    setSessionStart()
    
  }, [])

  useEffect(() => {

  }, [studiengaenge])

  useEffect(() => {

    if(studiengang.name != "Studiengang"){
      initModules()
      voteVertiefung(chosenVertiefung)
    }
  }, [studiengang])

  //everytime popup text changes the popup must open
  useEffect(() => {

    //hide popup after initialization
    //the normal information popup appears everytime its text is altered
    //with setPopupText(obj: popupText)
    if(popupText.additionalText.props.children != getInitPopupInfo().additionalText.props.children){
      setShow(true)
    }
  }, [popupText])

  //everytime a state change this func is called
  //verify all modules //removes dependent ones
  useEffect(() => {
    
    //outdated
    //removeDependentModules()

    //update lp and spacer inforamtion 
    updateLp()
    updateSpacer()

    //recolors all modules 
    colorModules()

    //shows a popup with general information about the different specialisations
    //triggers when first mod is placed in 4.th semester
    showVerInfoPopup()

    //update jsx 
    markModulesCount()
    
    //only executed first
    if(moduleArray.length > 0 && first){

      first = false
      overwriteModulDone()
      overwriteHideModules()
    }

    
  }, [moduleArray])

  useEffect(() => {

    if(typeof spacerArray[0] == "undefined")return

    if(verHasChanged){

      overwriteModulDone()
      verHasChanged = false
    }

    //update global var
    lastSpacerIndex = spacerArray.length-1
  }, [spacerArray])

  useEffect(() => {
  
  }, [statusText])

  //after vertiefungen are init -> fill all types
  //all types are pflicht prak einf + vertiefungen
  useEffect(() => {

    let result: string[] = []

    const pflicht: string = ModulKatalog.pflicht
    const einf: string = ModulKatalog.einf
    const prak: string = ModulKatalog.prak

    result.push(pflicht)
    result.push(einf)
    result.push(prak)

    for(let i = 0; i < vertiefungen.length; i++){
      
      result.push(vertiefungen[i].kurz)
    }

  }, [vertiefungen])

  useEffect(() => {

    colorModules()
  }, [chosenVertiefung])

  useEffect(() => {

    //update the height of semester / droptable to the new correct one
    //this is called when the holdercount changes aswell as when the size of the holders changes
    updateSemesterHeight(holderCount)
  }, [holderCount])
  

  useEffect(() => {

  }, [isComplete])


  useEffect(() => {


  },[holderDifferentSize])


  //the popup windows
  useEffect(() => {

  },[showOptions, showFeedback, show])

  useEffect(() => {

    if(askingMod == null){

      setShowAskPopup(false)
    }
    else{

      //update the upcoming popup text
      updatePopupTextWithAskingMod()
      setShowAskPopup(true)
    }

  },[askingMod])


  //show or hide the confliced mods popup after ver has changed
  useEffect(() => {

    if(simpleListOfConflictedMods.length > 0 || complexListOfConflictedMods.length > 0){

      setShowVerChange(true)
    }
    else{

      //update ver after all conflicts have been solved
      if(newVertiefung != getInitVertiefung()){

        voteVertiefung(newVertiefung)
      }
      setShowVerChange(false)
    }
    
  },[simpleListOfConflictedMods, complexListOfConflictedMods])

  useEffect(() => {

    if(newVertiefung == chosenVertiefung){

      setSimpleListOfConflictedMods([])
      setComplexListOfConflictedMods([])
    }

  },[newVertiefung])

  useEffect(() => {

    //set the pointer events of the fadetile to active or inactive
    //mod curr dragged => active 
    //also disable status blend out as long as mod is dragged 
    if(currentDraggedMod != null){

      setCSSVar("--semester-underlayer-pointer", "auto")
      setStatusAutoBlendOut(false)

      //actual coloring the fade tiles
      colorSemesters()
    }
    //deactivate
    else{

      setCSSVar("--semester-underlayer-pointer", "none")
      setStatusAutoBlendOut(true)

      //uncolor all
      unMarkAllSemesters()
    }

    

  },[currentDraggedMod])

  useEffect(() => {

    toggleStatusAutoBlendOut(statusAutoBlendOut)

  }, [statusAutoBlendOut])

  /* <--- Header Button Group ---> */
  useEffect(() => {

    toggleHideOrShowElem(".id", showID)
  },[showID])

  useEffect(() => {

    toggleHideOrShowElem(".lp", showLp)
  },[showLp])

  useEffect(() => {

    toggleHideOrShowElem(".angebot", showAngebot)
  },[showAngebot])

  useEffect(() => {

    toggleHideOrShowElem(".empfSem", showEmpfSem)
  },[showEmpfSem])

  useEffect(() => {

    toggleHideOrShowElem(".vorModsInhalt", showVorModsInhalt)
  },[showVorModsInhalt])

  useEffect(() => {

    toggleHideOrShowElem(".vorModsFormal", showVorModsFromal)
    toggleHideOrShowElem(".minLp", showMinLp)
  },[showVorModsFromal])
/*
  useEffect(() => {

    toggleHideOrShowElem(".minLp", showMinLp)
  },[showMinLp])
*/

  /* <--- App Funtions --->*/ 

  //drag modul back to scroller
  function dropInScroller(event: React.DragEvent): void{

    const input = JSON.parse(event.dataTransfer.getData("modul")) as modulProps
    const index = getIndex(input.id)
    if(index === null || input.semester === null)return
    
    //null in semester and holder property sysmbols an modul in the scroller
    //setModulProp(index, "reset", null)
    voteModul(moduleArray[index], null, null)
    updateStatus2(getResetMessage())

    //returns Message
    function getResetMessage():string{

      return ModulStatus.Erfolg1 + input.name + ModulStatus.ResetModul
    }
  }
  //append modul to the droptable and other way round
  //to archieve this we need to change the semester and holder property
  function voteModul(modul: modulProps, newSemester: number| null, newHolder: number | null): void{


    //check for depending mods (inhalt und formal)
    askForDependentMods(modul, newSemester, newHolder)
    console.log(modul.name, newSemester, newHolder)

    //modul -> contains current semester and holder
    //the other two params the new one

    //drop in Scroller
    //autoatic ok
    if(newSemester === null){

      updateArray()
    }

    //check if valid
    //checkVote also sets the status depending on the result 
    else if(checkVote(modul, newSemester)){

      updateArray()
    }

    //overwrites the mod props (e.g. sem: 3 holder: 2)
    function updateArray(): void{

      //get array position of mod
      const i = getIndex(modul.id)
      
      //throw error
      if(i === null){
        setStatus(ErrorMessages.ModCorrupted)
      }
      else{

        //mod is dragged to dropTable
        if(newSemester != null && newHolder != null){

          //warn user if mod has content relational vor mods and option is turned on
          if(!checkVorModules(modul, newSemester, false) && newSemester != modul.semester && showInhaltVorWarningPopup){

            //shows only if options is turned on 
            //if mod has only changed places e.g. 2 to 4 or so => no popup
            //showInhaltWarningPopup(modul)
            const askingMod: desiredModulVoting = {

              modul: modul,
              newSemester: newSemester,
              newHolder: newHolder
            }
            setAskingMod(askingMod)
            return 
          }
          //checks if holder is free an places 
          directVoteModulToNextFreeHolder(modul, newSemester, newHolder)
        }
        //update modul props
        setModulProp(i, "vote", newSemester + ":" + newHolder)
      }
    }
  }
  //sorts modulArray by type
  function sortBy(type: string): boolean{

    switch(type){

      case SortMessages.type1:
        setModule([...moduleArray].sort((a, b) => (a.name < b.name ? -1 : 1)))
        break
      case SortMessages.type2:
        setModule([...moduleArray].sort((a, b) => (a.name > b.name ? -1 : 1)))
        break
      case SortMessages.type3:
        setModule([...moduleArray].sort((a, b) => (a.id < b.id ? -1 : 1)))
        break    
      case SortMessages.type4:
        setModule([...moduleArray].sort((a, b) => (a.id > b.id ? -1 : 1)))
        break
      case SortMessages.type5:
        setModule([...moduleArray].sort((a, b) => (a.lp < b.lp ? -1 : 1)))
        break
      case SortMessages.type6:
        setModule([...moduleArray].sort((a, b) => (a.lp > b.lp ? -1 : 1)))
        break
      case SortMessages.type7:
        setModule([...moduleArray].sort((a, b) => (a.empfWS < b.empfWS ? -1 : 1)))
        break
      case SortMessages.type8:
        setModule([...moduleArray].sort((a, b) => (a.empfWS > b.empfWS ? -1 : 1)))
        break      
    }

    return true
  }
  //click on spacer to hide the child mods 
  function hideModules(spacerIndex: number, isOpen: boolean){

    for(let i = 0; i < moduleArray.length; i++){

      //if modul matches the spacer and modul is in scroller
      if(moduleArray[i].spacer == spacerIndex && moduleArray[i].semester == null ||
        moduleArray[i].spacer == spacerArray.length-1 && moduleArray[i].bestanden){


  
        //trigger css animation by updating class

        //get jsx elem
        let elem = document.getElementById(moduleArray[i].id)

        //spacer prop
        //const spacerOpen: boolean = spacerArray[spacerIndex].isOpen
       

        //check 
        if(elem != null){

          elem.classList.remove("highlight")
          const c = elem.offsetWidth

          //spawn /despawn mods
          
          if(isOpen){
            elem.classList.remove("despawn")

          }
          else elem.classList.add("despawn")
        }
      }
    }
  }
  //set how many semesters
  function semesterDropDownFunction(option: number): void{

    setSemesterCount(option)
  }
  //colors the modules
  function colorModules(): void{

    

    if(spacerArray.length == 0 || spacerArray.length == 1)return

    

    //get shorter vars
    const m: modulProps[] = [...moduleArray]
    const ver: vertiefung = chosenVertiefung
    
    //result array
    let toBeColored: coloredModul[] = []

    //loop through all mods
    for(let i = 0; i < m.length; i++){

      //mod has no spacer (not shown) or spacers are empty
      if(m[i].spacer < 0 || spacerArray.length == 0)continue

      //check if parent spacers allows coloring
      const parentSpacerAllowsColoring: boolean = spacerArray[m[i].spacer].modsColored

      //if parent spacer does not allow coloring 
      //we need their child mods to be colored white
      if(!parentSpacerAllowsColoring){


        //recolor white
        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.white
        }
        //only if mod is not colored white
        if(m[i].color != ModulColor.white)toBeColored.push(newColoredMod)

        //skip the rest as futher coloring is prohibited
        continue
      }



      //start the coloring process

      //get the sum lp of all pflicht mods
      //to calculate what mods need to when to be marked red -> example: only 6 lp are remaining and one pflicht mod => mark all other mods red 
      const allPflicht: number = getAllPflichtPointsOfSpacer(m[i].spacer, moduleArray, chosenVertiefung)
      const remaining: number = getRemainingPointsOfSpacer(spacerArray[m[i].spacer])
      const own: number = m[i].lp

      //mark modules red -> not enough points in spacer 
      if(!isPflichtMod(m[i], chosenVertiefung) && !((remaining - allPflicht) >= own)){

        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.red
        }
        
        if(m[i].color != ModulColor.red)toBeColored.push(newColoredMod)
      }

      //white (in scroller and pflicht or pflicht in ver)
      else if(m[i].semester == null && (m[i].katalog == ModulKatalog.pflicht || m[i].pflicht_in?.includes(ver.kurz))){

        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.white
        }
        if(m[i].color != ModulColor.white)toBeColored.push(newColoredMod)
      }

      //green (empfohlen fuer ver)
      else if(m[i].empfohlen_fuer?.includes(ver.kurz)){

        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.green
        }
        if(m[i].color != ModulColor.green)toBeColored.push(newColoredMod)      
      }

      //red (forbidden in ver or spacer left points are not sufficient)
      else if(m[i].nicht_fuer?.includes(ver.kurz)){

        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.red
        }
        if(m[i].color != ModulColor.red)toBeColored.push(newColoredMod)  
      }

      //yellow all remaining
      else if(m[i].color != ModulColor.yellow){

        const newColoredMod: coloredModul = {
        
          index: i,
          color: ModulColor.yellow
        }
        toBeColored.push(newColoredMod)     
      }
    }
    //update mod array
    //state change only when at least one mod has been changed
    if(toBeColored.length > 0){

      //update array
      for(let i = 0; i < toBeColored.length; i++){

        const index: number = toBeColored[i].index
        const color: string = toBeColored[i].color

        m[index].color = color
      }
      setModule(m)
    }
  }



  /* <--- Header Functions ---> */
  function changeStudiengang(newStudiengang: studiengang): void{

    //update studiengang 
    if(studiengang != newStudiengang){


    }

    //hide popup
    setShowChangeStudiengangPopup(false)
  }










  /* <--- Vertiefung Wählen/Ändern ---> */

  //setter function for actual updating the ver
  function voteVertiefung(vertiefung: vertiefung): void{

    if((vertiefung == chosenVertiefung && chosenVertiefung.kurz != "Ver") || studiengang.name == "Studiengang")return

    verHasChanged = true

    //update the displayed text
    setVertiefung(vertiefung)

    //update the spacers 
    const spacerArgs: initSpacerArrayProps = {

      hideModules: hideModules,
      chosenVertiefung: vertiefung,
      studiengang: studiengang
    }

    //we need to pass vertiefung as setVertiefung is async and has not been updated yet
    setSpacerArray(getSpacerArray(spacerArgs))

    //update spacer prop of mods
    let m: modulProps[] = [...moduleArray]
    
    for(let i = 0; i < m.length; i++){

      m[i].spacer = getSpacerIndex(studiengang, m[i].katalog, vertiefung, m[i].pflicht_in)
    }
    setModule(m)
  }

  function checkVoteVertiefung(vertiefug: vertiefung): void{

    //no conflicted mods => directly change ver
    //otherwise popup needs to be done
    if(conflictedModsPopup(vertiefug) == false){

      voteVertiefung(vertiefug)
    }
  }
  
  function conflictedModsPopup(vertierung: vertiefung): boolean{


    //we need to check if the ver has changed and if not we can directly return
    if(vertierung == chosenVertiefung){

      return false
    }

    //what ver is now aimed at (potential new one)
    setNewVertiefung(vertierung)




    //get list of all mods that needs to be resettet
    
    //what mods are affected?

    //mod.katalog == "prak" => alle praktika
    //mod.katalog != "plficht prak oder einf" && mod.nicht_fuer == "neue vertiefung" 
    //mod.katalog == "einf" => einfuerungs module
    
    //the mods are splitted into two different lists, first the simple list and second the complex list
    //simple list 
    let simpleList: modulProps[] = []

    //loop all mods
    for(let i = 0; i < moduleArray.length; i++){

      //mod is currently chosen or marked as passed
      if((moduleArray[i].semester != null && moduleArray[i].holder != null) || moduleArray[i].bestanden){


        //all ver mods that are forbidden
        if(moduleArray[i].nicht_fuer?.includes(chosenVertiefung.kurz)){

          simpleList.push(moduleArray[i])
        }

        //all praktika
        if(moduleArray[i].katalog == ModulKatalog.prak){

          simpleList.push(moduleArray[i])
        }      
      }
    }

    //here comes the complicated part
    //we must check now what spacers are overfilled
    //e.g. spacer has max of 12points but curr has 18 ---> 1 of 3 mods needs to be removed
    //with the complext list of cause 
    
    //show popup by updating the conflicted complex list
    //what mods need to be placed in the complex list?
    
    
    //get the new spacers
    const spacerProps: initSpacerArrayProps = { 

      hideModules: hideModules,
      chosenVertiefung: vertierung,
      studiengang: studiengang
    }
    
    const newSpacers: spacerProps[] = getSpacerArray(spacerProps)

    const updateSpacerProps: updateSpacerProps = {

      modulArray: moduleArray,
      vertiefung: vertierung,
      spacerArray: newSpacers,
      studiengang: studiengang
    }
    const spacerPoints:number[] = getSpacerPoints(updateSpacerProps)

    //at this points spacerPoints contain the current points of the spacers
    //if they were actually applied

    let complexList: complexConflictListProps[] = []
    
    for(let i = 0; i < newSpacers.length; i++){

      //we need to calculate the overflow points by subtracting the curr points from the max points
      //calculate lp overflow per spacer
      let overflow: number = spacerPoints[i] - newSpacers[i].maxPoints

      //if overflow is positive we need to add all depending mods to the complex list 
      if(overflow > 0){

        //we need to get all depending mods from config aswell 
        const actualMods: modulProps[] = getSpacerVotedMods(updateSpacerProps)[i]

        //add all mods to a complex list
        const props: complexConflictListProps = {

          listOfConflictedMods: actualMods,
          minLpToBeReset: overflow
        }
        complexList.push(props)
      }
    }
    //update state objects
    setSimpleListOfConflictedMods(simpleList)
    setComplexListOfConflictedMods(complexList)

    return simpleList.length > 0 || complexList.length > 0
  }
  
  //handle the callback from the conflicted mods popup
  function callBackFromVerChangePopup(newVer: vertiefung, modID: string, type: string, simpleList: boolean, listOfMods?: modulProps[]): void{


    //if type == abort => dont change ver
    if(type == "abort"){

      setNewVertiefung(chosenVertiefung)
    }

    //if type == resetAll => reset all mods
    else if(type == "resetAll" && (typeof listOfMods != "undefined" || listOfMods != null)){

      setNewVertiefung(newVer)

      let modCounter: number = 0

      //now we need to detect all conflicted mods 
      //we get as passed as optional parameter
      //now loop throught all of this mods and reset them
      for(let i = 0; i < listOfMods.length; i++){

        const index = getIndex(listOfMods[i].id)
        if(index == null)return
        modCounter++

        setSimpleListOfConflictedMods([])
        setComplexListOfConflictedMods([])
        setModulProp(index, "reset", true)
      }

      //update status
      if(modCounter > 1){

        updateStatus2(modCounter+" Module zurückgesetzt")
      }
      else{

        updateStatus2(modCounter + " Modul zurückgesetzt")
      }
      
      return 
    }

    //if type == "reset" => reset mod in modularray and delete it from the confliclted mods state

    //get mod index in array
    const modIndex: number | null = getIndex(modID)

    //null checking
    if(modIndex == null){

      //throw error
      return
    }

    
    if(type == "reset"){

      //reset mod
      setModulProp(modIndex, "reset", null)
    }
    //if type == "voluntary" => same but mark mod as voluntary
    if(type == "voluntary"){

      //voluntary mod
      setModulProp(modIndex, "voluntary", true)
    }

    //delete it from the list
    if(simpleList)deleteModFromSimpleList(modID)
    else deleteModFromComplexList(modID)
  }
















  /* <--- Option Functions ---> */
  //we cannot directly change the state bool from the options as additional steps are required
  //so we use this wrapper function
  function toggleStatusAutoBlendOut(bool: boolean): void{

    //statusAutoBlendOutVar = bool
    setStatusAutoBlendOut(bool)
    if(bool == true){

      clearStatusTimersAndRestart()
    }
  }
  //hide or show like id / angebot / etc.
  //classselector to sleect elems and bool to know true/false => hide / show
  function toggleHideOrShowElem(cssClassSelector: string, bool: boolean): void{

    const elem = document.querySelectorAll(cssClassSelector)
    //show
    if(bool){

      for(let i = 0; i < elem.length; i++){

        elem[i].classList.remove("none")
      }
    }
    else{

      for(let i = 0; i < elem.length; i++){

        elem[i].classList.add("none")
      }
    }
  }














  /* <--- NavBar Function ---> */ 

  //set all modules back and clear status and lp
  function resetAll(){

    //reset vertiefung
    voteVertiefung(getInitVertiefung())   

    for(let i = 0; i < moduleArray.length; i++){

      setModulProp(i, "reset", null)
    }
    
    
  }
  //show hide options container
  //is called from navbar button options
  function toggleOptions(): void{

    setShowOptions(!showOptions)
  }
  function toggleFeedback(): void{

    setShowFeedback(!showFeedback)
  }
  //show ver change popup
  function toggleVerChange(): void{

    setShowVerChange(!showVerChange)
  }
  function changeTheme(){

    //login Page
    changeThemeOfLoginPage()

    //normal Page
    changeThemeOfMainPage()
    
    function changeThemeOfMainPage(): void{

      //VARS
      const white = getCSSVar("--white")
    const seaSaltWhite = getCSSVar("--sea-salt-white")
    const aliceWhite = getCSSVar("--alice-white")
    const antiFlashWhite = getCSSVar("--anti-flash-white")
    const platinum = getCSSVar("--platinum")
    
    const marineBlue = getCSSVar("--marine-blue")
    const oxfordBlue = getCSSVar("--oxford-blue")

    const middark = getCSSVar("--middark")
    const dark = getCSSVar("--dark")
    const richDark = getCSSVar("--rich-dark")
    const barkleyBlue = getCSSVar("--barkley-blue")
    const slateGray = getCSSVar("--slate-gray")
  
    const loginShadow2Bright = "none"
    const loginShadow2Dark = getCSSVar("--loginShadow2")

      

      //set dark
      if(isBright){

      setCSSVar("--background1", middark)
      setCSSVar("--background2", dark)
      setCSSVar("--background3", barkleyBlue)
      setCSSVar("--highlight", oxfordBlue)
      setCSSVar("--foreground", white)
      setCSSVar("--foreground2", slateGray)

      //update boxshadow
      setCSSVar("--loginshadow2", loginShadow2Dark)

      //hide fadetile
      setCSSVar("--showFadeTile", "visible")

      setBright(!isBright)
      }
      //set bright
      else{

      setCSSVar("--background1", white)
      setCSSVar("--background2", aliceWhite)
      setCSSVar("--background3", platinum)
      setCSSVar("--highlight", marineBlue)
      setCSSVar("--foreground", richDark)
      setCSSVar("--foreground2", richDark)

      //update bow shadow
      setCSSVar("--loginshadow2", loginShadow2Bright)

      //hide fadetile
      setCSSVar("--showFadeTile", "none")

      setBright(!isBright)
      }
    }
    
    function changeThemeOfLoginPage(): void{

      //dark design
      const richDark = getCSSVar("--rich-dark")
      const raisinBlack = getCSSVar("--raisin-black")
      const charcoal = getCSSVar("--charcoal")
      const jet = getCSSVar("--jet")

      const loginShadow1 = getCSSVar("--loginshadow1")
      const loginShadow2 = getCSSVar("--loginshadow2")
      const insetShadow = getCSSVar("--insetShadow")
      const outsetShadow = getCSSVar("--outsetShadow")

      const cornerRadius = getCSSVar("--cornder-radius")
      const loginBorderBright = getCSSVar("--login-border-bright")
      const loginBroderBrightRadius = getCSSVar("--login-border-bright-radius")

      //bright design
      const platinum = getCSSVar("--platinum")
      const white = getCSSVar("--white")
      const seaSaltWhite = getCSSVar("--sea-salt-white")

      const emptyShadow = "none"

      //set dark
      if(isBright){

        setCSSVar("--loginshadow1", outsetShadow)
        setCSSVar("--loginshadow2", insetShadow)
        //tab shadow
        setCSSVar("--loginshadow2-copy", insetShadow)
        setCSSVar("--loginground1", raisinBlack)
        setCSSVar("--loginground2", charcoal)
        //input forms
        setCSSVar("--loginground2-copy", charcoal)
        setCSSVar("--loginground3", jet)
        setCSSVar("--foreground", seaSaltWhite)

        //remove border
        setCSSVar("--login-border", "none")
        setCSSVar("--login-border-radius", "0px")
        //add box shadow
        setCSSVar("--login-shadow2-copy", insetShadow)

        setBright(!isBright)
      }
      //set bright
      else{

        setCSSVar("--loginshadow1", outsetShadow)
        setCSSVar("--loginshadow2", emptyShadow)
        //tab shadow
        setCSSVar("--loginshadow2-copy", insetShadow)
        setCSSVar("--loginground1", platinum)
        setCSSVar("--loginground2", white)
        //input forms
        setCSSVar("--loginground2-copy", platinum)
        setCSSVar("--loginground3", seaSaltWhite)
        setCSSVar("--foreground", richDark)

        //set border
        setCSSVar("--login-border", loginBorderBright)
        setCSSVar("--login-border-radius", loginBroderBrightRadius)
        //remove box shadow
        setCSSVar("--loginshadow2-copy", emptyShadow)

        setBright(!isBright)
      }
    }

    function setCSSVar(name: string, value: string){

        document.documentElement.style.setProperty(name, value)
    }

    function getCSSVar(name: string){

        return getComputedStyle(document.documentElement).getPropertyValue(name);
    }
  }
  function downloadPDF(): void{

    //this two vars are only for the pdf downloader
    let pdfResultVoted: pdfResultVotedObject[] = []
    let pdfResultPassed: modulProps[] = []

    let modsPerSem: modulProps[] = []
 
    //get all voted mods
    for(let sem: number = 1; sem <= semesterCount; sem++){

      modsPerSem = []

      for(let mod = 0; mod < moduleArray.length; mod++){

        if(moduleArray[mod].semester == sem){

          modsPerSem.push(moduleArray[mod])
        }
      }

      const obj: pdfResultVotedObject = {

        semester: getSemester(sem),
        module: modsPerSem
      }
      pdfResultVoted.push(obj)
    }

    for(let mod = 0; mod < moduleArray.length; mod++){

      if(moduleArray[mod].bestanden){

        pdfResultPassed.push(moduleArray[mod])
      }
    }

    const props: pDFFileProps = {

      belegteModule: pdfResultVoted,
      bestandeneModule: pdfResultPassed,
      isComplete: isComplete
    }

    console.log(props)

    //Use reactPDF pdf function to access blob data
    pdf(PDFFile(props)).toBlob().then((blob) => {

      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      )
      //Create HTML link element
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        'studienverlauf.pdf',
      )

      // Append to body
      document.body.appendChild(link)

      // Start download
      link.click()

      // Clean up and remove the link
      link.parentNode!.removeChild(link)
    })
  }

  //log out button
  async function logOut(): Promise<any>{

    if(userData == null)return

    //safe userdata
    const bodyObj = JSON.stringify({
      
      username: userData.username,
      module_belegt: getBelegt(),
      module_bestanden: getBestanden(),
      vertiefung: chosenVertiefung.kurz,
      sort: "sort",
      theme: getTheme()
    })
            
    const fetchConfig = {
      method: 'POST',
                
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyObj
    };
           
    const response = await fetch('http://localhost:8000/database/safeUserdata.php', fetchConfig)
    await response.json().then(
    function(value){/*console.log(value)*/},
    function(error){console.log(error)})




    function getTheme(): string{

      if(isBright)return "bright"
      else return "dark"
    }
    function getBestanden(): string{

      let res = ""

      for(let i = 0; i < moduleArray.length; i++){

        if(moduleArray[i].bestanden){
          res += moduleArray[i].id + ";"
        }
      }
      return res
    }
    function getBelegt(): string{

      let res = ""

      for(let i = 0; i < moduleArray.length; i++){

        if(moduleArray[i].semester != null){
          res += moduleArray[i].semester + ":" + moduleArray[i].holder + "=" + moduleArray[i].id + ";"
        }
      }
      return res
    }
    setLoggedIn(false)
    setUserData(null)
  }









  /* <--- Check Functions ---> */ 

  //checks if the min points are reached
  //return true if min points are reached --> valid
  function checkMinPoints(modulProps: modulProps, curSem: number):boolean{

    const minPoints = modulProps.minPunkte
    //if no min points required --> valid
    if(minPoints === null)return true


    let lpToCurSem: number = 0

    //mind points required
    
    //count all points up to the current semester (without the current semester)
    const arr = [...moduleArray]
    for(let i = 0; i < arr.length; i++){

      if(arr[i].semester !== null && arr[i].semester! < curSem){
        
        //arr[i] is before curr
        lpToCurSem += arr[i].lp
      }
      if(arr[i].bestanden == true){

        lpToCurSem += arr[i].lp
      }
    }

    //check if collected points are enough
    if(minPoints <= lpToCurSem)return true
    return false
  }
  //checks if the vor modules are voted in an earlier semester
  //returns true if modul can be voted
  function checkVorModules(modulProps: modulProps, curSem: number, formal: boolean): boolean{

    let vor: string[]
    //no vor -> ok
    if(formal){vor = modulProps.vorModuleFormal}
    else{vor = modulProps.vorModuleInhalt}
    if(vor[0] == "")return true

    //the current semester of the base modul
    //the vor modules need to be BEFORE this

    const earliestSemester: number | null = getEarliestSemesterWhereAllVorModsAreDone(vor)

    //earliest semester +1 is the semester the mod can be chosen
  
    //if earliestSemester is null then the vor mods are not passed nor voted
    //or if the earliestSemester is equal to curSem
    if(earliestSemester == null || curSem <= earliestSemester)return false
    return true 
  }

  //check if the spacer of the mod has enough points to cover (also checks if the spacer contains pflicht mods)
  function checkSpacerPoints(modulProps: modulProps): boolean{

    const allPflicht: number = getAllPflichtPointsOfSpacer(modulProps.spacer, moduleArray, chosenVertiefung)
    const remaining: number = getRemainingPointsOfSpacer(spacerArray[modulProps.spacer])
    const own: number = modulProps.lp
    if((remaining - allPflicht) >= own || isPflichtMod(modulProps, chosenVertiefung))return true
    return false
  }

  function checkAngebot(modulProps: modulProps, newSem: number): boolean{

    //ganzjahrig
    if(modulProps.angebot == ModulAngebot.jedes)return true

    const sem = getSemesterType(newSem)
    const mod = (): string => {
      if(modulProps.angebot == ModulAngebot.sose)return ModulAngebot.ssKurz
      else return ModulAngebot.wsKurz 
    }

    if(sem == mod())return true
    return false   
  }

  

  //this function is only called for modules from
  //scroller ---> dropPanel
  //outer checker function (checks the others)
  function checkVote(modulProps: modulProps, curSem: number):boolean{ 

    //init return (if vote is valid or not) value as true
    let result: boolean = true
    //reason object ---> status update reason
    let reason: votingModulReasons = {

      minPunkte: null,
      vorModule: null,
      verForbidden: false,
      spacerPoints: false
    }
    if(!checkAngebot(modulProps, curSem)){

      reason.angebot = getSemesterType(curSem)
      result = false
    } 
    if(!checkSpacerPoints(modulProps)){

      reason.spacerPoints = true
      result = false
    }
    if(!checkMinPoints(modulProps, curSem)){

      reason.minPunkte = modulProps.minPunkte
      result = false
    }
    if(!checkVorModules(modulProps, curSem, true)){

      reason.vorModule = modulProps.vorModuleFormal
      result = false
    }
    if(modulProps.color == ModulColor.red){

      reason.verForbidden = true
      result = false
    }
  
    updateStatus(modulProps, reason)
    return result
  }

  //removes dependent mods back to the scroller when the conditional mod is removed
  //opens konfliktbehandlung when formal vor mods are been resettet
  function removeDependentModules(): void{

    let listOfAllResettetMods: modulProps[] = []

    for(let i = 0; i < moduleArray.length; i++){

      //modul ist belegt und hat voraussetzung
      if(moduleArray[i].semester != null && moduleArray[i].vorModuleFormal.length > 0){

        //get vorausgesetztes modul 
        let vorMods: modulProps[] = []

        for(let j = 0; j < moduleArray[i].vorModuleFormal.length; j++){

          const vorMod: modulProps | null = searchModul(moduleArray[i].vorModuleFormal[j])
          if(vorMod != null){

            //vorausgesetztes modul ist nicht oder zu spaet belegt
            if(vorMod.semester == null || vorMod.semester >= moduleArray[i].semester!){

              //remove 
              setModulProp(i, "reset", true)
              listOfAllResettetMods.push(moduleArray[i])
              if(!listOfAllResettetMods.includes(vorMod)){

                listOfAllResettetMods.push(vorMod)
              }
            }
          }
        }  
      }
    }

    if(listOfAllResettetMods.length > 0){

      let status: string = "Module "

      for(let i = 0; i < listOfAllResettetMods.length; i++){

        status += listOfAllResettetMods[i].name
        if(i != listOfAllResettetMods.length-1) status += ", "
      }
      status += " wurden zurückgesetzt"
  
      updateStatus2(status)
    }
  }

  //show popup with asking user what mods should be resetted
  //gets passed the 
  function askForDependentMods(inputMod: modulProps, newSemester: number | null, newHolder: number | null): void{

    //override state with new resetPopup
    
    //1. get inhalt and formal vor dependend mods
    //2. create resetModPopupProps
    //3. setProps as State to show Popup
    //4. callback Function 

    const formalVorMods: modulProps[] = getAllDependentMods(inputMod, newSemester, true)
    const inhaltVorMods: modulProps[] = getAllDependentMods(inputMod, newSemester, false)

    const showResetModPopup = (): boolean => formalVorMods.length > 0 || inhaltVorMods.length > 0 ? true : false

    const popupProps: resetModPopupProps = {

      show: showResetModPopup(),
      inputMod: inputMod,
      formalMods: formalVorMods,
      inhaltMods: inhaltVorMods,
      callBack: callBackFromResetVorModPopup
    }
    console.log(popupProps)
    setResetVorModsPopup(popupProps)
  }
  
  function callBackFromResetVorModPopup(toBeresetted: modulProps[]): void{

    for(let i = 0; i < toBeresetted.length; i++){

      const index: number | null = getIndex(toBeresetted[i].id)

      if(index != null){

        setModulProp(index, "reset", true)
      }
      //throw error
      else{

      }
    }
  }

  

  
  





  
  /* <--- Overview Funtions --->*/ 

  //updates the status bar 
  //gets the latest dropped modul and a reason (ok/too few points/...)
  function updateStatus(modul: modulProps, reason: votingModulReasons): void{

    /* <--- Checking the reason ---> */    
    if(reason.angebot){

      setStatus(getAngebotError(modul.name, modul.angebot))
    }

    else if(reason.bestanden){

      setStatus(getBestandenMessage(modul.name))
    }
    else if(reason.bestanden != undefined && !reason.bestanden){

      setStatus(getResetMessage())
    }
    //Spacer points nicht ausreichend
    else if(reason.spacerPoints){

      setStatus(getSpacerPointsError(modul.spacer))
    }

    //Mindest Punktzahl nicht erreicht 
    else if(reason.minPunkte != null && modul.minPunkte != null){

      setStatus(getErrorPunkte(modul.name, modul.minPunkte))
    }
    //Vorausgesetzte Module nicht erfuellt
    else if(reason.vorModule != null && modul.vorModuleFormal !=  null){

      setStatus(getErrorVor(modul.name, modul.vorModuleFormal))
    }
    //Modul in Vertiefung verboten
    else if(reason.verForbidden){

      setStatus(getVerForbidden(modul.name))
    }
    //Success
    else{

      setStatus(getSuccess(modul.name))
    }

    clearStatusTimersAndRestart()
  }

  //for general propose (feedback, reset)
  function updateStatus2(status: string): void{

    clearStatusTimersAndRestart()
    setStatus(status)
  }
  
  function updateLp(): void{

    let sum = 0
    //get all chosen Modules
    for(let i = 0; i < moduleArray.length; i++){

      //abort condition (negative)
      if(moduleArray[i].isVoluntarily == true){

        continue
      }

      //positive condition
      if(moduleArray[i].semester != null && moduleArray[i].holder != null || moduleArray[i].bestanden){

        //add up the lp
        sum += moduleArray[i].lp
      }
    }
    
    //update state
    setLp(sum)
  }
  //update the points
  function updateSpacer(): void{

    //all mods spacer's prop contain the correct spacer so we can calculate the points without
    //any specific hard coded config functions

    if(spacerArray.length == 0)return
    let spacerPoints: number[] = []

    //init
    for(let i = 0; i < spacerArray.length; i++){

      //init so we cann just add points later 
      spacerPoints[i] = 0
    }

    //fill
    for(let i = 0; i < moduleArray.length; i++){


      if((moduleArray[i].semester != null || moduleArray[i].bestanden) && !moduleArray[i].isVoluntarily){

        spacerPoints[moduleArray[i].spacer] += moduleArray[i].lp
      }
    }
    
    //update
    for(let i = 0; i < spacerArray.length; i++){

      setSpacerProp(i, "points", spacerPoints[i])
    }
  }
  
  
  //called when mouse hovers over semester with dragged mod
  function modHoverSemester(semesterNumber: number, start: boolean): void{

    /*
    //manual turn of with passing false start param
    if(!start){

      markSemesterWarningDropTarget(semesterNumber, false)
      markSemesterInvalidDropTarget(semesterNumber, false)
      return
    }

    //mod hover over semester
    if(currentDraggedMod != null){

      const mod: modulProps = currentDraggedMod
      
      colorSemesters(mod, semesterNumber)
    }
    */

    console.log("outdated modhoverSemFuncCall")
  }
  




  /* <--- Modul Funtions --->*/ 

  //is triggered through info button of modul
  function showInfo(props: modulProps):void{

    const text: popupText = {

      headline: <span className='capitalFont'>{props.name}</span>,
      additionalText: <p className='mediumFont'>{props.inhalt}</p>
    }

    setPopupText(text)
  }

  //mark modul as passed by updating the semester and holder prop in the state
  function modulDone(props: modulProps): void{

    
    //decide what to do
    if(props.bestanden){

      undoBestanden()
    }
    else{

      bestanden()
    } 
    //updateSpacer()

    function bestanden(): void{

      //to update status
    const reason: votingModulReasons = {

      minPunkte: null,
      vorModule: null,
      verForbidden: false,
      spacerPoints: false
    }

    //find the modul
    const index = getIndex(props.id)
    

    //checks if modul has min points and only if enough mods are marked as passed this returns true
    const minPoints = (): boolean => {

      if(props.minPunkte == null)return true
      else if(getAllPointsFromBestanden(moduleArray) >= props.minPunkte)return true
      return false
    }
    //checks vor mods and if they are marked as passed
    const vorMods = (): boolean => {

      return allVorModulesAreBestanden(props, moduleArray)
    }
    //modul exist and all conditions are fullfilled
    if(index !== null && minPoints() && vorMods()){


      setModulProp(index, "bestanden", true)
      reason.bestanden = true

      //save the current spacer to maybe move it back later
      setModulProp(index, "oldSpacer", props.spacer)

      //move mod to bestanden spacer 
      setModulProp(index, "spacer", spacerArray.length-1)

      //if mod is in holder then remove it (unset vote)
      setModulProp(index, "unvote", null)

      setModulProp(index, "show", true)
    }
    else if(!vorMods()){

      reason.vorModule = props.vorModuleFormal
    }
    else if(!minPoints()){

      reason.minPunkte = props.minPunkte
    }
    updateStatus(props, reason) 
    }
    function undoBestanden(): void{

      const index: number | null = getIndex(props.id)

      if(index == null)return

      setModulProp(index, "bestanden", false)
      setModulProp(index, "spacer", props.oldSpacer)

      const status: string = ModulStatus.Erfolg1 + props.name + ModulStatus.ResetModul
      updateStatus2(status)
    }
  }














  /* <--- Operations ---> */ 



  /* <--- Utility ---> */

  //scrolls to mod or prints error
  function scrollToMod(modulId: string): void{

    const elem: HTMLElement | null = document.getElementById(modulId)
    if(elem == null)return 

    //check if mod is in holder
    const holderOfElem: HTMLElement | null = getHolderFromModId(modulId) as HTMLElement

    //mod is in holder
    if(holderOfElem != null){

      //scroll to holder
      holderOfElem.scrollIntoView({block: "center", behavior: "smooth"})

      //highlight holder
      highlightComp(holderOfElem)
    }
    else{

      //scroll to elem
      elem.scrollIntoView({block: "center", behavior: "smooth"})

      //highlight mod in scroller
      highlightComp(elem)
    }
  }
  function highlightComp(comp: HTMLElement): void{
    
    comp.classList.remove("highlight")
    const c = comp.offsetWidth
    comp.classList.add("highlight")
    
    //setTimeout(() => {comp.classList.remove("highlight")}, modulHighlightTime)
  }
  //gets sem and holder number and returns if the holder is currently used by
  //a mod or not
  function isHolderFree(sem: number, hol: number): boolean{

    //holder does not exist 
    if(hol < 1 || hol > holderCount)return false

    //check if frist holder is empty
    const isHolderFree: boolean = document.getElementById("semester"+sem)?.children[hol+1].firstChild?.firstChild == null ? true : false

    return isHolderFree
  }
  //moves passed modul to next free holder of semester 
  function moveModToNextFreeHolder(modul: modulProps, sem: number): void{

    //get all holders of that semester 
    const allHolder: NodeListOf<Element> | undefined = document.getElementById("semester" + sem)?.querySelectorAll(".holder")
    
    //throw error
    if(typeof allHolder == "undefined"){

      console.log("error - 603 - no holders found")
      setFatalError(true)
    }
    
    //loop holder till next free appears
    for(let i = 1; i <= allHolder!.length; i++){

      //found next free holder
      if(isHolderFree(sem, i)){

        //move modul to this holder
        const index = getIndex(modul.id)

        //throw error
        if(index == null){

          console.log("error - 604 - modul not found")
          setFatalError(true)
          return 
        }
  
        //update prop
        setModulProp(index, "vote", sem+":"+i)
        break
      }
    }
  }
  //swaped to mods in the same semester
  function swapModsInSameSemester(mod1: modulProps, mod2: modulProps){

    const index1: number | null = getIndex(mod1.id)
    const index2: number | null = getIndex(mod2.id)

    //throw error
    if(index1 == null || index2 == null){

      console.log("error - 604 - modul not found")
      setFatalError(true)
      return 
    }

    const place1: string = mod1.semester + ":" + mod1.holder
    const place2: string = mod2.semester + ":" + mod2.holder

    setModulProp(index1, "vote", place2)
    setModulProp(index2, "vote", place1)
  }
  //directly votes modul without checking any except if the holder is free
  //if holder not free it swapes with next free one
  function directVoteModulToNextFreeHolder(modul: modulProps, newSemester: number, newHolder: number): void{

    //holder is not free => move mod to next free holder
    if(!isHolderFree(newSemester!, newHolder)){

      //get the mod that the holder contains 
      const modInHolder: modulProps | null = getModulByPos(newSemester!, newHolder)

      //throw error 
      if(modInHolder == null){

        console.log("error 506")
        setFatalError(true)
        return 
      }
      
      //but if it is an inter semester voting => just swap
      if(modul.semester == modInHolder.semester){

        swapModsInSameSemester(modul, modInHolder)

        //important to return as the swap is fullfilled
        return 
      }
      //new modul is not already voted in the same semester => move to next free one
      else{

        moveModToNextFreeHolder(modul, newSemester!)
        return 
      }
    }
  }


  /* <--- Search Functions ---> */

  //returns modul from state array with searched id
  function searchModul(id: string):modulProps | null{

    for(let i = 0; i < moduleArray.length; i++){
      
      if(moduleArray[i].id == id)return moduleArray[i]
    }
    return null
  }
  //returns index in state array of id from modul
  function getIndex(id: string): number | null{

    for(let i: number = 0; i < moduleArray.length; i++){

      if(moduleArray[i].id === id)return i
    }
    return null
  }
  function getIndexKat(kat: string): number | null{

    for(let i = 0; i < moduleArray.length; i++){

      if(moduleArray[i].katalog == kat){
        return i
      }
    }
    return null
  }
  //get the holder jsx element or null from mod id
  function getHolderFromModId(modId: string): Element | null{

    
    const allHol: NodeListOf<Element> = document.querySelectorAll(".holder")

    //loop all holder
    for(let i = 0; i < allHol.length; i++){

      //modul holder
      const childMod: Element = allHol[i].children[0]
      
      //no mod in this holder
      if(childMod.firstChild == null)continue
      else{
        //modulholder => chil[1] == modulInfos => chil[0] == id
        const childModId: string = childMod.children[1].children[0].innerHTML.split(" ")[2]
        //const childModId: string = childMod.querySelector(".modulInfos")?.querySelector(".id")?.innerHTML.split(" "[1])
        
        if(childModId == modId)return allHol[i]
      }
    }
    return null
  }



  /* <--- Getter / Setter --> */

  function setModulProp(index: number, property: string, value: any): void{

    //make copy of state array
    let arrayObjects = [...moduleArray]
    
    //make copy of mutatating item
    let alteredObject = arrayObjects[index]


    //mutate object 
    switch(property){

      case "bestanden":{

        alteredObject.bestanden = value
        //alteredObject.show = !value
        break
      }

      case "semester":{

        alteredObject.semester = value
        break
      }

      case "holder":{

        alteredObject.holder = value
        break
      }

      case "vote":{

        const semester = parseInt(value.split(":")[0])
        const holder = parseInt(value.split(":")[1])
        alteredObject.semester = semester
        alteredObject.holder = holder
        alteredObject.show = false
        alteredObject.bestanden = false
        break
      }

      case "unvote":{

        alteredObject.semester = null
        alteredObject.holder = null
        break
      }

      case "reset":{

        alteredObject.semester = null
        alteredObject.holder = null
        alteredObject.bestanden = false
        alteredObject.show = true
        alteredObject.isVoluntarily = false
        break
      }
      case "show":{

        alteredObject.show = value
        break
      }
      case "color":{

        alteredObject.color = value
        break
      }
      case "voluntary":{

        alteredObject.isVoluntarily = value
        break
      }
      case "spacer":{

        alteredObject.spacer = value
        break
      }
      case "oldSpacer":{

        alteredObject.oldSpacer = value
        break
      }
    }

    
    //put erything back together
    arrayObjects[index] = alteredObject

    //update State
    setModule(arrayObjects)
  }
  function setSpacerProp(index: number, property: string, value: any): void{
    
     //make copy of state array
     let arrayObjects = [...spacerArray]
    
     //make copy of mutatating item
     let alteredObject = arrayObjects[index]


    switch(property){

      case "points": 
        alteredObject.points = value
        break
      case "show":
        alteredObject.show = value
        break  
      case "reset":
        alteredObject.show = false
        alteredObject.isOpen = false
        alteredObject.points = 0
        break  
    }

    arrayObjects[index] = alteredObject
    setSpacerArray(arrayObjects)
  }
  function getModulByPos(sem: number, hol: number): modulProps | null{

    const modulHolder: Element | null = document.getElementById("modulHolder" + sem.toString() + ":" + hol.toString())
    
    //throw error
    if(modulHolder == null){

      console.log("error - 702 - modul holder not found")
      setFatalError(true)
      return null
    }

    //check if holder holds actual modul
    if(modulHolder.children.length < 1){

      return null 
    }

    //get id as child 
    const modId: string | undefined = modulHolder.querySelector(".id")?.innerHTML

    //throw error
    if(typeof modId == "undefined"){

      console.log("error - 703 - modid undefined")
      setFatalError(true)
      return null
    }

    //get mod from id and return it
    return searchModul(modId)
  }
  function getAllDependentMods(inputMod: modulProps, newSemester: number | null, formal: boolean): modulProps[]{

    let allModsThatHaveInputModAsVor: modulProps[] = []

    for(let i = 0; i < moduleArray.length; i++){

      const vorIds: string[] = formal ? moduleArray[i].vorModuleFormal : moduleArray[i].vorModuleInhalt

      //mod found
      if(vorIds.includes(inputMod.id)){

        //check if mod is after inputMod
        //depending mod is not voted => skip
        if(moduleArray[i].semester == null){

          continue
        }
        //inputMod is in Scroller
        else if(newSemester == null){

          allModsThatHaveInputModAsVor.push(moduleArray[i])
        }
        //depending mod is in same or earlier semester => add to list 
        else if(moduleArray[i].semester! <= inputMod.semester!){

          allModsThatHaveInputModAsVor.push(moduleArray[i])
        }
      }
    }
    console.log(allModsThatHaveInputModAsVor)
    return allModsThatHaveInputModAsVor
  }
  //returns array of depending mods on passed input mod 
  function getAllDependentMods_Legacy(inputMod: modulProps, newSemester: number | null, formal: boolean): modulProps[]{

    const vorIds: string[] = formal ? inputMod.vorModuleFormal : inputMod.vorModuleInhalt
    let result: modulProps[] = []

    console.log(vorIds)

    //loop vor mods
    for(let i = 0; i < vorIds.length; i++){

      const vorMod: modulProps | null = searchModul(vorIds[i])

      //vor mod found
      if(vorMod != null){

        //check semester
        if((newSemester == null && vorMod.semester != null) || (newSemester! >= vorMod.semester!)){
          
          result.push(vorMod)
        }
      }
      //throw error
      else{

      }
    }
    return result
  }
  //returns the earliest semester where all vor mods passed are fullfilled or null if not
  function getEarliestSemesterWhereAllVorModsAreDone(vorMods: string[]): number | null {

    if(vorMods.length == 0)return 1

    let result: number = 1 

    for(let i = 0; i < vorMods.length; i++){

      const vorMod: modulProps = moduleArray[getIndex(vorMods[i])!]
      const vorModSemester: number | null = vorMod.semester
      const vorModBestanden: boolean = vorMod.bestanden

      //skip if vor mod is passed
      if(vorModBestanden)continue

      //at least one vor mod is not done
      if(vorModSemester == null)return null

      //get ealiest semester
      if(result < vorModSemester)result = vorModSemester
    }
    return result
  }
  function getEarliestSemesterWhereAllPointsAreDone(points: number): number | null {

    let pointsToSem: number = 0
    let result = null

    for(let j = 1; j <= semesterCount; j++){

      for(let i = 0; i < moduleArray.length; i++){

        if(moduleArray[i].semester == j){

          pointsToSem += moduleArray[i].lp
        }
      }
      if(pointsToSem >= points){
        result = j
        break
      }
    }
    return result 
  }
  //gets the semester e.g. 1 and return if summer or winter semester
  function getSemesterType(sem: number): string{

    //ss or ws
    //const isSummer: boolean = (document.querySelectorAll(".semester")[sem-1].firstChild?.firstChild as HTMLElement).innerHTML.includes(ModulAngebot.ssKurz)
    const isSummer: boolean = ((document.getElementById("semester"+sem))?.children[1].firstChild as HTMLElement).innerHTML.includes(ModulAngebot.ssKurz)
    return isSummer ? ModulAngebot.ssKurz : ModulAngebot.wsKurz
  }
  function getSemester(sem: number): string{

    return (document.getElementById("semester"+sem)?.children[1].firstChild as HTMLElement).innerHTML
  }
  //update state for current dragged mod or null for no mod being dragged
  function setCurrentDraggedModWrapper(modul: modulProps | null): void{

    setCurrentDraggedMod(modul)
  }
  function getCurrentTime(): string{

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return day + "." + month + "." + year + " - " + hour + ":" + minutes + ":" + seconds
  }
  //sets a var to know when the session started
  function setSessionStart(): void{

    sessionStart = getCurrentTime()
  }
  //calculates time difference between session start and current time and returns if certain amount of secs has passed
  function getSessionPassedTime(secondsPassed: number): boolean{

    if(sessionStart == null)return false

    //get current time
    //18:12:30
    const currentTime = getCurrentTime().split(" ")[2]
    const startTime = sessionStart.split(" ")[2]

    const differenceHour = parseInt(currentTime.split(":")[0]) - parseInt(startTime.split(":")[0])
    const differenceMinutes = parseInt(currentTime.split(":")[1]) - parseInt(startTime.split(":")[1])
    const differenceSeconds = parseInt(currentTime.split(":")[2]) - parseInt(startTime.split(":")[2])

    //calculate difference
    const difference = differenceHour * 60 * 60 + differenceMinutes * 60 + differenceSeconds

    return difference > secondsPassed
  }
  //return array of strings with the inhalt vor of mods
  function getInhaltVorNamesOfMod(modul: modulProps): string[]{

    const allVorModIds: string[] = modul.vorModuleInhalt

    let allVorModNames: string[] = []

    for(let i = 0; i < allVorModIds.length; i++){

      const index: number | null = getIndex(allVorModIds[i])

      //throw error
      if(index == null){

      }
      else{

        allVorModNames.push(moduleArray[index].name)
      } 
    }
    return allVorModNames
  }
  function updateStudiengangState(trigger: studiengang): void{

    setStudiengang(trigger)
  }


  


  /* <--- Konfliktbehandlung ---> */

  function deleteModFromSimpleList(modulID: string): void{

    let result: modulProps[] = []

    for(let i = 0; i < simpleListOfConflictedMods.length; i++){

      if(simpleListOfConflictedMods[i].id != modulID){

        result.push(simpleListOfConflictedMods[i])
      }
    }
    setSimpleListOfConflictedMods(result)
  }
  function addModListToComplexList(mods: modulProps[], resetLp: number): void{

    const complexList: complexConflictListProps[] = [...complexListOfConflictedMods]

    const newElem: complexConflictListProps = {

      listOfConflictedMods: mods,
      minLpToBeReset: resetLp
    }

    complexList.push(newElem)

    setComplexListOfConflictedMods(complexList)
  }
  //removes mod from complex list and updates lp
  function deleteModFromComplexList(modID: string){

    let newComplexList: complexConflictListProps[] = []

    for(let i = 0; i < complexListOfConflictedMods.length; i++){

      //list of mods in conflict
      const singleListMods: modulProps[] = complexListOfConflictedMods[i].listOfConflictedMods
      //how many lp needed to solve conflict 
      let singleResetLp: number = complexListOfConflictedMods[i].minLpToBeReset
      //new list obj
      const singleResultListMods: modulProps[] = []

      //loop mods
      for(let j = 0; j < singleListMods.length; j++){

        //only add mods that are not being removed
        if(singleListMods[j].id != modID){

          singleResultListMods.push(singleListMods[j])

        }
        else{
          
          //update lp
          singleResetLp -= singleListMods[j].lp
        }
      }

      let solved: boolean = false
      //solved => remove 
      if(singleResetLp < 1){

        solved = true 
      }

      //create new comples list props elem
      const props: complexConflictListProps = {

        listOfConflictedMods: singleResultListMods,
        minLpToBeReset: singleResetLp
      }
      //add to final result
      if(!solved)newComplexList.push(props)
    }

    //update state object
    setComplexListOfConflictedMods(newComplexList)
  }
  function updateComplexListOfConflictedMods(): void{

    let newList: complexConflictListProps[] = []
  
      //look for complex lists to be removed when
      for(let i = 0; i < complexListOfConflictedMods.length; i++){
  
        const lp: number = complexListOfConflictedMods[i].minLpToBeReset
  
        //add only complex list with remaining lp
        if(lp > 1){
  
          newList.push(complexListOfConflictedMods[i])
        }
      }
  
      setComplexListOfConflictedMods(newList)
  }



  /* <--- Status ---> */

  //to reset status text
  const timerID = useRef<NodeJS.Timeout | null>(null)
  //controller for the status blend out
  function clearStatusTimersAndRestart(): void{

    //whilte mod is dragged dont reset status
    //if(currentDraggedMod != null)return 

    //clear old timer
    if(timerID.current != null){

      clearTimeout(timerID.current)
    }
    
    timerID.current = setTimeout(clearStatus, getStatusTextBlendOutTime())
  }
  function clearStatus(){

    if(!statusAutoBlendOut)return 
    setStatus("")
  }



  /* <--- Color Tile ---> */

  function unMarkAllSemesters(): void{

    for(let i = 1; i <= semesterCount; i++){

      markAllSemesterInvalidDropTarget(false)
      markAllSemesterWarningDropTarget(false)
      markAllSemesterRecommendedDropTarget(false)   
    }
  }
  function markAllSemesterInvalidDropTarget(invalid: boolean): void{

    for(let i = 1; i <= semesterCount; i++){

      markSemesterInvalidDropTarget(i, invalid)
    }
  }
  function markTillSemesterInvalidDropTarget(semesterNunmber: number, invalid: boolean): void{

    for(let i = 1; i <= semesterNunmber; i++){

      markSemesterInvalidDropTarget(i, invalid)
    }
  }
  //mark whole semester as not valid drop location for dragged modul
  function markSemesterInvalidDropTarget(semesterNumber: number, invalid: boolean): void{

    //get semester
    const semester: HTMLElement | null = document.getElementById("semesterFadeTile"+semesterNumber)

    if(semester != null){

      //add css class
      if(invalid)semester.classList.add("invalid")
      else if(semester.classList.contains("invalid"))semester.classList.remove("invalid")
    }
  }
  function markAllSemesterWarningDropTarget(warning: boolean): void{

    for(let i = 0; i < semesterCount; i++){

      markSemesterWarningDropTarget(i, warning)
    }
  }
  function markTillSemesterWarningDropTarget(semesterNunmber: number, warning: boolean): void{

    for(let i = 1; i <= semesterNunmber; i++){

      markSemesterWarningDropTarget(i, warning)
    }
  }
  function markSemesterWarningDropTarget(semesterNumber: number, warning: boolean): void{

    //get semester
    const semester: HTMLElement | null = document.getElementById("semesterFadeTile"+semesterNumber)

    if(semester != null){

      //add css class
      if(warning)semester.classList.add("warning")
      else if(semester.classList.contains("warning"))semester.classList.remove("warning")
    }
  }
  function markAllSemesterRecommendedDropTarget(recommended: boolean): void{

    for(let i = 1; i <= semesterCount; i++){

      markSemesterWarningDropTarget(i, recommended)
    }
  }
  function markTillSemesterRecommendedDropTarget(semesterNumber: number, recommended: boolean): void{

    for(let i = 1; i <= semesterNumber; i++){

      markSemesterRecommendedDropTarget(i, recommended)
    }
  }
  function markSemesterRecommendedDropTarget(semesterNumber: number, warning: boolean): void{

    //get semester
    const semester: HTMLElement | null = document.getElementById("semesterFadeTile"+semesterNumber)

    if(semester != null){

      //add css class
      if(warning)semester.classList.add("recommended")
      else if(semester.classList.contains("recommended"))semester.classList.remove("recommended")
    }
  }
  //colors all semesters depending if valid / warning or ok (hovered sem is to handle status update)
  function colorSemesters(): void{

    //if no modul is currently dragged 
    if(currentDraggedMod == null)unMarkAllSemesters()

    //get objs
    const modul: modulProps = currentDraggedMod!

    let invalidSemesters: number[] = []
    let warningSemesters: number[] = []
    let recommendedSemesters: number[] = []

    //fill list 
    for(let i = 1; i <= semesterCount; i++){

      //angebot
      if(!checkAngebot(modul, i)){
        invalidSemesters.push(i)
        //if(hoveredSem == i)updateStatus2(getAngebotError(modul.name, modul.angebot))
      }
      //vor lp
      else if(!checkMinPoints(modul, i)){
        invalidSemesters.push(i)
        //if(hoveredSem == i)updateStatus2(getErrorPunkte(modul.name, modul.minPunkte!))
      }
      //formal vor mods
      else if(!checkVorModules(modul, i, true)){
        invalidSemesters.push(i)
        //if(hoveredSem == i)updateStatus2(getErrorVor(modul.name, modul.vorModuleFormal))
      }
      //spacer points
      else if(!checkSpacerPoints(modul)){
        invalidSemesters.push(i)
        //if(hoveredSem == i)updateStatus2(getSpacerPointsError(modul.spacer))
      }
      //inhalt vor mods
      else if(!checkVorModules(modul, i, false)){
        warningSemesters.push(i)
        //if(hoveredSem == i)updateStatus2(getErrorVorInhalt(modul.name, modul.vorModuleInhalt))
      }
      //everything fine
      else{
        //if(hoveredSem == i)updateStatus2("")
      }
    }
    //mark sems of list
    for(let i = 0; i < invalidSemesters.length; i++){

      markSemesterInvalidDropTarget(invalidSemesters[i], true)
    }

    for(let i = 0; i < warningSemesters.length; i++){

      markSemesterWarningDropTarget(warningSemesters[i], true)
    }

    for(let i = 0; i < recommendedSemesters.length; i++){

      markSemesterRecommendedDropTarget(recommendedSemesters[i], true)
    }
  }
  
  

  /* <--- Popup Functions ---> */
  //create and show the information popup about the specialication
  function showVerInfoPopup(): void{

    //first check if the popup should be shown
    const startingSem: number = getStartingSem(moduleArray)
    const endingSem: number = getEndingSem(moduleArray)
    const difference: number = showVerInfoPopupInSem

    //condition => specific sem
    if(endingSem - startingSem + 1 < difference || verInfoPopupWasShown){return}
    //condition => specific time has passed
    if(!getSessionPassedTime(showVerInfoPopupSecPassed)){return}

    verInfoPopupWasShown = true

    //second create popup
    const info = getVertiefungsInfoText(studiengang)

    //get popupText
    const popupText: popupText = {

      headline: info[0],
      additionalText: info[1]
    }
    setPopupText(popupText)
  }
  function showInhaltWarningPopup(modulProps: modulProps): void{

    //check option
    if(!showInhaltVorWarningPopup)return

    const vor: string[] = modulProps.vorModuleInhalt
    if(vor[0] == "")return

    //get mods from vor
    const modNames = (): string => {

      let result = ""
      

      for(let i = 0; i < vor.length; i++){

        const index = getIndex(vor[i])
        if(index == null)return ""
        const end = (): string => {

          if(vor.length > 1)return ", "
          return ""
        }
        result += moduleArray[index].name + end()
      }
      return result
    }

    function getInhaltVoraussetzungsText(): JSX.Element{

      const firstPart = (): string => {

        return vor.length > 1 ? ModulStatus.ErrorVorInhalt1s : ModulStatus.ErrorVorInhalt1
      }

      return  <p>
                <span className='bigFont'>{
                firstPart()
                + modNames()
                + ModulStatus.ErrorVorInhalt2
                + modulProps.name
                + ModulStatus.ErrorVorInhalt3
                }</span><br/><br/>
                <span className='mediumFont'>{
                ModulStatus.ErrorVorInhalt4
                }</span>
              </p>
    }

    //call warning popup by passing text
    const popupText: popupText = {

      headline: <span className="capitalFont">Warnung</span>,
      additionalText: getInhaltVoraussetzungsText()
    }
    setPopupText(popupText)
  }

  function callBackFromAskPopupAbort(type: string): void{

    switch(type){

      //ob modul mit voraussetzung wirklich belegt werden soll
      case PopupTypes.modulConfirmationPopup:{

        //reset asking Mod
        setAskingMod(null)
        return 
      }
      //ob formal vorausgesetzte module mit zurückgesetzt
      //werden sollen oder abbrechen
      case PopupTypes.resetFormalVorPopup:{

        //kein modul resetten
        
        return
      }
      //ob inhaltlich vorausgesetzte module mit zurück gesetzt werden sollen oder nicht
      case PopupTypes.resetInhaltVorPopup:{

        //nur das angestrebte modul zurücksetzen aber nicht die davon abhängigen (inhaltlich)
        
        if(askingMod != null){

          const index: number | null = getIndex(askingMod.modul.id)
          if(index != null){

            //reset 
            setModulProp(index, "reset", true)
          }
          //throw error
          else{

          }
        }
        return 
      }
      default:{
        return
      }
    }
  }
  //decide based on what kind of popup was shown what to do
  //is called after ask popup was confirmed
  function callBackFromAskPopupConfirm(type: string): void{

    switch(type){

      //ob modul mit voraussetzung wirklich belegt werden soll
      case PopupTypes.modulConfirmationPopup:{

        confirmMod()
        return 
      }
      //ob formal vorausgesetzte module mit zurückgesetzt
      //werden sollen oder abbrechen
      case PopupTypes.resetFormalVorPopup:{

        if(askingMod != null)resetVorMods(askingMod.modul, true)
        return
      }
      //ob inhaltlich vorausgesetzte module mit zurück gesetzt werden sollen oder nicht
      case PopupTypes.resetInhaltVorPopup:{

        if(askingMod != null)resetVorMods(askingMod.modul, false)
        return 
      }
      default:{
        return
      }
    }
  }
  /* <--- Formal Vor Reset Popup ---> */
  //resets all formal vor mods of input modul
  //formal == false => reset inhalt vor mods
  function resetVorMods(modul: modulProps, formal: boolean): void{

    const vorModIds: string[] = formal ? modul.vorModuleFormal : modul.vorModuleInhalt

    //reset formal vor mods
    for(let i = 0; i < vorModIds.length; i++){

      const index: number | null = getIndex(vorModIds[i])

      if(index != null){

        setModulProp(index, "reset", true)
      }
      //throw error 
      else{

      }
    }
  }
  /* <--- Inhalt Vor Reset Popup ---> */

  /* <--- Confirm Mod After Popup---> */
  //after askingMod has been confirmed vote the mod 
  function confirmMod(): void{

    if(askingMod != null){

      const index: number | null = getIndex(askingMod.modul.id)

      //throw error
      if(index == null){

        return 
      }

      directVoteModulToNextFreeHolder(askingMod.modul, askingMod.newSemester, askingMod.newHolder)

      setModulProp(index, "vote", askingMod.newSemester + ":" + askingMod.newHolder)
      //rest mod and also hide popup
      setAskingMod(null)
    }
  }
  //updates the popuptext state 
  function updatePopupTextWithAskingMod(): void{

    if(askingMod == null)return 

    const vorModNames: string[] = getInhaltVorNamesOfMod(askingMod.modul)

    let aT1: string = "Es wird empfohlen das Modul " 
    

    if(vorModNames.length > 1){

      aT1 = "Es wird empfholen die Module "
      
    }

    const aT2: string = vorModNames.toString()
    const aT3: string = " vor dem Modul "
    const aT4: string = askingMod.modul.name
    const aT5: string = " zu absolvieren. Trotzdem belegen?"



    const popupText: popupText = {

      headline: <span className='capitalFont'>Warnung</span>,
      additionalText: <p className='bigFont'>{[aT1, aT2, aT3, aT4, aT5]}</p>
    }

    setAskPopupText(popupText)
  }



  /* <--- Overwrite Functions ---> */

  function overwriteModulDone(): void{

    let array = [...moduleArray]
    let result = []

    for(let i = 0; i < moduleArray.length; i++){

      let mod = array[i]
      mod.modulDone = modulDone
      result.push(mod)
    }
    
    setModule(result)
  }
  function overwriteHideModules(): void{

    let array = [...spacerArray]
    let result = []

    for(let i = 0; i < spacerArray.length; i++){

      let spacer = array[i]
      spacer.hideModules = hideModules
      result.push(spacer)
    }
    
    setSpacerArray(result)
  }



  /* <--- Status Messages ---> */

  /* <--- GET the Correct Error Message depending on the reason ---> */ 
   function getAngebotError(modulName: string, angebot: string): string{

    if(angebot == ModulAngebot.sose){
      return ModulStatus.Erfolg1 + modulName + ModulStatus.ErrorAngebot1 + ModulAngebot.ws + ModulStatus.ErrorAngebot2
    }
    else{
      return ModulStatus.Erfolg1 + modulName + ModulStatus.ErrorAngebot1 + ModulAngebot.ss + ModulStatus.ErrorAngebot2
    }
  }
  //returns the Error Message (string) for points missing
  function getErrorPunkte(modulName: string, minPunkte: number): string{

    return ModulStatus.ErrorPunkte1 + modulName + ModulStatus.ErrorPunkte2 + minPunkte.toString() + ModulStatus.ErrorPunkte3
  }
  //returns the Error Message (string) for vor modules
  function getErrorVor(modulName: string, vorModules: string[]): string{
    
    //Modul or Module (plural)
    const singlePlural = vorModules.length > 1 ? ModulStatus.ErrorVor1s : ModulStatus.ErrorVor1
    const singlePlural2 = vorModules.length > 1 ? ModulStatus.ErrorVor2s : ModulStatus.ErrorVor2
    return singlePlural + vorModules + singlePlural2
  }
  function getVerForbidden(modulName: string): string{

    return ModulStatus.ErrorPunkte1 + modulName + ModulStatus.VerForbidden
  }
  function getSpacerPointsError(modulSpacer: number): string{

    if(modulSpacer < 0)return ErrorMessages.SpacerCorrupted

    return ModulStatus.SpacerForbidden
  }
  function getBestandenMessage(modulName: string){

    return ModulStatus.Erfolg1 + modulName + ModulStatus.Bestanden
  }
  function getResetMessage(): string{

    return ModulStatus.ResetAll
  }
  function getErrorVorInhalt(modulName: string, vorModulesInhalt: string[]): string{

    const sinPlu = vorModulesInhalt.length > 1 ? ModulStatus.ErrorVorInhalt1s : ModulStatus.ErrorVorInhalt1
    const sinPlu2 = vorModulesInhalt.length > 1 ? ModulStatus.ErrorVorInhalt2s : ModulStatus.ErrorVorInhalt2
    const sinPlu3 = ModulStatus.ErrorVorInhalt3

    const vorMods = () => {

      let result = ""

      for (let i = 0; i < vorModulesInhalt.length; i++){

        const index = getIndex(vorModulesInhalt[i])
        if(index == null)return

        result += moduleArray[index].name
        if(i > 0 || i < vorModulesInhalt.length-1)result += "; "
      }

      result = result.slice(0, -2)

      return result
    }
    return sinPlu + vorMods() + sinPlu2 + modulName + sinPlu3
  }
  function getSuccess(modulName: string):string{

    return ModulStatus.Erfolg1 + modulName + ModulStatus.Erfolg2
  }
  

  /* <--- JSX Visual App Content ---> */
  //conditional rendering
  //show app or login page
  function getAppContent(): JSX.Element{

    //login is imported
    if(!isLoggedIn)return <Login {...loginProps}/>

    //app comp
    else return(

      <div className='appwrapper'>

      <Popup {...popupProps}/>
      <AskPopup {...askPopupProps}/>
      <ResetModPopup {...resetVorModsPopup}/>
      <OptionContainer {...optionsContainerProps}/>
      <FeedbackContainer {...feedbackContainerProps}/>
      <VerChangePopup {...verChangePopupProps}/>
      <Navbar {...navBarProps}/>

      <div className='bodyWrapper'>
        <div className='body'>


          <div className='header'>
            <div className='mainHeader'>
              <DropDownVertiefung {...vertiefungDropDown}/>
              <DropDownSemester {...semesterDropDown}/>
              <DropDownSort {...sortDropDown}/>
              <SearchBar {...searchBarProps}/>
              {/*<button style={{width:"50px", height:"50px"}} onClick={() => ReactPDF.render(<MyDocument/>, "./comps/pdfFile/example.pdf")}/>*/}
              <div className='mainHeaderSpacer'/>
            </div>
            <SideHeader {...sideHeaderProps}/>
          </div>


          <div className='main'>
            <DropTable key={100} {...dropTableProps}/>
            <ModulScroller key={200} moduleArray={moduleArray} dropInScroller={dropInScroller} spacerArray={spacerArray}/>
          </div>


          <div className='footer'>
            <div className='footerWrapper'>
              <Status {...statusProps}/>
              <Lp lpContent={lpText} show={isComplete}/>
            </div>
            {/*<Overview/>*/}
            <HeaderButtonGroup {...headerButtonGroupProps}/>
          </div>

        </div>
      </div>
    
    </div>
    )
  }
  return (
    getAppContent()
  )
}

export default App
