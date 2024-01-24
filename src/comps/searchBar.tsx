import react from "react"
import { modulProps } from "./modul"
import { searchBarMinChars } from "../options"


export interface searchBarProps{

    modulArray: modulProps[]
    scrollToMod:(modulId: string) => void
}

export function SearchBar(props: searchBarProps){

    function search(event: react.KeyboardEvent<HTMLInputElement>){
         
        //if(event.key != "Enter")return 
        //on all key events
        const elem = document.getElementById("searchBarInput") as HTMLInputElement

        if(elem != null){

            const searchTag = elem.value.toLocaleLowerCase()

            //only fires if searchtag containts at least n chars
            if(searchTag.length < searchBarMinChars)return 

            for(let i = 0; i < props.modulArray.length; i++){

                const modName = props.modulArray[i].name.toLocaleLowerCase()
                const modId = props.modulArray[i].id.toLocaleLowerCase()
                const modInhalt = props.modulArray[i].inhalt.toLocaleLowerCase()


                if(modName.includes(searchTag) || searchTag.includes(modId) /*|| modInhalt.includes(searchTag)*/){

                    props.scrollToMod(modId.toLocaleUpperCase())

                    //the app should always just mark the first hit not multiple so we return after
                    //a mod hit the search tag
                    return
                }
            }
        }
    }


    return(
        <div className="searchBarWrapper">
            <input className="searchBarInput" placeholder="Search..." id="searchBarInput" onKeyDown={(event) => {search(event)}}></input>
        </div>
    )
}