fetch("https://raw.githubusercontent.com/dariosus/chicas-ds/master/data.json")
.then(function(respuesta) {
  return respuesta.json()
})
.then(function(obras) {

  console.log(obras);

  let barrios = [];
  let cantMetros = [];
  let montoBarrio = [];

  // Vamos a recorrer y repetir segun la cantidad de obras
  for (let i = 0; i < obras.length; i++) {
    // Decime a que numero de barrio pertenece la obra
    let indiceDeBarrio = barrios.indexOf(obras[i].barrio);

    // Si aun el barrio no estaba identificado
    if (indiceDeBarrio == -1) {
      // Creamos el barrio
      barrios.push(obras[i].barrio);
      // Recuperamos el indice nuevo
      indiceDeBarrio = barrios.indexOf(obras[i].barrio);
    }

    // Determinamos la cantidad de metros de ese barrio (nos lo dice la obra actual. no importa que obra sea pero seguro es del bario))
    cantMetros[indiceDeBarrio] = obras[i].area_barrio;

    // Si estamos en la primero obra de ese barrio, aun no tenemos monto! Por eso, en ese caso, lo inicializamos en 0
    if (montoBarrio[indiceDeBarrio] == undefined) {
      montoBarrio[indiceDeBarrio] = 0;
    }

    // Sumamos el monto de esa obra al acumulado del barrio
    montoBarrio[indiceDeBarrio] = montoBarrio[indiceDeBarrio] + obras[i].monto_contrato;
  }
  // Al final de este for deberiamos tener el listado de barrios, el listado de metros cuadrados y el listado de montos acumulados

  console.log(barrios, cantMetros, montoBarrio);

  var numerosFinales = [];

  for (let i = 0; i < barrios.length; i++) {
    numerosFinales.push(montoBarrio[i] / cantMetros[i]);
  }

  console.log(numerosFinales);

  let nombreGrafico = "Monto por metro cuadrado del barrio.";

  let datos = numerosFinales;

  let tipoGrafico = "bar";

  let nombresDatos = barrios;

  let infoChart = {
    type: tipoGrafico,
    data: {
        labels: nombresDatos,
        datasets: [{
            label: nombreGrafico,
            data: datos,
            backgroundColor: "pink"
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  };


  let ctx = document.getElementById('metrosCuadradosPorObras').getContext('2d');
  let myChart = new Chart(ctx, infoChart);



})
