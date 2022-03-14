
let intTemas = 2 // 0-Normal, 1-Dark, 2-Normal Landscape, Dark Landscape

const arrayPuntos = [] // puntos
const arrayOuts = [] // outs
const arrayBotones = [] // botones numericos
const arrayLabelPuntos = [] // label puntaje
const arrayLabelOuts = [] // label de outs
const arrayTextos = ['Desbloquea para comenzar',
  '¡PLAYBALL!',
  'PAUSE',
  'Afuera a...',
  'Faltan ',
  ' minutos',
  'AFUERA',
  'Tiempo terminado',
  'Equipo Rojo',
  'Equipo Blanco',
  'Configuración'
]

function funIdDelElemento (i) {
  return document.getElementById(i)
}

const elementosDelDocumento = document.documentElement
const puntostotalesrojo = funIdDelElemento('puntostotalesrojo')
const puntostotalesblanco = funIdDelElemento('puntostotalesblanco')
const botonsuperior = funIdDelElemento('botonsuperior')
const botoninferior = funIdDelElemento('botoninferior')
const iconopausa = funIdDelElemento('iconopausa')
const iconoplay = funIdDelElemento('iconoplay')
const barraroja = funIdDelElemento('barraroja')
const barrablanca = funIdDelElemento('barrablanca')
const iconobloqueado = funIdDelElemento('iconobloqueado')
const iconodesbloqueado = funIdDelElemento('iconodesbloqueado')
const iconooutinactivo = funIdDelElemento('iconooutinactivo')
const botonizquierdo = funIdDelElemento('botonizquierdo')
const iconofullscreen = funIdDelElemento('iconofullscreen')
const iconoquitarfullscreen = funIdDelElemento('iconoquitarfullscreen')
// boton config
const botonderecho = funIdDelElemento('botonderecho')
const iconotuerca = funIdDelElemento('iconotuerca')
const iconocierre2 = funIdDelElemento('iconocierre2')
const botonenout = funIdDelElemento('botonenout')

const botontiempo = funIdDelElemento('botontiempo')
const textotiempo = funIdDelElemento('textotiempo')

const textoMensaje = funIdDelElemento('textoMensaje')
const textoMensaje2 = funIdDelElemento('textoMensaje2')
const fondo1 = funIdDelElemento('fondo1')
const textoesquina1 = funIdDelElemento('textoesquina1')
const textoesquina2 = funIdDelElemento('textoesquina2')
// setup icon
// const soldia = funIdDelElemento('soldia')
// const lunanoche = funIdDelElemento('lunanoche')
const convibracion = funIdDelElemento('convibracion')
const sinvibracion = funIdDelElemento('sinvibracion')
const iconoconsonido = funIdDelElemento('iconoconsonido')
const iconosinsonido = funIdDelElemento('iconosinsonido')
// setup button
const botoncambiotemas = funIdDelElemento('botoncambiotemas')
const botonvibracion = funIdDelElemento('botonvibracion')
const botonsonido = funIdDelElemento('botonsonido')
// setup other component
const tapaParaConfig = funIdDelElemento('tapaParaConfig')
const tapaParaTiempo = funIdDelElemento('tapaParaTiempo')
// botonoes nombres de los equipos
const nombreRojo = funIdDelElemento('nombreRojo')
// const nombreBlanco = funIdDelElemento('nombreBlanco')

let i, intContadorMayorRojo, intContadorMayorBlanco, intTiempoDeInicio
let tiempolimite, tiempoFaltante
let intWinner // 0empate 1rojo 2blanco
let intEstado = 0 // Estado del reloj (0-iniciando 1-en play 2-en pausa 3-finish 4-en out 5-config 6-terminado)
let intIdTimer

const booleanTrue = true
const booleanFalse = false

let booleanLock = booleanTrue // Tlock Funlock
let booleanBotonOutActivo = booleanFalse // para marcar el out antes de ponerlo (tocando el boton play)
let booleanMin5 // para saber si esta en 5, 10 o 15 minutos

let booleanSonido = booleanTrue // sonido
// let sun = booleanFalse // unidad grafica
let booleanVibracion = booleanFalse // vibracion

function funPonerComponente (e) {
  e.style.display = 'block'
}

function funQuitarComponente (e) {
  e.style.display = 'none'
}

function funDisplayIcons () {
  // console.log('lock: ' + booleanLock + ' Estado: ' + intEstado)
  switch (booleanLock) {
    case booleanTrue: // si esta bloqueado...
      switch (intEstado) {
        case 0: // inicio (LOCK)
          funPonerIcono('nada')
          funDejarMensaje('Desbloquea para comenzar')
          break
        case 1: // en play (LOCK)
          funPonerIcono('out')
          break
        case 2: // en pausa (LOCK)
          funPonerIcono('out')
          funDejarMensaje('PAUSA')
          break
        case 3: // en mensaje de tiempo (start, 15, 10, 5) (LOCK)
          funPonerIcono('out')
          break
        case 4: // en out (LOCK)
          break
        case 5: // en configuracion (LOCK)
          break
        case 6: // tiempo terminado (LOCK)
          funPonerIcono('out')
          funDejarMensaje('Tiempo finalizado')
          break
      }
      funQuitarBotonesLateralesLock()
      break

    case booleanFalse: // si esta desbloqueado...
      switch (intEstado) {
        case 0: // inicio (UNLOCK)
          funPonerIcono('play')
          // funQuitarComponente(textoMensaje)
          funQuitarComponente(textoMensaje2)
          break
        case 1: // en play (UNLOCK)
          funPonerIcono('pausa')
          break
        case 2: // en pausa (UNLOCK)
          funPonerIcono('play')
          funDejarMensaje('PAUSA')
          break
        case 3: // en mensaje de tiempo (start, 15, 10, 5) (UNLOCK)
          funPonerIcono('play')
          break
        case 4: // en out (UNLOCK)
          break
        case 5: // en configuracion (UNLOCK)
          break
        case 6: // tiempo terminado (UNLOCK)
          funPonerIcono('play')
          funDejarMensaje('Toca play para reiniciar')
          break
      }
      funPonerBotonesLateralesUnlock()
      break
  }
}

