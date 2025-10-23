

const obtenerHora = (hora) => {
    let hour = []
    let separarHora = hora.split(':');
    let horaEnt = separarHora[0];
    let separarMin = hora.split(':');
    let minEnt = separarMin[1];
    hour.push(...hour , parseInt(horaEnt), parseInt(minEnt))
    return hour
}


const obtenerHoras = (startHour, endHour, time) => {

    let hours = [];

    let horaInicio = obtenerHora(startHour);
    let horaFinal = obtenerHora(endHour);
    let duration = obtenerHora(time);

    for(let i = 0 ; i < horaInicio[0] ; i++) {
        let j = duration[0]
      if (horaInicio[0] <= horaFinal[0]) {
        hours.push(horaInicio[0])
        horaInicio[0] = horaInicio[0] + j
        j++
      }
    } 

    return hours
}

export const diasHoras = (dias, startHour, endHour, time) => {

    let diaHora = [];
    let j = 1;

    for(let i = 0; i < dias; i++) {
        if(j <= dias) {
            diaHora.push({[j]:obtenerHoras (startHour, endHour, time)})
            j++
        }
    }

    return diaHora
}


export const converteNumInTextDay = (n) => {
    let day = ''
    if ( n === 1 )  {
        day = 'Lunes';
    }
    else if ( n === 2 ) {
        day = 'Martes';
    }
    else if ( n === 3 ) {
        day = 'Miércoles';
    }
    else if ( n === 4 ) {
        day = 'Jueves';
    }
    else if ( n === 5 ) {
        day = 'Viernes'
    }
    else if ( n === 6 ) {
        day = 'Sábado'
    }
    else if ( n === 7 ) {
        day = 'Domingo'
    }

    return day
}