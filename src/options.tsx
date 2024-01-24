import React, { useState } from "react"
import { getCSSVar, setCSSVar } from "./utility"


//THIS FILE CONATINS GLOBAL SCOPE VARS 



//values
//time after app shows the spcialisation information popup
export const showVerInfoPopupTimeMills: number = 50000
//semester number app shows the spcialisation information popup
export const showVerInfoPopupInSem: number = 4
export const showVerInfoPopupSecPassed: number = 10

//what min char number needs to be reached for searchbar to start actually searching a mod
export const searchBarMinChars: number = 3

//time in ms after the image cube of login page turns
export const imageCubeAutoTurnTime: number = 12700

//how long a modul is highlighted when searched 
export const modulHighlightTime: number = 3000

//username and password length requirements

//this is actually a high sercurity risk and needs to be replaced later with server
//given vars as this allows users to manipulate and sql inject hacking
export const registerMaxPWlength = 16
export const registerMinPWlength = 8
export const registerMaxUserlength = 16
export const registerMinUserlength = 4

//mills after status text is blend out
//is not directly returned 
//this is because of the interaction between css and ts
//we need to add a delay otherwise ts removes the html elems in the last frame of the blend out animation
//which leads to a buggy looking blend out, so we let some time pass after the text has been blend out completely 
//to then remove the html elem :)
var statusTextBlendOutTimeMills: number = 6000
const statusTextBlendOutTimeFadeMills: number = 700
export function getStatusTextBlendOutTime(): number{return statusTextBlendOutTimeMills}

setStatusTextBlendOutTime()
export function setStatusTextBlendOutTime(): void{

    //update css vars
    const delay = ((statusTextBlendOutTimeMills - statusTextBlendOutTimeFadeMills + 10) / 1000).toString()

    setCSSVar("--status-text-blendout-delay", delay + "s")
    setCSSVar("--status-text-blendout", (statusTextBlendOutTimeFadeMills/1000).toString() + "s")
    //console.log(getCSSVar("--status-text-blendout-delay"), getCSSVar("--status-text-blendout"))
}