function funQuitarBotonesLateralesLock () { // solo visualmente
  funQuitarComponente(iconodesbloqueado)
  funPonerComponente(iconobloqueado)
  funQuitarComponente(botonderecho)
  funQuitarComponente(botonizquierdo)
}

function funPonerBotonesLateralesUnlock () { // solo visualmente
  funPonerComponente(iconodesbloqueado)
  funQuitarComponente(iconobloqueado)
  funPonerComponente(botonderecho)
  funPonerComponente(botonizquierdo)
}

function funDejarMensaje (mensaje) {
  if (mensaje === 'nada') {
    funQuitarComponente(textoMensaje2)
    // funPonerComponente(textoMensaje)
  } else {
    funEscribirEnHTML(textoMensaje2, mensaje)
    // funQuitarComponente(textoMensaje)
    funPonerComponente(textoMensaje2)
  }
}

function funPonerIcono (icono) {
  switch (icono) {
    case 'out':
      funPonerComponente(iconooutinactivo)
      funQuitarComponente(iconoplay)
      funQuitarComponente(iconopausa)
      botoninferior.disabled = booleanFalse
      break
    case 'play':
      funQuitarComponente(iconooutinactivo)
      funPonerComponente(iconoplay)
      funQuitarComponente(iconopausa)
      botoninferior.disabled = booleanFalse
      break
    case 'pausa':
      funQuitarComponente(iconooutinactivo)
      funQuitarComponente(iconoplay)
      funPonerComponente(iconopausa)
      botoninferior.disabled = booleanFalse
      break
    case 'nada':
      funQuitarComponente(iconooutinactivo)
      funQuitarComponente(iconoplay)
      funQuitarComponente(iconopausa)
      botoninferior.disabled = booleanTrue
      break
  }
}

function funEscribirEnHTML (h, x) {
  h.innerHTML = x
}

// let bEnMensajeVolatil = booleanFalse

function funDejarMensajeVolatil (mensaje) {
  // cambioFondoTextoMensaje()

  funEscribirEnHTML(textoMensaje, mensaje)
  // textoMensaje.style.background = colorFondoMensaje
  // funPonerComponente(textoMensaje)
  // bEnMensajeVolatil = booleanTrue
  // // console.log('bEnMensajeVolatil = booleanTrue TRUE TRUE TRUE TRUE TRUE TRUE')
}

function funTerminadoMensajeVolatil () {
  // bEnMensajeVolatil = booleanFalse
  // // console.log('bEnMensajeVolatil = false FALSE FALSE FALSE FALSE FALSE FALSE')
  funEscribirEnHTML(textoMensaje, '')
  // textoMensaje.style.background = 'transparent'
  // // console.log('poniendo fondo trasparente')
}

function funMostrarEsquina () {
  textoesquina1.setAttribute('class', 'mostrar') // animacion con css (no puedo cortar la animacion)
  textoesquina2.setAttribute('class', 'mostrar')
  textoesquina1.style.opacity = '1'
  textoesquina2.style.opacity = '1'
}

function funClickLock () {
  switch (booleanLock) {
    case booleanTrue:
      booleanBotonOutActivo = booleanFalse
      funQuitarOut()
      booleanLock = booleanFalse
      if ((intEstado !== 1) || (intEstado === 2)) botontiempo.disabled = booleanFalse
      funDisplayIcons()
      break
    case booleanFalse:
      booleanLock = booleanTrue
      if (intEstado !== 2) botontiempo.disabled = booleanTrue
      funDisplayIcons()
      break
  }
  switch (intEstado) {
    case 0: // inicio
      break
    case 1: // en play
      playBeVi()
      break
    case 2: // en pausa
      playBeVi()
      break
    case 3: // en mensaje de tiempo
      break
    case 4: // en out
      playBeVi()
      break
    case 5: // en config
      break
    case 6: // tiempo terminado
      playBeVi()
      break
  }
}

function funGetMin (t) {
  return Math.trunc(t / (60 * 1000))
}

function funGetSec (t, m) {
  return Math.trunc((t / 1000) - (m * 60))
}

function funPutTime (m, s) {
  funEscribirEnHTML(textotiempo, funDejar0CuandoMenor10(m) + ':' + funDejar0CuandoMenor10(s))
}

function funPutIniTime (t) {
  const m = funGetMin(t)
  funPutTime(m, funGetSec(t, m))
}

function funTimeFalta () {
  return tiempolimite - (Date.now() - intTiempoDeInicio)
}
// let en5min = booleanFalse
let booleanOnTime = booleanTrue

let intIdTiempoDeLaMensajeria
let intTiempoInicialDelMensaje
let intDuracionDelMensaje = 0

function funQuitarMensajeDetenido () {
  // console.log('funQuitarMensajeDetenido- intDuracionDelMensaje es: ' + intDuracionDelMensaje)
  if (intDuracionDelMensaje < 1) {
    // console.log('intDuracionDelMensaje es menor que 1: ' + intDuracionDelMensaje)
    intDuracionDelMensaje = 10000
    intTiempoInicialDelMensaje = Date.now()
    intIndexMensajeVolatil = 5
  } else if (intDuracionDelMensaje > 0) {
    intDuracionDelMensaje = 10000 - (Date.now() - intTiempoInicialDelMensaje)
    // console.log('intDuracionDelMensaje es: ' + intDuracionDelMensaje)
  }
  clearTimeout(intIdTiempoDeLaMensajeria)
  intIdTiempoDeLaMensajeria = setTimeout(function () {
    funTerminadoMensajeVolatil()
  }, intDuracionDelMensaje)
}

