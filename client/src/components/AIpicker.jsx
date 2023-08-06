import React from 'react'
import CustomButton from './CustomButton'



const AIpicker = ({prompt,setPrompt,generatingImg,handelSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea placeholder='Ask AI...' rows={5} value={prompt} onChange={(e)=>setPrompt(e.target.value)} className='aipicker-textarea' />
    
    <div className="flex flex-wrap gap-3" > 
    
    {generatingImg?(<CustomButton type='outline' title="Asking AI.." customStyle="text-xs" />):(<>
    
      <CustomButton type='outline' title="AI Logo" customStyle="text-xs"  handelClick={()=>handelSubmit('logo')}/>
      <CustomButton type='filled' title="AI Full" customStyle="text-xs"  handelClick={()=>handelSubmit('full')} />
    
    
    </>)


    }
    
    </div>
    </div>
  )
}

export default AIpicker
