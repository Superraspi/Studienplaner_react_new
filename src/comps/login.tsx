import React, { useEffect, useState } from "react"
import "../loginPage.scss"
import { ImageCube } from "./imageCube/imageCube"
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { Logo } from "./logo"
import { LoginStatus } from "../messages"
import { userdata } from "../App"
import { vertiefung } from "./dropDownVertiefung"
import { imageCubeAutoTurnTime, registerMaxPWlength, registerMaxUserlength, registerMinPWlength, registerMinUserlength } from "../options"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { getCSSVar, getEmptyStudiengang } from "../utility"
import DoneIcon from '@mui/icons-material/Done'
import DropDownStudiengaenge, { dropDownPropsStudiengaenge, studiengang } from "./dropDownStudiengaenge"


export interface loginProps{

    studiengaenge: studiengang[]
    studiengang: studiengang
    setSuccessLogin:(userdata: userdata) => void
    toggleTheme:() => void
    triggerStudiengang:(trigger: studiengang) => void
    isBright: boolean
}


export default function Login(props: loginProps): JSX.Element{
 
    useEffect(() => {

        imgCubeSetSize()
    },[])


    function imgCubeSetSize(): void{

        //get size of container
        const conElem: Element | null = document.querySelector(".panel")
        let conSize: string | number | null = null
        if(conElem != null){

            //set size to img cube
            conSize = getComputedStyle(conElem).width
            conSize = extractNumbers(conSize)

            if(conSize != null){

                conSize /= 2
                conSize = conSize + "px"
                setCSSVar("--size", conSize)
            }   
        }      
    }

    function setCSSVar(name: string, value: string){

        document.documentElement.style.setProperty(name, value)
    }
    function getCSSVar(name: string){
    
        return getComputedStyle(document.documentElement).getPropertyValue(name);
    }
    function extractNumbers(txt: string): number | null{

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





    return(
        <div className="wrapper">
            <div className="panel">
                <div className="loginPanel">
                    <ActionCard {...props}/>
                    
                </div>
                <div className="cubePanel">
                    <ImageCube autoTurnTime={imageCubeAutoTurnTime}/>
                </div>
            </div>
        </div>
    )
}













function ActionCard(props: loginProps): JSX.Element{

    const [showLoginCard, setShowLoginCard] = useState<boolean>(true)

    

    const loginCardClass: string = "showLoginCardButton"
    const loginCardClassActive: string = "showLoginCardButton active"
    const registerCardClass: string = "showRegisterCardButton"
    const registerCardClassActive: string = "showRegisterCardButton active"

    useEffect(() => {


        //update shadow
        const shadow = getCSSVar("--loginshadow2")

        const loginDiv = document.querySelector(".showLoginCardButton") as HTMLDivElement
        const registerDiv = document.querySelector(".showRegisterCardButton") as HTMLDivElement

        if(loginDiv != undefined && registerDiv != undefined){

            //set shadow to register
            if(!showLoginCard){

                loginDiv.className = loginCardClassActive
                registerDiv.className = registerCardClass
            }
            //set shadow to login
            else{

                loginDiv.className = loginCardClass
                registerDiv.className = registerCardClassActive
            }
        }

    }, [showLoginCard])

    function toggleCard(loginButtonClicked: boolean): void{

        loginButtonClicked = loginButtonClicked
        setShowLoginCard(loginButtonClicked)
    }

    return(

        <div className="actionCard">
            <div className="loginLogo" id="loginLogo">
                {!props.isBright && <Logo type="big_white"/>}
                {props.isBright && <Logo type="big_rgb"/>}
            </div>
            <div className="loginWrapper">
                <div className="loginSwitch">
                    <div className={loginCardClass} onClick={() => {toggleCard(true)}}>Login</div>
                    <div className={registerCardClass} onClick={() => {toggleCard(false)}}>Register</div>
                </div>
                {showLoginCard && <LoginCard {...props}/>}
                {!showLoginCard && <RegisterCard {...props}/>}
            </div>
        </div>
    )
}

//show error message at bottom
var show: boolean = false
function LoginCard(props: loginProps): JSX.Element{

    const [loginState, setLoginState] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    //show error message
    function getClasses(): string{

        if(show)return "loginInfo red"
        else return "loginInfo"
    }

    //add key listerner to login field
    function keyListener(event: React.KeyboardEvent<HTMLDivElement>): void{

        if(event.key == "Enter"){

            logIn()
        }
    }
    

    //php fetch calls based on the return value 
    //success // fail // error
    async function logIn(): Promise<any>{

        const userElem: HTMLInputElement | null = document.getElementById("uname") as HTMLInputElement
        const passElem: HTMLInputElement | null = document.getElementById("pword") as HTMLInputElement     

        if(userElem == null || passElem == null){

            show = true
            setLoginState("Critical Error")
            return
        }
        
        const user: string = userElem.value
        const pass: string = passElem.value



        if(user.length < 4){

            show = true
            setLoginState(LoginStatus.tooShortUsername)
        }
        else if (user.length > 16){

            show = true
            setLoginState(LoginStatus.tooLongUsername)
        }
        else if(pass.length < 8){

            show = true
            setLoginState(LoginStatus.tooShortPassword)
        }
        else if(pass.length > 32){

            show = true
            setLoginState(LoginStatus.tooLongPassword)
            
        }
        //everything is fine
        else{

            show = false
            setLoginState("fine")   
            
            const bodyObj = JSON.stringify({username: user, password: pass})
            
            const fetchConfig = {
                method: 'POST',
                
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: bodyObj
            }
           
            const response = await fetch('http://localhost:8000/database/loadUserdata.php', fetchConfig)
            await response.json().then(
            function(value){
                //return == null (emtpy) ==> wrong user data
                if(value == null){

                    loginFail()
                }
                else{

                    loginSuccess(value)
                }
            },
            function(error){loginError(error)})
                
        }
        return         
    }

    //called when login was sucess
    function loginSuccess(obj: any): void{

        const studiengangUS: studiengang = {

            name: obj.studiengang,
            fpo: obj.fpo
        }

        const ud: userdata = {

            username: obj.username,
            studiengang: studiengangUS,
            module_belegt: obj.belegt,
            module_bestanden: obj.bestanden,
            vertiefung: obj.vertiefung,
            sort: obj.sort,
            theme: obj.theme
        }
        props.setSuccessLogin(ud)
    }

    //called when no user with matching login data was found
    function loginFail(){

        //make red error message visible
        show = true
        setLoginState(LoginStatus.wrong)
    }

    //called when php return an ERROR (not false login data)
    function loginError(error: any){

        console.log(error)
    }
    
    function toggleShowPassword(): void{

        setShowPassword(!showPassword)
    }
    function getPasswordType(): string{

        if(showPassword)return "text"
        return "password"
    }

    async function loginCAS(): Promise<any>{

        
        const response = await fetch('http://localhost:8000/database/cas/phpCAS-master/getUserdataCAS.php')
            await response.json().then(
            function(value){
                console.log(value)
            },
            function(error){console.log(error)})
        
             
    }

    function toggleTheme(): void{

        //props.toggleTheme

        //setShowWhiteLogo()
    }

    //<span className="loginCAS" onClick={loginCAS}>Login CAS</span>

    return(

        <div className="loginCard">
            <div className="inputPanel" onKeyDown={(event) => keyListener(event)}>
            <div className="username">
                
                <input type="text" className="username input" placeholder="Username" id="uname" required autoComplete="off"/>  
            </div>
            <div className="password">
            
                <input type={getPasswordType()} className="password input" placeholder="Password" id="pword" required autoComplete="off"/>
                <div className="passwordToggleButton" onClick={toggleShowPassword}>
                    {showPassword && <VisibilityIcon className="passwordIcon"/>}
                    {!showPassword && <VisibilityOffIcon className="passwordIcon"/>}
                </div> 
            </div>
            <div className="loginButtonWrapper">
                <div className="loginButton" onClick={logIn}>Login</div>
                <div className="loginButton theme" onClick={(props.toggleTheme)}>{<LightModeIcon/>}</div>
            </div>
            
            
            {/*<div className="loginCAS" onClick={loginCAS}>Login CAS</div>*/}
            </div>
            <div className={getClasses()}>{loginState}</div>
        </div>
    )
}

var showReg: boolean = false
function RegisterCard(props: loginProps): JSX.Element{

    const [registerState, setRegisterState] = useState<string>("Status")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [passwordCheck, setPasswordCheck] = useState<boolean>(false)

    //show error message
    function getClasses(): string{

        if(showReg)return "registerInfo red"
        else return "registerInfo"
    }
    //add key listerner to login field
    function keyListener(event: React.KeyboardEvent<HTMLDivElement>): void{

        if(event.key == "Enter"){

            register()
        }
    }
    function toggleShowPassword(): void{

        setShowPassword(!showPassword)
    }
    function getPasswordType(): string{

        if(showPassword)return "text"
        return "password"
    }
    function checkValidPassword(): boolean{

        const first = document.getElementById("pword2") as HTMLInputElement
        const second = document.getElementById("repword2") as HTMLInputElement
        const user = document.getElementById("uname2") as HTMLInputElement

        if(first != null && second != null && user != null){

            const value1 = first.value
            const value2 = second.value
            const username = user.value

            //username too short /long
            if(username.length > registerMaxUserlength){

                showReg = true
                setRegisterState("Benutzername zu lang")
                return false
            }
            else if(username.length < registerMinUserlength){

                showReg = true
                setRegisterState("Benutzername zu kurz")
                return false
            }
            //check if pw is long/short enough
            if(value1.length > registerMaxPWlength || value2.length > registerMaxPWlength){

                showReg = true
                setRegisterState("Passwort zu lang")
                return false 
            }
            else if(value1.length < registerMinPWlength || value2.length > registerMaxPWlength){

                showReg = true
                setRegisterState("Passwort zu kurz")
                return false
            }

            if(checkSame()){

                return true
            }
        }
        return false
    }
    function checkSame(): boolean{

        const first = document.getElementById("pword2") as HTMLInputElement
        const second = document.getElementById("repword2") as HTMLInputElement

        const value1 = first.value
        const value2 = second.value

        //if(value1.length < registerMinPWlength || value2.length < registerMinPWlength)return false
        //check if repeated pw is the same
        if(value1 == value2){

            setRegisterState("")
            setPasswordCheck(true)
            return true
        }
        else{

            setRegisterState("")
            setPasswordCheck(false)
            return false
        }
    }
    // Register AJAX Call
    async function register(): Promise<any>{

        if(checkValidPassword()){

            //input elems
            const username = document.getElementById("uname2") as HTMLInputElement
            const password = document.getElementById("pword2") as HTMLInputElement
            const studiengangElem = document.getElementById("registerStudiengangDropDown") as HTMLButtonElement
            
            //input elems contnet
            const user = username.value
            const pass = password.value
            const studiengangName = studiengangElem.innerHTML

            //create studiengang obj
            const studiengang: studiengang = {

                name: studiengangName,
                fpo: "wise20/21"
            }

            //pass params to ajax body obj
            const bodyObj = JSON.stringify({username: user, password: pass, studiengang: studiengang})
            
            //console.log(bodyObj)
            //create fetch config 
            const fetchConfig = {
                method: 'POST',
                
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: bodyObj
            };

            //calls fetch //pass config 
            const response = await fetch('http://localhost:8000/database/createUser.php', fetchConfig)
            await response.json().then(
            function(value){

                //return -1  => user already exist
                //1 == success
                if(value == -1){

                    registerFail()
                }
                else{

                    registerSuccess(user, studiengang)
                }
            },
            function(error){registerError(error)})
        }
        
    }

    function registerSuccess(username: string, studiengang: studiengang){

        const ud: userdata = {

            username: username,
            studiengang: studiengang,
            module_belegt: "",
            module_bestanden: "",
            vertiefung: "Ver",
            sort: "sort",
            theme: "dark"
        }
        props.setSuccessLogin(ud)
    }

    function registerFail(){

        showReg = true
        setRegisterState("Nutzer existiert bereits")
    }

    function registerError(error: any){

        console.log(error)
    }

    const dropDownStudiengaengeProps: dropDownPropsStudiengaenge = {

        id: "registerStudiengangDropDown",
        studiengaenge: props.studiengaenge,
        state: props.studiengang,
        trigger: triggerStudiengangDropDown
    }

    function triggerStudiengangDropDown(trigger: studiengang): void{

        props.triggerStudiengang(trigger)
    }

    return(

        <div className="registerCard">
            <div className="inputPanel2" onKeyDown={(event) => keyListener(event)}>

                <div className="horizontalFlex">

                    <div className="verticalFlex">
                        <div className="username2">
                            <input type="text" className="username input2" placeholder="Username" id="uname2" required autoComplete="off"/>  
                        </div>
                        <DropDownStudiengaenge {...dropDownStudiengaengeProps}/>
                    </div>
                    <div className="verticalFlex">
                        <div className="password2">
                            <div className="passwordWrapper2">
                                <input type={getPasswordType()} className="password input2" placeholder="Password" id="pword2" required autoComplete="off" onChange={checkSame}/>
                                <div className="passwordToggleButton2" onClick={toggleShowPassword}>
                                    {showPassword && <VisibilityIcon className="passwordIcon"/>}
                                    {!showPassword && <VisibilityOffIcon className="passwordIcon"/>}
                                </div>
                            </div>
                            <div className="passwordCheck">
                                <input type={getPasswordType()} className="password repeat input2" placeholder="Repeat Password" id="repword2" required autoComplete="off" onChange={checkSame}/>
                                {passwordCheck && <DoneIcon className="samePWCheck"/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="registerButton" onClick={register}>Register</div>
                
            </div>
            <div className={getClasses()}>{registerState}</div>
        </div>
    )
}