function funDetenMensajeVolatil (z) {
  // console.log('numero de funDetenMensajeVolatil es: ' + intIndexMensajeVolatil)
  switch (z) {
    case 0: // playball
      if (tiempolimite === 1800000) funDejarMensajeVolatil('¡PLAYBALL!')
      funQuitarMensajeDetenido() // lo quita despues de 10 segundos
      break
    case 1: // 15 minutos
      funDejarMensajeVolatil('Faltan 15 minutos')
      play5MinBeVi()
      intDuracionDelMensaje = 0
      funQuitarMensajeDetenido() // lo quita despues de 10 segundos
      break
    case 2: // 10 minutos
      funDejarMensajeVolatil('Faltan 10 minutos')
      play5MinBeVi()
      intDuracionDelMensaje = 0
      funQuitarMensajeDetenido() // lo quita despues de 10 segundos
      break
    case 3: // 5 minutos
      funDejarMensajeVolatil('Faltan 5 minutos')
      play5MinBeVi()
      intDuracionDelMensaje = 0
      funQuitarMensajeDetenido() // lo quita despues de 10 segundos
      break
    case 4: // tiempo finalizado
      funDejarMensaje('Tiempo finalizado')
      break
  }
}

let intMinutosFaltantes
let intIndexMensajeVolatil = 5

function funTimer () {
  if (intEstado === 0) { // desde cero
    funDetenMensajeVolatil(0)
    intTiempoDeInicio = Date.now()
    tiempolimite-- // descuento una milesima para que quede en 29:59
    intEstado = 1
    playStartBeVi()
  } else if (intEstado === 2) { // desde la pausa
    intTiempoDeInicio = Date.now()
    intEstado = 1
    funDisplayIcons()
    playRestartBeVi()
  }

  tiempoFaltante = funTimeFalta()

  intMinutosFaltantes = funGetMin(tiempoFaltante)
  const segundosFaltantes = funGetSec(tiempoFaltante, intMinutosFaltantes)
  let milesimasFaltantes = tiempoFaltante - ((intMinutosFaltantes * 60000) + (segundosFaltantes * 1000))

  // // console.log(milesimasFaltantes + ' milesimasFaltantes')

  if ((intMinutosFaltantes < 1) && (segundosFaltantes < 1) && (milesimasFaltantes <= 0)) { // termina
    clearTimeout(intIdTimer)
    // console.log('JUEGO TERMINADO')
    playEndBeVi()
    if (!booleanSetup) booleanLock = booleanTrue
    intEstado = 6
    funDisplayIcons()
    funDetenMensajeVolatil(4)
  }

  milesimasFaltantes = milesimasFaltantes + 7
  // si queda en diferencial 0, se genera un loop a la funcion
  // duplicando el metodo.
  // Por eso sumo por lo menos unas 7ms
  // a las milesimasFaltantes

  // // console.log(intMinutosFaltantes + ' minutos ' +
  // segundosFaltantes + ' segundos ' + milesimasFaltantes + ' milesimas')
  // // console.log('booleanBotonEnFuncion es: ' + booleanBotonEnFuncion)

  funPutTime(intMinutosFaltantes, segundosFaltantes)

  if ((booleanOnTime) && (booleanMin5)) funDetenMensajeVolatil(intIndexMensajeVolatil)

  if (((intMinutosFaltantes === 15) || (intMinutosFaltantes === 10) || (intMinutosFaltantes === 5)) && (segundosFaltantes === 0)) {
    booleanMin5 = booleanTrue
    // console.log('booleanMin5 = booleanTrue')
  } else {
    booleanMin5 = booleanFalse
    // console.log('booleanMin5 = booleanFalse')
  }

  if ((intMinutosFaltantes === 15) && (segundosFaltantes === 0)) {
    intIndexMensajeVolatil = 1
    // console.log('TESTEANDO 15 MINUTOS')
  }
  if ((intMinutosFaltantes === 14) && (segundosFaltantes === 47)) {
    if (!booleanEstaEsquinado) {
      booleanEstaEsquinado = booleanTrue
      funMostrarEsquina()
      // console.log('MOSTRAR ESQUINA')
    }
  }
  if ((intMinutosFaltantes === 10) && (segundosFaltantes === 0)) {
    intIndexMensajeVolatil = 2
    // console.log('TESTEANDO 10 MINUTOS')
  }
  if ((intMinutosFaltantes === 5) && (segundosFaltantes === 0)) {
    intIndexMensajeVolatil = 3
    // console.log('TESTEANDO 5 MINUTOS')
  }
  if ((intMinutosFaltantes === 0) && (segundosFaltantes === 0)) {
    intIndexMensajeVolatil = 4
    // console.log('TESTEANDO 1 SEGUNDO')
  }

  if (intEstado === 1) {
    intIdTimer = setTimeout(function () {
      funTimer()
    }, milesimasFaltantes)
  }
}

