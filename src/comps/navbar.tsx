import React, { CSSProperties, useEffect, useState } from "react"
import NavButton, { navButtonProps } from "./navButton"
import Delete from "@mui/icons-material/Delete"
import LightModeIcon from '@mui/icons-material/LightMode'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import FeedbackIcon from '@mui/icons-material/Feedback'
import DownloadIcon from '@mui/icons-material/Download'
import { Logo } from "./logo"

//pass App Functions to the NavBar
export interface NavBarProps{

    resetAll:() => void
    shopOptions:() => void
    showFeedback:() => void
    changeTheme:() => void
    downloadPDF: () => void
    logOut:() => Promise<any>
}

export default function Navbar(props: NavBarProps){

    
    

    const ThemeModeButtonProps : navButtonProps = {

        name: "Theme",
        icon: [<LightModeIcon className='icon'/>, <NightsStayIcon className="icon"/>],
        trigger: props.changeTheme
    }

    const settingButtonProps: navButtonProps = {

        name: "Optionen",
        icon: [<SettingsIcon className="icon"/>],
        trigger: props.shopOptions
    }

    const logoutButtonProps: navButtonProps = {

        name: "Logout",
        icon: [<LogoutIcon className="icon"/>],
        trigger: props.logOut
    }

    const feedbackButtonProps: navButtonProps = {

        name: "Feedback",
        icon: [<FeedbackIcon className="icon"/>],
        trigger: props.showFeedback
    }

    const deleteButtonProps: navButtonProps = {

        name: "Reset",
        icon: [<Delete className="icon"/>],
        trigger: props.resetAll
    }

    const downloadPDFButtonProps: navButtonProps = {

        name: "Download PDF",
        icon: [<DownloadIcon className="icon"/>],
        trigger: props.downloadPDF
    }

    //otherwiese navbar would shrink to early (mouse event)
    function mouseEnter(): void{

        const g = (document.getElementById("navBar") as HTMLDivElement).offsetHeight
    }


    return(
        <div id="navBar" className="navBar" onMouseEnter={mouseEnter}>
            <NavButton {...ThemeModeButtonProps}/>
            <NavButton {...feedbackButtonProps}/>
            <NavButton {...settingButtonProps}/>
            <NavButton {...deleteButtonProps}/>
            <NavButton {...downloadPDFButtonProps}/>
            <NavButton {...logoutButtonProps}/>
            <Logo type="small_white"/>
        </div>
    )
}
