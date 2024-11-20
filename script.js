const klase_x = 'x';
const klase_o = 'circle';

/*
0 1 2
3 4 5
6 7 8
*/

const uzvaras_nosacijumi = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_pazinojums = document.querySelector('.resultInfo')
const atjaunot_poga = document.querySelector('#restartButton')
const attelot_speletaju = document.querySelector('.display')
let speletajs_O
let o_punkti = localStorage.getItem("o_Punkti")
let x_punkti = localStorage.getItem("x_Punkti")
const punkti = document.querySelector('.punkti')
atjauninat_punktus = document.querySelector('#restartPunktus')
sakt_speli()

function sakt_speli(){
    izvadit_Punktus(o_punkti,x_punkti)
    speletajs_O = false
    rezultatu_logs.classList.remove('show')
    visi_laucini.forEach(laucins =>{
        laucins.classList.remove(klase_x)
        laucins.classList.remove(klase_o)
        laucins.addEventListener('click', lietotaja_darbiba, {once:true})
    })
}

function lietotaja_darbiba(klikskis){
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_o : klase_x //binārais operators
    atzimet_laucinu(laucins, aktivais_speletajs)
    if(parbaudit_uzvaru(aktivais_speletajs)){      
        beigt_speli(false)
    }else if(neizskirts()){
        beigt_speli(true)
    }else{
        mainit_speletaju()
    }   
}

function atzimet_laucinu(laucins, aktivais_speletajs){
    laucins.classList.add(aktivais_speletajs)
}

function mainit_speletaju(){
    parbaude()
    speletajs_O = !speletajs_O
    attelot_speletaju.innerText = `${speletajs_O ? "O" : "X"}`
}

function parbaudit_uzvaru(aktivais_speletajs){
    return uzvaras_nosacijumi.some(nosacijums =>{
        return nosacijums.every(index =>{
            return visi_laucini[index].classList.contains(aktivais_speletajs)
        })
    })
}

function neizskirts(){
    return [...visi_laucini].every(laucins => {
        return laucins.classList.contains(klase_x) || laucins.classList.contains(klase_o)
    })
}

function beigt_speli(neizskirts){
    if(neizskirts){
        rezultatu_pazinojums.innerText = "Neizšķirts rezultāts!"
    }else{
        rezultatu_pazinojums.innerText = `Spēlētājs ${speletajs_O ? "O" : "X"} uzvarēja!`
    }

    rezultatu_logs.classList.add('show')
    if(neizskirts){
        return
    }else if(speletajs_O ? "O" : "X"=="O"){
        return o_punkti=o_punkti+1
    }else if(speletajs_O ? "O" : "X"=="X"){
        return x_punkti=x_punkti+1
    }
}

function izvadit_Punktus(o_punkti,x_punkti){
    if(o_punkti!=1 && x_punkti!=1){
        punkti.innerText = "Spēlētājam O ir "+o_punkti+" punkti. \nSpēlētājam X ir "+x_punkti+" punkti."
        localStorage.setItem("o_Punkti", o_punkti);
        localStorage.setItem("x_Punkti", x_punkti);
    }else if(o_punkti==1 && x_punkti!=1){
        punkti.innerText = "Spēlētājam O ir "+o_punkti+" punkts. \nSpēlētājam X ir "+x_punkti+" punkti."  
        localStorage.setItem("o_Punkti", o_punkti);
        localStorage.setItem("x_Punkti", x_punkti);
    }else if(o_punkti!=1 && x_punkti==1){
        punkti.innerText = "Spēlētājam O ir "+o_punkti+" punkti. \nSpēlētājam X ir "+x_punkti+" punkts." 
        localStorage.setItem("o_Punkti", o_punkti);
        localStorage.setItem("x_Punkti", x_punkti);   
    }else{
        punkti.innerText = "Spēlētājam O ir "+o_punkti+" punkts. \nSpēlētājam X ir "+x_punkti+" punkts." 
        localStorage.setItem("o_Punkti", o_punkti);
        localStorage.setItem("x_Punkti", x_punkti);
    }
}

function parbaude(){
    let body = document.querySelector("body")
    if(speletajs_O ? "O" : "X"=="O"){
        body.style.background = "#1a252c"
    }else{
        body.style.background = "#1c2c1a"  
    }
}

function uzvara(){
    visi_laucini.style.background = "green"
    
}

atjaunot_poga.addEventListener('click', sakt_speli)
atjauninat_punktus.addEventListener('click', function(){
    o_punkti = 0
    x_punkti = 0
    localStorage.setItem("o_Punkti", o_punkti);
    localStorage.setItem("x_Punkti", x_punkti);
    izvadit_Punktus(o_punkti,x_punkti)
})