function funClickBotonInferior () {
  switch (booleanLock) {
    case booleanTrue: // lock
      switch (intEstado) {
        case 0: // nada
          break
        case 1: // en out
          funClickOut()
          break
        case 2: // en out
          funClickOut()
          break
        case 6: // en out
          funClickOut()
          break
      }
      break

    case booleanFalse: // unlock
      switch (intEstado) {
        case 0: // muestra play desde el inicio (inicio)
          funTimer()
          funCheckWin(arrayLabelPuntos)
          booleanLock = booleanTrue
          funDisplayIcons()
          break
        case 1: // muestra pause (en play)
          tiempolimite = funTimeFalta()
          clearTimeout(intIdTimer)
          intEstado = 2
          booleanLock = booleanTrue
          funDisplayIcons()
          playBeVi()
          break
        case 2: // muestra play desde la pausa (en pausa)
          funTimer()
          booleanLock = booleanTrue
          funQuitarBotonesLateralesLock()
          funDisplayIcons()
          funDejarMensaje('nada')
          break
        case 6: // muestra play cuando termina (terminado)
          funReset()
          intEstado = 0
          funTimer()
          funCheckWin(arrayLabelPuntos)
          booleanLock = booleanTrue
          funDisplayIcons()
          funDejarMensaje('nada')
          funDetenMensajeVolatil(0)
          break
      }
      break
  }
}

function funClickOut () {
  switch (booleanBotonOutActivo) {
    case booleanFalse:
      booleanBotonOutActivo = booleanTrue
      funPonerComponente(botonenout)
      funQuitarComponente(botoninferior)
      funDejarMensaje('Afuera a...')
      playRestartBeVi()
      break
    case booleanTrue:
      booleanBotonOutActivo = booleanFalse
      funQuitarOut()
      playBeVi()
      break
  }
}

function funQuitarOut () {
  funQuitarComponente(botonenout)
  funPonerComponente(botoninferior)
  if (intEstado === 2) { // (en pausa)
    funDejarMensaje('PAUSA')
  } else if (intEstado === 6) { // terminado
    funDejarMensaje('Tiempo finalizado')
  } else {
    funQuitarComponente(textoMensaje2)
    funPonerComponente(textoMensaje)
  }
}

const booleanBotonEnFuncion = booleanFalse

function funPonerCadaBotonNumerico (n) {
  arrayBotones[n] = funIdDelElemento('boton' + n)
  arrayLabelOuts[n] = funIdDelElemento('out' + n)
  arrayLabelPuntos[n] = funIdDelElemento('puntos' + n)

  funEscribirEnHTML(arrayLabelOuts[n], arrayTextos[6]) // Mensaje "AFUERA" dentro del boton

  arrayBotones[n].onclick = function () {
    // console.log('booleanBotonEnFuncion es: ' + booleanBotonEnFuncion)

    if (!booleanBotonEnFuncion) {
      if (booleanBotonOutActivo) { // si esta activado el boton out
        if ((arrayPuntos[n] !== 0) && (arrayPuntos[n] !== 5)) {
          playRestartBeVi()
          arrayOuts[n] = booleanTrue
          funPonerComponente(arrayLabelOuts[n])
        } else {
          playBeVi()
        }

        booleanBotonOutActivo = booleanFalse
        funQuitarOut()
      } else { // normal
        playBeVi()
        if (arrayOuts[n]) { // si el numero esta en out
          arrayOuts[n] = booleanFalse
          funQuitarComponente(arrayLabelOuts[n])
        } else { // ahora si sumo
          funSumar(n)
        }
      }
      if (intEstado === 6) funDejarMensaje('Tiempo finalizado')
    }
  }
}

function funReset () { // reinicio de puntajes y tiempo
  for (i = 0; i < 10; i++) {
    arrayPuntos[i] = 0
    funEscribirEnHTML(arrayLabelPuntos[i], arrayPuntos[i])
    arrayOuts[i] = booleanFalse

    funQuitarComponente(arrayLabelOuts[i])
  }
  funSumaTotal()
  intWinner = 3
  funPutWinBar()
  tiempolimite = 1800000

  funPutIniTime(tiempolimite)
}

function funSumar (n) { // sumo la bola
  if (arrayPuntos[n] === 3) {
    arrayPuntos[n] = 5
  } else if (arrayPuntos[n] === 5) {
    arrayPuntos[n] = 0
  } else {
    arrayPuntos[n]++
  }
  funEscribirEnHTML(arrayLabelPuntos[n], arrayPuntos[n])
  funSumaTotal()
  funCheckWin()
}

function funSumaTotal () {
  funEscribirEnHTML(puntostotalesblanco, funDejar0CuandoMenor10(arrayPuntos[0] + arrayPuntos[2] + arrayPuntos[4] + arrayPuntos[6] + arrayPuntos[8]))
  funEscribirEnHTML(puntostotalesrojo, funDejar0CuandoMenor10(arrayPuntos[1] + arrayPuntos[3] + arrayPuntos[5] + arrayPuntos[7] + arrayPuntos[9]))
}

function funDejar0CuandoMenor10 (n) {
  if (n < 10) {
    if (n < 0) {
      n = 0
    }
    return '0' + n
  } else {
    return n
  }
}

