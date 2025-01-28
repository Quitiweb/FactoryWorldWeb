let goldCounter = 60; // Inicializar con 60 monedas
let goldText;
let goldIncrement = 1;

export function initializeGold(scene) {
  // Agregar el contador de monedas de oro
  goldText = scene.add.text(scene.sys.game.config.width - 20, 20, `Gold: ${goldCounter}`, { font: '20px Arial', fill: '#fff' });
  goldText.setOrigin(1, 0); // Alinear el texto a la derecha

  // Incrementar el contador de monedas de oro cada dos segundos
  scene.time.addEvent({
    delay: 2000, // Cambiar a 2000 ms (2 segundos)
    callback: () => {
      goldCounter += goldIncrement;
      goldText.setText(`Gold: ${goldCounter}`);
    },
    loop: true
  });
}

export function updateGoldTextPosition(scene) {
  // Actualizar la posición del contador de monedas de oro para que siempre esté en la esquina superior derecha
  goldText.setPosition(scene.sys.game.config.width - 20, 20);
}

export function decreaseGold(scene, pos, amount) {
  // Mostrar -20 en rojo y restar 20 al contador de oro
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
  goldCounter -= amount;
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
  // Mostrar +5 en verde y aumentar el incremento de oro
  const plusText = scene.add.text(pos.x, pos.y, `+${amount}`, { font: '20px Arial', fill: '#00ff00' });
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
  goldIncrement += amount;
}
