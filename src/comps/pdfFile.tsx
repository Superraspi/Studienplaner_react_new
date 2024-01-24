import ReactPDF, { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { modulProps } from './modul';


export interface pdfResultVotedObject{

  semester: string,
  module: modulProps[]
}

export interface pDFFileProps{

  //module welche belegt worden sind
  //zwei dimensionaler Array 
  belegteModule: pdfResultVotedObject[]

  bestandeneModule: modulProps[]

  isComplete: boolean
}


export function PDFFile(props: pDFFileProps){

  const styles = StyleSheet.create({
    title: {
      
      display: "flex",
      left: "10%",
      fontSize: 30
    },
    tableTitle: {
      
      display: "flex",
      left: "10%",
      fontSize: 20,
      marginTop: 55,
      marginBottom: 10
    },
    table: { 
      display: "flex",
      left: "10%",
      width: "80%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableMod: {
      display: "flex",
      left: "10%",
      width: "80%", 
      borderStyle: "solid", 
      borderWidth: 0,
      borderLeftWidth: 1,
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableHeaderRow: { 
      margin: "auto", 
      flexDirection: "row",
      backgroundColor: '#E4E4E4'
    }, 
    tableBigCol: { 
      width: "60%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableSmallCol: { 
      width: "20%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableBigCol2: { 
      width: "80%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableSmallCol2: { 
      width: "20%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableHeaderCell: {
      
      margin: "auto", 
      marginTop: 5, 
      fontSize: 16,    
    },
    tableCell: { 
      
      margin: "auto", 
      marginTop: 5, 
      fontSize: 12 
    },
    infoText1: {
      
      display: "flex",
      left: "10%",
      marginTop: 75,
      fontSize: 12
    },
    infoTextRed: {
      
      display: "flex",
      left: "10%",
      color: "red",
      margin: 10,
      marginLeft: 0,
      fontSize: 18
    },
    infoTextGreen: {
      
      display: "flex",
      left: "10%",
      color: "green",
      margin: 10,
      marginLeft: 0,
      fontSize: 18
    },
    infoTextNormal: {
      
      display: "flex",
      left: "10%",
      margin: 10,
      marginLeft: 0,
      fontSize: 18
    },
    infoText: {
      
      display: "flex",
      left: "10%",
      fontSize: 12
    }
  })

  function createTitle(){

    return(

      //Complete Title
      <Text style={styles.title}>Studienverlaufsplan</Text>
    )
  }
  function createVotedTableTitle(semesterTitle: string){

    return(

      <Text style={styles.tableTitle} key={"modulTabellenTitel"}>{semesterTitle}</Text>
    )
  }
  function createVotedTableHeader(sem: string){

    return(

      //Complete Table
      //Table Title
      <View style={styles.table} key={"modulTabellenKopf"+sem}> 
        <View style={styles.tableHeaderRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableHeaderCell}>Name</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableHeaderCell}>LP</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableHeaderCell}>Prüfunsvorleistung</Text> 
          </View> 
        </View>
     </View>
    )
  }
  function createVotedTableMod(name: string, lp: number, vor: boolean){

    const vorString = (): string => {return vor ? "X": ""}

    return(

      //Content
      <View style={styles.tableMod} key={"modulTabellenElement"+name}>
      <View style={styles.tableRow}> 
        <View style={styles.tableBigCol}> 
          <Text style={styles.tableCell}>{name}</Text> 
        </View> 
        <View style={styles.tableSmallCol}> 
          <Text style={styles.tableCell}>{lp}</Text> 
        </View> 
        <View style={styles.tableSmallCol}>
          <Text style={styles.tableCell}>{vorString()}</Text> 
        </View>     
      </View> 
      </View>
    )
  }
  function createPassedTableTitle(){

    return(

      <Text style={styles.tableTitle} key={"bestandeneModuleTabelleTitle"}>Bereits bestandene Module</Text>
    )
  }
  function createPassedTableHeader(){

    return(

      //Bereits bestanden Module
      <View style={styles.table} key={"bestandeneModuleTabellenKopf"}> 
        <View style={styles.tableHeaderRow}> 
          <View style={styles.tableBigCol2}> 
            <Text style={styles.tableHeaderCell}>Name</Text> 
          </View> 
          <View style={styles.tableSmallCol2}> 
            <Text style={styles.tableHeaderCell}>Lp</Text> 
          </View> 
        </View>
      </View>  
    )
  }
  function createPassedTableMod(name: string, lp: number){

    return(

      //Content
      <View style={styles.tableMod} key={"bestandeneModuleTabellenElement"+name}>
      <View style={styles.tableRow}> 
        <View style={styles.tableBigCol2}> 
          <Text style={styles.tableCell}>{name}</Text> 
        </View> 
        <View style={styles.tableSmallCol2}> 
          <Text style={styles.tableCell}>{lp}</Text> 
        </View>    
      </View> 
      </View>
    )
  }
  function createInfoTitle(){ 

    const today = new Date()
    const min = today.getMinutes()
    const mind = (): string => today.getMinutes() < 10 ? today.getMinutes().toString() : "0"+today.getMinutes()
    const hh = today.getHours()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    const time = hh + ":" + min + "Uhr"
    const date = dd + '.' + mm + '.' + yyyy


    return(

      //Info Title
      <Text style={styles.infoText1} key={"pdfInfoKopf"}>Erstellt am {date} um {time}</Text>
      
    )
  }
  function createInfoBody(valid: boolean){

    const infoBody = (): JSX.Element => {

      return !valid ? <Text style={styles.infoTextRed}>Verlaufsplan nach aktueller Prüfunsordnung ungültig</Text> :
      <Text style={styles.infoTextGreen} key={"pdfInfoBody"}>Verlaufsplan nach aktueller Prüfunsordnung gültig</Text>
    }

    return(

      //Info Body
      infoBody()
    )
  }

  function getVotedModTables(): JSX.Element[]{

    //voted mod tables
    let votedModTables: JSX.Element[] = []

    //fill voted mod tables
    //check if sem has voted mods
    for(let sem = 0; sem < props.belegteModule.length; sem++){

      //sem contains some voted mods
      if(props.belegteModule[sem].module.length > 0){

        votedModTables.push(createVotedTableTitle(props.belegteModule[sem].semester))
        votedModTables.push(createVotedTableHeader(props.belegteModule[sem].semester))

        for(let mod = 0; mod < props.belegteModule[sem].module.length; mod++){

          const name: string = props.belegteModule[sem].module[mod].name
          const lp: number = props.belegteModule[sem].module[mod].lp
          const vor: boolean = props.belegteModule[sem].module[mod].bestanden

          votedModTables.push(createVotedTableMod(name, lp, vor))
        }
      }
    }

    return votedModTables
  }
  function getPassedModTable(): JSX.Element[]{

    //passed mod table
    let passedModTable: JSX.Element[] = []

    //fill passed mod table
    if(props.bestandeneModule.length > 0){

      passedModTable.push(createPassedTableTitle())
      passedModTable.push(createPassedTableHeader())

      for(let mod = 0; mod < props.bestandeneModule.length; mod++){

        const name: string = props.bestandeneModule[mod].name
        const lp: number = props.bestandeneModule[mod].lp

        passedModTable.push(createPassedTableMod(name, lp))
      }
    }

    return passedModTable
  }


  return(

    <Document>
      <Page>
        {createTitle()}
        <View key={"belegteModuleTabellenWrapper"}>
        {getVotedModTables()}
        </View>
        <View key={"bestandeneModuleTabellenWrapper"}>
        {getPassedModTable()}
        </View>
        {createInfoTitle()}
        {createInfoBody(props.isComplete)}
      </Page>
    </Document>
  )
}