function funCheckWin () {
  const tr = arrayPuntos[1] + arrayPuntos[3] + arrayPuntos[5] + arrayPuntos[7] + arrayPuntos[9]
  const tw = arrayPuntos[0] + arrayPuntos[2] + arrayPuntos[4] + arrayPuntos[6] + arrayPuntos[8]
  if (tr > tw) {
    intWinner = 1
  } else if (tr < tw) {
    intWinner = 2
  } else {
    intContadorMayorRojo = 0
    intContadorMayorBlanco = 0
    for (i = 0; i < 10; i++) {
      if (arrayPuntos[i] === 5) {
        if (i % 2 === 0) {
          intContadorMayorBlanco++
        } else {
          intContadorMayorRojo++
        }
      }
    }
    if (intContadorMayorRojo > intContadorMayorBlanco) {
      intWinner = 1
    } else if (intContadorMayorRojo < intContadorMayorBlanco) {
      intWinner = 2
    } else {
      for (i = 0; i < 10; i++) {
        if (arrayPuntos[i] === 3) {
          if (i % 2 === 0) {
            intContadorMayorBlanco++
          } else {
            intContadorMayorRojo++
          }
        }
      }
    }
    if (intContadorMayorRojo > intContadorMayorBlanco) {
      intWinner = 1
    } else if (intContadorMayorRojo < intContadorMayorBlanco) {
      intWinner = 2
    } else {
      for (i = 0; i < 10; i++) {
        if (arrayPuntos[i] === 2) {
          if (i % 2 === 0) {
            intContadorMayorBlanco++
          } else {
            intContadorMayorRojo++
          }
        }
      }
    }
    if (intContadorMayorRojo > intContadorMayorBlanco) {
      intWinner = 1
    } else if (intContadorMayorRojo < intContadorMayorBlanco) {
      intWinner = 2
    } else {
      intWinner = 0
    }
  }
  funPutWinBar()
}

function funPutWinBar () {
  switch (intWinner) {
    case 0:
      funQuitarComponente(barraroja)
      funQuitarComponente(barrablanca)
      break
    case 1:
      funPonerComponente(barraroja)
      funQuitarComponente(barrablanca)
      break
    case 2:
      funQuitarComponente(barraroja)
      funPonerComponente(barrablanca)
      break
    case 3:
      funPonerComponente(barraroja)
      funPonerComponente(barrablanca)
      break
  }
}

botonsuperior.onclick = funClickLock
botoninferior.onclick = funClickBotonInferior
botonenout.onclick = funClickOut

for (i = 0; i < 10; i++) {
  funPonerCadaBotonNumerico(i)
}

funReset()
funDisplayIcons()
funQuitarOut()

/* ****************************************************************************/
/* ********************************FULLSCREEN**********************************/
/* ****************************************************************************/

funChangeIconFullScreen()

botonizquierdo.onclick = funOpenFullscreen

function funIsFullScreen () {
  return document.fullscreenElement || document.mozFullScreenElement ||
    document.webkitFullscreenElement || document.msFullscreenElement
}

function funOpenFullscreen () {
  if (intEstado !== 0) {
    if (!booleanSetup) {
      booleanLock = booleanTrue
      funDisplayIcons()
    }
  }

  const elementFullScreen = funIsFullScreen()

  if (elementFullScreen != null) { // ***********Si esta en fullscreen, lo quito
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen()
    }
    funQuitarComponente(iconoquitarfullscreen)
    funPonerComponente(iconofullscreen)
    playBeVi()
  } else { // *********************************Si esta SIN fullscreen, lo pongo
    if (elementosDelDocumento.requestFullscreen) {
      elementosDelDocumento.requestFullscreen()
    } else if (elementosDelDocumento.mozRequestFullScreen) {
      /* Firefox */
      elementosDelDocumento.mozRequestFullScreen()
    } else if (elementosDelDocumento.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elementosDelDocumento.webkitRequestFullscreen()
    } else if (elementosDelDocumento.msRequestFullscreen) {
      /* IE/Edge */
      elementosDelDocumento.msRequestFullscreen()
    }
    funQuitarComponente(iconofullscreen)
    funPonerComponente(iconoquitarfullscreen)
    playRestartBeVi()
  }
}

/* ****************************************************************************/
/* ***************************TEXTO ESQUINADO**********************************/
/* ****************************************************************************/

let booleanEstaEsquinado = booleanFalse

function funPxToInt (pixel) {
  return Number(pixel.replace(/px$/, ''))
}

function funMoverTextoEsquinado () {
  funChangeIconFullScreen() // para saber si esta en fullscreen cuando cambia de tamaño
  const anchNavegador = window.innerWidth
  const altoNavegador = window.innerHeight
  const fondo1Anch = fondo1.clientWidth
  const fondo1Alto = fondo1.clientHeight
  const difAnch = anchNavegador - fondo1Anch
  const difAlto = altoNavegador - fondo1Alto
  const fuenteLetraMasChica = funPxToInt(window.getComputedStyle(nombreRojo).fontSize)

  if (difAlto > 1) { // sale el texto por abajo
    funQuitarComponente(textoesquina2)
    funPonerComponente(textoesquina1)

    if (fuenteLetraMasChica < 14) {
      textoesquina1.style.height = '14px'
      textoesquina1.style.width = '105px'
      textoesquina1.style.fontSize = '12px'
    } else {
      textoesquina1.style.height = '4vw'
      textoesquina1.style.width = '30vw'
      textoesquina1.style.fontSize = '3.5vw'
    }
  } else if (difAnch > 1) { // sale el texto por la derecha (Es Mejor tener dos div en ves de rotar un div cada cambia de lugar)
    funQuitarComponente(textoesquina1)
    funPonerComponente(textoesquina2)

    if (fuenteLetraMasChica < 14) {
      textoesquina2.style.height = '17px'
      textoesquina2.style.width = '180px'
      textoesquina2.style.bottom = '54px'
      textoesquina2.style.right = '-79px'
      textoesquina2.style.fontSize = '14px'
    } else {
      textoesquina2.style.height = '4vh'
      textoesquina2.style.width = '41vh'
      textoesquina2.style.bottom = '12vh'
      textoesquina2.style.right = '-18vh'
      textoesquina2.style.fontSize = '3.2vh'
    }
  } else {
    funQuitarComponente(textoesquina2)
    funQuitarComponente(textoesquina1)
  }
}
funMoverTextoEsquinado()

window.onresize = funMoverTextoEsquinado // ****Cualquier cambio de tamaño de la pantalla

