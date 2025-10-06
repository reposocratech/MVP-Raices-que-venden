import { toLowerCase } from "zod"


export const iconsRedes = (name) => {
    let icon = ''
    if (name.toLowerCase() === 'instagram') {
        icon = 'bi bi-instagram'
    } 
    else if(name.toLowerCase() === 'facebook'){
        icon = 'bi bi-facebook'
    } 
    else if (name.toLowerCase() === 'x'){
        icon = 'bi bi-twitter-x'
    }
    else if (name.toLowerCase() === 'twitch'){
        icon = 'bi bi-twitch'
    }
    else if (name.toLowerCase() === 'youtube'){
        icon = 'bi bi-youtube'
    }
    else if (name.toLowerCase() === 'tiktok'){
        icon = 'bi bi-tiktok'
    }
    else if (name.toLowerCase() === 'vimeo'){
        icon = 'bi bi-vimeo'
    }
    else if (name.toLowerCase() === 'threads'){
        icon = 'bi bi-threads'
    }

    return icon
}