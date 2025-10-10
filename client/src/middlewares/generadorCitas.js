
// Función RECIBE array de la pase de datos con las horas disponibles
// y para DEVUELVE las fechas y horas que selecciona la admin
export const ftnFechaDisponibilidad = (disponibilidad) => {

  let diaHoy =  new Date();
  let data = []
  let fechaDisponibilidad = []

  // Aquí se crean 31 días PARTIENDO de mañana
  for (let i = 0; i < 31; i++) {
      data.push({fecha: new Date(diaHoy.setDate(diaHoy.getDate() + 1))})
  }

  // Aquí extraigo las fechas que pertenecen a los días que marca la ADMIN
  for (let i = 0; i < data.length; i++) {
      let encontrado = false;
      let horas = []
      for (let j = 0; j < disponibilidad.length && !encontrado; j++) {
    
          if (data[i].fecha.getDay() === disponibilidad[j].availability_day) {
              fechaDisponibilidad.push({  fecha: new Date( data[i].fecha.getTime()),
                                          horas: horas
                                          })

              horas.push(disponibilidad[j].availability_hour)
                  
                    
          }
          
      }
      
  }

  return fechaDisponibilidad.filter((obj, i, self) => i === self.findIndex(o => new Date(o.fecha).getTime() === new Date(obj.fecha).getTime()))

}


// Función RECIBE las fecha y hora limpios 
// y DEVUELVE multe array con todas las fechas y hora de un mes
export const ftnArrCalendar = (fechasDisponibilidad) => {
  
  let arrCalendar = [];

  for (let i = 0; i < fechasDisponibilidad.length; i++) {
      
      let anio = new Date(fechasDisponibilidad[i].fecha);
      let mes = new Date(fechasDisponibilidad[i].fecha);
      let fecha = new Date(fechasDisponibilidad[i].fecha);

      let horas = fechasDisponibilidad[i].horas
      
      for (let j = 0; j < horas.length; j++) {
          arrCalendar.push({
              status: "free",
              start: new Date(anio.getFullYear(), // AÑO - ejemplo 2025
                              mes.getMonth(), // MES - ejemplo 10
                              fecha.getDate(), // FECHA - ejemplo 10
                              horas[j], // HORA - 10
                              0),
              end: new Date(anio.getFullYear(), // AÑejemplo 2025
                              mes.getMonth(), // MES - ejemplo 10
                              fecha.getDate(), // FECHA - ejemplo 10
                              horas[j] + 1, // HORA - 10 + 1
                              0),
          })
          
      }
      
  }
  return arrCalendar
}

