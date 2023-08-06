import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { snapshot, useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIpicker,
  ColourPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";



const Custumizer = () => {
  const snap = useSnapshot(state);
  const [file,setFile]= useState("")
  const [prompt,setprompt]=useState("")
  const [generatingImg,setGeneratingImg]= useState(false)
  const[activeTab,setActiveTab]= useState("")
  const[activeFilterTab,setActiveFilterTab]=useState({logoShirt:true,stylishShirt:false})


  // generates the tab content when being hovered
  const generateTabContent=()=>{
    switch(activeTab){
      case "colorpicker":
        return <ColourPicker/>
      case "filepicker":
        return <FilePicker file={file} setFile={setFile}  readFile={readFile} />
      case "aipicker":
        return <AIpicker prompt={prompt} setPrompt={setprompt}  generatingImg={generatingImg} handelSubmit={handelSubmit}/>
      default :
       return null;
    }
 
  }

  const handelSubmit=async(type)=>{

    if(!prompt) return alert("Please entter prompt to generate image")
    
      try {

        setGeneratingImg(true)

const response = await fetch("http://localhost:8080/api/v1/dalle",{
     method: 'POST',
          headers:{
            'Content-type':'application/json',},
            body: JSON.stringify({
              prompt,
            })
          })
          console.log("sent data");

          const data = await response.json()
          handelDecal(type,`data:image/png;base64,${data.photo}`)
        
      } catch (error) {
        alert(error)
      }finally{
        setGeneratingImg(false)
        setActiveTab("")


      }


  }



// handelingt which filtertan=b is active or inactve
const handelActiveFiletertabs=(tabname)=>{
   switch(tabname){
   case "logoShirt":
    state.isLogoTexture = !activeFilterTab[tabname];
    break;
  case "stylishShirt":
    state.isFullTexture= !activeFilterTab[tabname]
    break;
   default:
    state.isFullTexture=false;
    state.isLogoTexture=true;
    break;

}
// After setting the state , the active filtertab must update the ui
 setActiveFilterTab((prevState)=>{
  return{

    ...prevState,
    [tabname]:!prevState[tabname]
  }
 })


}





  //function to set the decal of the shirt and updatethe propertied=s of the state
  const handelDecal=(type,result)=>{
    const decalType = DecalTypes[type]
    state[decalType.stateProperty]= result
    if(!activeFilterTab[decalType.filterTab]){
      handelActiveFiletertabs(decalType.filterTab)
    }

  }  






// function for reading the file
const readFile=(type)=>{
  reader(file).then((result)=>{
    handelDecal(type,result);
    setActiveTab("")
  })


}







  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveTab(tab.name)} />
                ))}
               {generateTabContent()}

              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Home"
              handelClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>


          <motion.div
          className="filtertabs-container"
          {...slideAnimation("up")}
          >
             {FilterTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]}  handleClick={() => handelActiveFiletertabs(tab.name)} />
                ))}


          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Custumizer;