function funChangeIconFullScreen () {
  const elementFullScreen = funIsFullScreen()

  if (elementFullScreen != null) {
    // console.info('En fullscreen')
    funQuitarComponente(iconofullscreen)
    funPonerComponente(iconoquitarfullscreen)
  } else {
    // console.info('Fuera del fullscreen')
    funQuitarComponente(iconoquitarfullscreen)
    funPonerComponente(iconofullscreen)
  }
}

/*****************************************************************************/
/** ****************************Color tabs********************************* **/
/*****************************************************************************/

function funChangeThemeColor (c) {
  const metaThemecolor = document.querySelector('meta[name=theme-color]')
  metaThemecolor.setAttribute('content', c)
}
funChangeThemeColor('#000')

/*****************************************************************************/
/** ****************************Sonido************************************* **/
/*****************************************************************************/

const soundBeep = document.createElement('audio')
soundBeep.src = 'snd/beep.wav'

function funPlayBeep () {
  soundBeep.currentTime = 0
  soundBeep.play()
}

function funDelayBeep (n) {
  setTimeout(function () {
    soundBeep.currentTime = 0
    soundBeep.play()
  }, n)
}

function funPlayStartBeep () {
  funPlayBeep()
  funDelayBeep(240)
}

function funPlay5MinBeep () {
  funPlayStartBeep()
  funDelayBeep(1000)
  funDelayBeep(1240)
}

function funPlayTripleBeep (s) {
  funDelayBeep(s)
  funDelayBeep(s + 160)
  funDelayBeep(s + 320)
}

function funPlayEndBeep () {
  funPlayTripleBeep(0)
  funPlayTripleBeep(1000)
  funPlayTripleBeep(2000)
}

function funPlayRestartBeep () {
  funPlayBeep()
  funDelayBeep(160)
}

/*****************************************************************************/
/** ****************************VIBRACION********************************** **/
/*****************************************************************************/

function playVibra () {
  window.navigator.vibrate(120)
}

function playStartVibra () {
  window.navigator.vibrate([120, 120, 120])
}

function play5MinVibra () {
  window.navigator.vibrate([120, 120, 120, 640, 120, 120, 120])
}

function playRestartVibra () {
  window.navigator.vibrate([80, 80, 80])
}

function playEndVibra () {
  window.navigator.vibrate([80, 80, 80, 80, 80, 600, 80, 80, 80, 80, 80, 600, 80, 80, 80, 80, 80])
}

/*****************************************************************************/
/** *****************************BEEP & VIBRA****************************** **/
/*****************************************************************************/

function playBeVi () {
  if (booleanSonido) funPlayBeep()
  if (booleanVibracion) playVibra()
}

function playStartBeVi () {
  if (booleanSonido) funPlayStartBeep()
  if (booleanVibracion) playStartVibra()
}

function play5MinBeVi () {
  if (booleanSonido) funPlay5MinBeep()
  if (booleanVibracion) play5MinVibra()
}

function playRestartBeVi () {
  if (booleanSonido) funPlayRestartBeep()
  if (booleanVibracion) playRestartVibra()
}

function playEndBeVi () {
  if (booleanSonido) funPlayEndBeep()
  if (booleanVibracion) playEndVibra()
}

/*****************************************************************************/
/** ******************************Setup click****************************** **/
/*****************************************************************************/

const tapaR = funIdDelElemento('tapaR')

let booleanSetup = booleanFalse

function funOpenSetup () {
  funPonerComponente(tapaParaConfig)
  // funPonerComponente(tapaParaTiempo)
  funPonerComponente(botoncambiotemas)
  funPonerComponente(botonvibracion)
  funPonerComponente(botonsonido)
  funPonerComponente(iconocierre2)

  funQuitarComponente(iconotuerca)
  funQuitarComponente(botontiempo)
  funQuitarComponente(tapaR)

  booleanOnTime = booleanFalse
  funDejarMensaje('Configuración')
}

function funCloseSetup () {
  funQuitarComponente(tapaParaConfig)
  funQuitarComponente(botoncambiotemas)
  funQuitarComponente(botonvibracion)
  funQuitarComponente(botonsonido)
  funQuitarComponente(iconocierre2)

  funPonerComponente(iconotuerca)
  funPonerComponente(botontiempo)
  funPonerComponente(tapaR)

  if (intTemas === 2) botontiempo.style.zIndex = 1

  booleanOnTime = booleanTrue
  // console.log('estado: ' + intEstado)
  if (intEstado === 2) { // pausa
    funDejarMensaje('PAUSA')
  } else if (intEstado === 6) { // terminado
    funDejarMensaje('Toca play para reiniciar')
  } else if (intEstado === 1) {
    booleanLock = booleanTrue
    funDisplayIcons()
    funQuitarComponente(textoMensaje2)
    // funPonerComponente(textoMensaje)
  } else if (intEstado === 0) {
    // funQuitarComponente(textoMensaje)
    funQuitarComponente(textoMensaje2)
  } else {
    funQuitarComponente(textoMensaje2)
    // funPonerComponente(textoMensaje)
  }
}

funCloseSetup() // esta cerrado por defecto
funDetenMensajeVolatil(intIndexMensajeVolatil) // mensaje por defecto

function funSetupOnClick () {
  if (intEstado !== 0) playBeVi()
  if (booleanSetup) {
    funCloseSetup()
    booleanSetup = booleanFalse
  } else {
    funOpenSetup()
    booleanSetup = booleanTrue
  }
}
botonderecho.onclick = funSetupOnClick

/*****************************************************************************/
/** *************************BOTONES DEL SETUP***************************** **/
/*****************************************************************************/

