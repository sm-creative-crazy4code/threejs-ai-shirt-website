import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio'
import { headContainerAnimation,headContentAnimation,headTextAnimation,slideAnimation } from '../config/motion'
import state from '../store';
import { CustomButton } from '../components';


const Home = () => {
    const snap =useSnapshot(state)
  return (
   <AnimatePresence>
    {snap.intro &&(
        <motion.section classNmae="home "{...slideAnimation("left")}>
               <motion.header {...slideAnimation("down")}>
                <img
                  src='./threejs.png'
                  alt="logo"
                  className='w-8 h-8 object-contain'/>
               </motion.header>

               <motion.div className="home-content" {...headContainerAnimation}>
                  <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                           LET'S <br className='xl:block hidden'/> DESIGN
                        </h1>   
                  </motion.div>
                  <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='font-normal text0-grey-600 text-base'>Bring your imagination to reality,Design your own exclusive t-shirt.Unleash your creativity</p>
                    <CustomButton
                      type="filled"
                      title="Customize it"
                      handelClick={()=>state.intro=false}
                      customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                      
                    />
                  </motion.div>
               </motion.div>
        </motion.section>
    )}

   </AnimatePresence>
  )
}

export default Home
