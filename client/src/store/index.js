import {proxy} from 'valtio'

const state = proxy({
    intro:true,
    color:'#E09135',
    isLogoTexture:true,
    isFullTexture:false,
    isLogo:true,
    logoDecal:'./threejs.png',
    fullDecal:"./threejs.png"

})

export default state;