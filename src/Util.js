const loadAudio = async path => {
    const audio = new Audio(path)
    return audio
}

const range = (min,max,pass=1) => {
    let array = []
    if(min > max && pass > 0){ pass*=-1 }
    for(let i = min;i<max;i+=pass){ array.push(i) }
    return array
}

const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min

export { range, randint, loadAudio }