function setSoundIcon () {
  if (booleanSonido) {
    funPonerComponente(iconoconsonido)
    funQuitarComponente(iconosinsonido)
  } else {
    funPonerComponente(iconosinsonido)
    funQuitarComponente(iconoconsonido)
  }
}

function setVibrateIcon () {
  if (booleanVibracion) {
    funPonerComponente(convibracion)
    funQuitarComponente(sinvibracion)
  } else {
    funPonerComponente(sinvibracion)
    funQuitarComponente(convibracion)
  }
}

function clickSound () {
  if (booleanVibracion) playVibra()
  if (booleanSonido) booleanSonido = booleanFalse
  else {
    booleanSonido = booleanTrue
    funPlayBeep()
  }
  setSoundIcon()
}

function clickVibrate () {
  if (booleanSonido) funPlayBeep()
  if (booleanVibracion) booleanVibracion = booleanFalse
  else {
    booleanVibracion = booleanTrue
    playVibra()
  }
  setVibrateIcon()
}

function clickSun () {
  playBeVi()
}

function setSetupIcons () {
  setSoundIcon()
  setVibrateIcon()
  botonsonido.onclick = clickSound
  botonvibracion.onclick = clickVibrate
  botoncambiotemas.onclick = clickSun
}

setSetupIcons()

funDisplayIcons()

/*****************************************************************************/
/** *****************************TIEMPO click****************************** **/
/*****************************************************************************/

const botonReinicio = funIdDelElemento('botonReinicio')
const botonMen5min = funIdDelElemento('botonMen5min')
const botonMas5min = funIdDelElemento('botonMas5min')
const botonMen1min = funIdDelElemento('botonMen1min')
const botonMas1min = funIdDelElemento('botonMas1min')
const botonMen5sec = funIdDelElemento('botonMen5sec')
const botonMas5sec = funIdDelElemento('botonMas5sec')
const botonMen1sec = funIdDelElemento('botonMen1sec')
const botonMas1sec = funIdDelElemento('botonMas1sec')

function ponerBotonesTiempo () {
  funPonerComponente(botonMen5min)
  funPonerComponente(botonMas5min)
  funPonerComponente(botonMen1min)
  funPonerComponente(botonMas1min)
  funPonerComponente(botonMen5sec)
  funPonerComponente(botonMas5sec)
  funPonerComponente(botonMen1sec)
  funPonerComponente(botonMas1sec)

  botontiempo.style.zIndex = 1

  funPonerComponente(botonReinicio)

  funQuitarComponente(tapaR)
}

function quitarBotonesTiempo () {
  funQuitarComponente(botonMen5min)
  funQuitarComponente(botonMas5min)
  funQuitarComponente(botonMen1min)
  funQuitarComponente(botonMas1min)
  funQuitarComponente(botonMen5sec)
  funQuitarComponente(botonMas5sec)
  funQuitarComponente(botonMen1sec)
  funQuitarComponente(botonMas1sec)

  if (intTemas !== 2) botontiempo.style.zIndex = 0

  funQuitarComponente(botonReinicio)

  funPonerComponente(tapaR)
}

let menuDelTiempo = booleanFalse

function openTiempo () {
  funPonerComponente(tapaParaConfig)
  funPonerComponente(tapaParaTiempo)

  ponerBotonesTiempo()

  funQuitarBotonesLateralesLock()

  funQuitarComponente(textoMensaje)
  funQuitarComponente(textoMensaje2)
}

function closeTiempo () {
  funQuitarComponente(tapaParaConfig)
  funQuitarComponente(tapaParaTiempo)

  quitarBotonesTiempo()

  if (tiempolimite === 1800000) reinicioDesdeTeimpo()

  if (!booleanLock) funDisplayIcons()

  funPonerComponente(textoMensaje)
  if ((intEstado === 6) || (intEstado === 2)) funPonerComponente(textoMensaje2)
  if (intEstado === 0) funDisplayIcons()
}

function funClickTiempo () {
  // console.log('funClickTiempo-- booleanLock es: ' + booleanLock + ', estado es: ' + intEstado)
  if ((!booleanLock) || (intEstado === 2)) {
    if ((intEstado === 2) || (intEstado === 0) || (intEstado === 6)) {
      playBeVi()
      if (intEstado === 2) booleanLock = booleanFalse
      if (menuDelTiempo) {
        closeTiempo()
        menuDelTiempo = booleanFalse
      } else {
        openTiempo()
        menuDelTiempo = booleanTrue
      }
    }
  }
}
botontiempo.onclick = funClickTiempo
quitarBotonesTiempo() // por defecto esta quitado

/*****************************************************************************/
/** *************************Botones del tiempo**************************** **/
/*****************************************************************************/

function revivirTeimpo () {
  const gettingMinutos = funGetMin(tiempolimite)
  const gettingSegundos = funGetSec(tiempolimite, gettingMinutos)

  // // console.log('revivirTeimpo-- min: '+gettingMinutos+' sec: '+gettingSegundos+' ----tiempolimite: '+tiempolimite)
  tiempolimite = (gettingMinutos * 60000) + (gettingSegundos * 1000)
  // console.log('revivirTeimpo-- tiempolimite: ' + tiempolimite)
  funTerminadoMensajeVolatil()
  if (intEstado === 6) {
    tiempolimite = 0
    intEstado = 2
    funDejarMensaje('PAUSA')
    funQuitarComponente(textoMensaje2)
  }
  if (intEstado === 0) intEstado = 2
}

function sumo1min () {
  revivirTeimpo()
  tiempolimite += 60000
  if (tiempolimite > 1800000) tiempolimite -= 60000
  funPutIniTime(tiempolimite)
}
botonMas1min.onclick = sumo1min

