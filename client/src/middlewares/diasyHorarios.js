

const obtenerHora = (hora) => {
    let hour = []
    let separarHora = hora.split(':');
    let horaEnt = separarHora[0];
    let separarMin = hora.split(':');
    let minEnt = separarMin[1];
    hour.push([...hour , parseInt(horaEnt), parseInt(minEnt)])
    return hour
}



// En proceso...
export const obtenerHoras = (startHour, endHour, time) => {

    let hours = [];

    let horaInicio = obtenerHora(startHour);
    let horaFinal = obtenerHora(endHour);
    let duration = obtenerHora(time);



    for(let i = 0; i < horaFinal[0];i++) {
        let j = duration[0]
        if(horaInicio[0] < horaFinal[0]){
      
            

            hours.push([horaInicio[0] + j])
            j++
        }
    } 


    return hours 


}