export enum ModulStatus{

    Erfolg1="Modul ",
    Erfolg2=" wurde erfolgreich belegt",
    Warnung="Modul wird nicht empfohlen",
    ErrorPunkte1="Modul ",
    ErrorPunkte2=" setzt mindestens ",
    ErrorPunkte3="LP voraus",
    ErrorVor1="Modul ",
    ErrorVor1s="Module ",
    ErrorVor2=" wird vorausgesetzt",
    ErrorVor2s=" werden vorausgesetzt",
    ErrorVorInhalt1s="Die Module ",
    ErrorVorInhalt1="Das Modul ",
    ErrorVorInhalt2s=" werden inhaltlich für ",
    ErrorVorInhalt2=" wird inhaltlich für ",
    ErrorVorInhalt3=" vorausgesetzt.",
    ErrorVorInhalt4="Eine Belegung ist formal zulässig, wird aber nicht empfohlen.",
    ErrorAngebot1=" wird im ",
    ErrorAngebot2=" nicht angeboten",
    ResetModul= " wurde zurückgesetzt",
    ResetAll= "Module und LP zurückgesetzt",
    ResetVer1Singular= " Vertiefungsmodul",
    ResetVer1Plural= " Vertiefungsmodule",
    ResetVer2= " und ",
    ResetVer3= " LP zurückgesetzt",
    VerForbidden= " durch gewählte Vertiefung verboten",
    SpacerForbidden= "Verbleibende Punkte der Kategorie nicht ausreichend",
    Bestanden= " wurde erfolgreich als bestanden makiert"
}

export enum ErrorMessages{

    VorCorrupted="ERROR 501 - Data Corrupted",
    ModCorrupted="ERROR 404 - Modul not found",
    SpacerCorrupted="ERROR 404 - Spacer not found"
}

export enum ModulAngebot{

    immer="Ganzjärig",
    jedes="Jedes",
    ss="Sommersemester",
    ws="Wintersemester",
    ssKurz="SS",
    wsKurz="WS",
    sose="SoSe",
    wise="WiSe"
}

export enum SortMessages{

    init="Unsorted",
    type1="Name - aufsteigend",
    type2="Name - absteigend",
    type3="ID - aufsteigend",
    type4="ID - absteigend",
    type5="LP - aufsteigend",
    type6="LP - absteigend",
    type7="Empfohlenes Semester - aufsteigend",
    type8="Empfohlenes Semester - absteigend",
}

export enum ModulKatalog{

    pflicht="Pflicht",
    einf="Einf",
    prak="Prakt",
    ver="Ver",
    vertiefung="Vertiefung",
    kern="Kern"
}

export enum ModulColor{

    red="red",
    yellow="yellow",
    green="green",
    white="white"
}

export enum FeedbackStatus{

    error="Beim Senden ist ein Fehler aufgetreten!",
    success="Feedback erfolgreich gesendet",
    tooLong="Feedback ist zu lang"
}

export enum LoginStatus{

    wrong="Unknown Username/Password",
    tooLongUsername="Username 16 chars max.",
    tooLongPassword="Password 32 chars max.",
    tooShortUsername="Username 4 chars min",
    tooShortPassword="Password 8 chars min",
}

export enum KonfliktModule{

    konfliktPopupTitle="Konfliktbehandlung",
    konfliktAbortButton="Vertiefung nicht wechseln",
    konfiiktAlleButton="Alle Module Zurücksetzen",
    konfliktSimpleTitle="Module mit neuer Vertiefung im Konflikt",
    konfliktComplexTitle=" LP müssen abgewählt werden",
    konfliktResetAllButton="Alle zurücksetzen"
}

export enum ResetVorModule{

    title="Konfliktbehandlung",
    name="Name",
    reset="Reset",
    abbrechen="Abbrechen",
    formalModsText1="Formal abhängige Module: ",
    inhaltModsText1="Inhaltlich abhängige Module: "
}

export enum SpacerText{

    bestandeTitle1="Bestandene Module",
    spacerZeroMaxPoints="In Vertifung nicht zugelassen"
}

export enum AppInformation{

    wasKannDieApp="Diese App ermöglicht es, den eigenen Studienverlauf zu planen und zu strukturieren. Die App weist dabei explizit auf Unzulässigkeiten hin und gibt Empfehlungen ab.",
    wasDieAppNichtKann="Die App belegt keine Veranstaltungen für dich, sämtliche Kurseinschreibungen, Anmeldungen zu Prüfungen, etc. sind weiterhin über das Uni Portal zu erledigen (hier Unisono)",
    woraufManAchtenSollte="Die App weist zwar begrenzt auf Modulüberschneidungen hin, dennoch solltest du auf die Zeiten der verschiedenen Modulveranstaltungen achten, um eine möglichst Effiziente Belegung zu erreichen.",
    woraufManAchtenSollte2="Sollte sich während des Studiums etwas an der eigenen Prüfungsordnung ändern, weist dich die App beim nächsten Login auf neu bestehende Unzulässigkeiten hin.",
    woraufManAchtenSollte3="Die App geht stehts davon aus, dass geplante Module auch mit der Prüfungsleistung erfolgreich abgeschlossen werden. Sollte dies nicht der Fall sein, passe deinen Verlauf entsprechend an.",
    woraufManAchtenSollte4="Bitte beachte, dass sich die App derzeit in einer Testphase befindet, daher kann es vorkommen, dass entsprechende Fehler in der Programmstruktur sowie der Moduldatenbank auftreten können."
}

export enum SideHeaderText{

    greenAutoSaveTagTextWhenLoggedIn="Speichert Belegung automatisch für '",
    redAutoSaveTagTextWhenLoggedIn="Belegung wird ausschließlich nach dem Logout gespeichert",
    redAutoSaveTagTextWhenNotLoggedIn="Belegung wird nach Session Ende gelöscht",
    greenLoggedInTagText="Eingeloggt als '",
    redNotLoggedInTagText="Als Gast angemeldet",
    studiengangTagText="Im Studiengang '"
}