function sumo5min () {
  revivirTeimpo()
  tiempolimite += 300000
  if (tiempolimite > 1800000) tiempolimite -= 300000
  funPutIniTime(tiempolimite)
}
botonMas5min.onclick = sumo5min

function resto1min () {
  revivirTeimpo()
  tiempolimite -= 60000
  if (tiempolimite <= 0) tiempolimite += 60000
  funPutIniTime(tiempolimite)
}
botonMen1min.onclick = resto1min

function resto5min () {
  revivirTeimpo()
  tiempolimite -= 300000
  if (tiempolimite <= 0) tiempolimite += 300000
  funPutIniTime(tiempolimite)
}
botonMen5min.onclick = resto5min

let captura1erMin
let captura2doMin

function sumo1sec () {
  revivirTeimpo()
  captura1erMin = funGetMin(tiempolimite)
  tiempolimite += 1000
  if (tiempolimite > 1800000) tiempolimite -= 60000
  captura2doMin = funGetMin(tiempolimite)
  if (captura1erMin < captura2doMin) tiempolimite -= 60000
  if (tiempolimite < 1000) tiempolimite = 1000
  funPutIniTime(tiempolimite)
}
botonMas1sec.onclick = sumo1sec

function sumo5sec () {
  revivirTeimpo()
  captura1erMin = funGetMin(tiempolimite)
  tiempolimite += 5000
  if (tiempolimite > 1800000) tiempolimite -= 60000
  captura2doMin = funGetMin(tiempolimite)
  if (captura1erMin < captura2doMin) tiempolimite -= 60000
  if (tiempolimite < 1000) tiempolimite = 1000
  funPutIniTime(tiempolimite)
}
botonMas5sec.onclick = sumo5sec

function resto1sec () {
  revivirTeimpo()
  captura1erMin = funGetMin(tiempolimite)
  tiempolimite -= 1000
  if (tiempolimite < 0) tiempolimite += 60000
  if (tiempolimite === 0) tiempolimite += 59000
  captura2doMin = funGetMin(tiempolimite)
  if (captura1erMin > captura2doMin) tiempolimite += 60000
  if (tiempolimite > 1800000) tiempolimite -= 60000
  funPutIniTime(tiempolimite)
}
botonMen1sec.onclick = resto1sec

function resto5sec () {
  revivirTeimpo()
  captura1erMin = funGetMin(tiempolimite)
  tiempolimite -= 5000
  if (tiempolimite < 0) tiempolimite += 60000
  if (tiempolimite === 0) tiempolimite += 59000
  captura2doMin = funGetMin(tiempolimite)
  if (captura1erMin > captura2doMin) tiempolimite += 60000
  if (tiempolimite > 1800000) tiempolimite -= 60000
  funPutIniTime(tiempolimite)
}
botonMen5sec.onclick = resto5sec

function reinicioDesdeTeimpo () {
  funReset()
  if (intEstado === 2) intEstado = 0
  booleanLock = booleanFalse
  intDuracionDelMensaje = 0
  funTerminadoMensajeVolatil()
  // console.log('reinicioDesdeTeimpo-- booleanLock es: ' + booleanLock + ', estado es: ' + intEstado)
}
botonReinicio.onclick = reinicioDesdeTeimpo

/*****************************************************************************/
/** ****************************Animacion********************************** **/
/*****************************************************************************/

// sk.setAttribute('class', 'reducirDiv') // activa la animation
// sitaxis standar

// textoesquina1.addEventListener('animationend', alAcabarAnimacion, booleanFalse)
// textoesquina2.addEventListener('animationend', alAcabarAnimacion, booleanFalse)
// function alAcabarAnimacion (e) { this.removeAttribute('class') }

/*****************************************************************************/
/** ************************Cambios de estilos***************************** **/
/*****************************************************************************/

function pongoEstilo (temas) {
  const orientationStyle = document.createElement('link')
  const colorStyle = document.createElement('link')

  orientationStyle.setAttribute('rel', 'stylesheet')
  colorStyle.setAttribute('rel', 'stylesheet')

  switch (temas) {
    case 0:
      orientationStyle.setAttribute('href', 'css/port.css')
      colorStyle.setAttribute('href', 'css/origin.css')
      break
    case 1:
      orientationStyle.setAttribute('href', 'css/port.css')
      colorStyle.setAttribute('href', 'css/dark.css')
      break
    case 2:
      orientationStyle.setAttribute('href', 'css/land.css')
      colorStyle.setAttribute('href', 'css/oriland.css')
      break
    case 3:
      orientationStyle.setAttribute('href', 'css/land.css')
      colorStyle.setAttribute('href', 'css/darkland.css')
      break
  }

  document.getElementsByTagName('head')[0].appendChild(orientationStyle)
  document.getElementsByTagName('head')[0].appendChild(colorStyle)
}

pongoEstilo(intTemas) // por defecto esta normal
// capturoColorMensaje() //capturo ese fondo de tema

function cambioTema () {
  switch (intTemas) {
    case 0:
      intTemas = 1
      break
    case 1:
      intTemas = 2
      break
    case 2:
      intTemas = 3
      break
    case 3:
      intTemas = 0
      break
  }

  pongoEstilo(intTemas)
}

botoncambiotemas.onclick = cambioTema

funQuitarComponente(tapaParaTiempo)

// ******************************************* //
// ************PARA PONER OUT TEST************ //
// ******************************************* //

/*
for (i = 0; i < 10; i++) {
  arrayOuts[i] = booleanTrue

  arrayLabelOuts[i] = funIdDelElemento('out' + i)
  funPonerComponente(arrayLabelOuts[i])
}
*/

// ******************************************* //
// ******************************************* //
// ******************************************* //
