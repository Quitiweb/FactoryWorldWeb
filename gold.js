import setup from './setup.json';

export let goldCounter = setup.initialGold; // Inicializar con el oro inicial del archivo de configuración
let goldText;
let goldIncrement = 1;
const objectPositions = [];

export function initializeGold(scene) {
  // Agregar el contador de monedas de oro
  goldText = scene.add.text(scene.cameras.main.width - 20, 20, `Gold: ${goldCounter}`, { 
    font: '20px Arial', fill: '#fff' 
  });
  goldText.setOrigin(1, 0); // Alinear a la derecha
  goldText.setScrollFactor(0); // Fijar en pantalla

  // Incrementar el contador de monedas de oro cada intervalo configurado
  scene.time.addEvent({
    delay: setup.goldIncrementInterval, // Usar el intervalo del archivo de configuración
    callback: () => {
      goldCounter += goldIncrement;
      goldText.setText(`Gold: ${goldCounter}`);
      objectPositions.forEach(pos => showIncrement(scene, pos));
    },
    loop: true
  });
}

export function updateGoldTextPosition(scene) {
  // Actualizar la posición del contador de monedas de oro para que siempre esté en la esquina superior derecha
  goldText.setPosition(scene.sys.game.config.width - 20, 20);
}

export function decreaseGold(scene, pos, amount) {
  // Mostrar - en rojo y restar al contador de oro
  const minusText = scene.add.text(pos.x, pos.y, `-${amount}`, { font: '20px Arial', fill: '#ff0000' });
  scene.tweens.add({
    targets: minusText,
    y: pos.y - 50,
    alpha: 0,
    duration: 3000,
    ease: 'Power1',
    onComplete: () => {
      minusText.destroy();
    }
  });
  goldCounter = Math.max(0, goldCounter - amount); // Evitar que el oro sea negativo
  goldText.setText(`Gold: ${goldCounter}`);
}

export function showRedX(scene, pos) {
  // Mostrar X en rojo
  const redXText = scene.add.text(pos.x, pos.y, 'X', { font: '20px Arial', fill: '#ff0000' });
  scene.tweens.add({
    targets: redXText,
    y: pos.y - 50,
    alpha: 0,
    duration: 3000,
    ease: 'Power1',
    onComplete: () => {
      redXText.destroy();
    }
  });
}

export function increaseGold(scene, pos, amount) {
  // Aumentar el incremento de oro y agregar la posición del objeto
  goldIncrement += amount;
  objectPositions.push(pos);
}

function showIncrement(scene, pos) {
  // Mostrar + en verde en la casilla del objeto cada intervalo configurado
  const plusText = scene.add.text(pos.x, pos.y, `+${setup.objectCellGain}`, { font: '20px Arial', fill: '#00ff00' });
  scene.tweens.add({
    targets: plusText,
    y: pos.y - 50,
    alpha: 0,
    duration: 3000,
    ease: 'Power1',
    onComplete: () => {
      plusText.destroy();
    }
  });
}