/*

const styles = StyleSheet.create({
  title: {
    
    display: "flex",
    left: "10%",
    fontSize: 30
  },
  tableTitle: {
    
    display: "flex",
    left: "10%",
    fontSize: 20,
    marginTop: 55,
    marginBottom: 10
  },
  table: { 
    display: "flex",
    left: "10%",
    width: "80%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  tableMod: {
    display: "flex",
    left: "10%",
    width: "80%", 
    borderStyle: "solid", 
    borderWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableHeaderRow: { 
    margin: "auto", 
    flexDirection: "row",
    backgroundColor: '#E4E4E4'
  }, 
  tableBigCol: { 
    width: "60%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableSmallCol: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableBigCol2: { 
    width: "80%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableSmallCol2: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableHeaderCell: {
    
    margin: "auto", 
    marginTop: 5, 
    fontSize: 16,    
  },
  tableCell: { 
    
    margin: "auto", 
    marginTop: 5, 
    fontSize: 12 
  },
  infoText1: {
    
    display: "flex",
    left: "10%",
    marginTop: 75,
    fontSize: 12
  },
  infoTextRed: {
    
    display: "flex",
    left: "10%",
    color: "red",
    margin: 10,
    marginLeft: 0,
    fontSize: 18
  },
  infoTextGreen: {
    
    display: "flex",
    left: "10%",
    color: "green",
    margin: 10,
    marginLeft: 0,
    fontSize: 18
  },
  infoTextNormal: {
    
    display: "flex",
    left: "10%",
    margin: 10,
    marginLeft: 0,
    fontSize: 18
  },
  infoText: {
    
    display: "flex",
    left: "10%",
    fontSize: 12
  }
});

const Quixote = () => (
  <Document>
    <Page style={styles.body}>
      
      //Complete Title
      <Text style={styles.title}>Studienverlaufsplan</Text>
      
      //Complete Table
      //Table Title
      <Text style={styles.tableTitle}>Wintersemester 2023/2024</Text>
      <View>
      <View style={styles.table}> 
        //Header
        <View style={styles.tableHeaderRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableHeaderCell}>Name</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableHeaderCell}>LP</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableHeaderCell}>Prüfunsvorleistung</Text> 
          </View> 
        </View>
      </View>
      <View style={styles.tableMod}>
        //Content
        <View style={styles.tableRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableCell}>Algorithmen und Datenstrukturen</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableCell}>9</Text> 
          </View> 
          <View style={styles.tableSmallCol}>
            <Text style={styles.tableCell}>X</Text> 
          </View>     
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableCell}>Berechenbarkeit und Logik NebenläufigeSysstem</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableCell}>6</Text> 
          </View> 
          <View style={styles.tableSmallCol}>
            <Text style={styles.tableCell}></Text> 
          </View>  
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableCell}>Berechenbarkeit und Logik</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableCell}>6</Text> 
          </View> 
          <View style={styles.tableSmallCol}>
            <Text style={styles.tableCell}></Text> 
          </View>  
        </View> 
        <View style={styles.tableRow}> 
          <View style={styles.tableBigCol}> 
            <Text style={styles.tableCell}>Berechenbarkeit und Logik NebenläufigeSysstem</Text> 
          </View> 
          <View style={styles.tableSmallCol}> 
            <Text style={styles.tableCell}>6</Text> 
          </View> 
          <View style={styles.tableSmallCol}>
            <Text style={styles.tableCell}>X</Text> 
          </View>  
        </View>
      </View>
        
      
      //Bereits bestanden Module
      <Text style={styles.tableTitle}>Bereits bestandene Module</Text>
      <View style={styles.table}> 
        //Header
        <View style={styles.tableHeaderRow}> 
          <View style={styles.tableBigCol2}> 
            <Text style={styles.tableHeaderCell}>Name</Text> 
          </View> 
          <View style={styles.tableSmallCol2}> 
            <Text style={styles.tableHeaderCell}>LP</Text> 
          </View> 
        </View>
        
        //Content
        <View style={styles.tableRow}> 
          <View style={styles.tableBigCol2}> 
            <Text style={styles.tableCell}>Algorithmen und Datenstrukturen</Text> 
          </View> 
          <View style={styles.tableSmallCol2}> 
            <Text style={styles.tableCell}>9</Text> 
          </View>    
        </View> 
      </View>
        </View>
      
      //Info
      <Text style={styles.infoText1}>Erstellt am 22.12.2023 18:36Uhr</Text>
      <Text style={styles.infoTextRed}>Verlaufsplan nach aktueller Prüfunsordnung ungültig</Text>
      <Text style={styles.infoTextGreen}>Verlaufsplan nach aktueller Prüfunsordnung gültig</Text>
      
    </Page>
  </Document>
);

ReactPDF.render(<Quixote />);

*/