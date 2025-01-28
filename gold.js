let goldCounter = 0;
let goldText;

export function initializeGold(scene) {
  // Agregar el contador de monedas de oro
  goldText = scene.add.text(scene.sys.game.config.width - 20, 20, `Gold: ${goldCounter}`, { font: '20px Arial', fill: '#fff' });
  goldText.setOrigin(1, 0); // Alinear el texto a la derecha

  // Incrementar el contador de monedas de oro cada segundo
  scene.time.addEvent({
    delay: 1000,
    callback: () => {
      goldCounter += 1;
      goldText.setText(`Gold: ${goldCounter}`);
    },
    loop: true
  });
}

export function updateGoldTextPosition(scene) {
  // Actualizar la posición del contador de monedas de oro para que siempre esté en la esquina superior derecha
  goldText.setPosition(scene.sys.game.config.width - 20, 20);
}

export function decreaseGold(scene, pos) {
  // Mostrar -1 en rojo y restar 1 al contador de oro
  const minusOneText = scene.add.text(pos.x, pos.y, '-1', { font: '20px Arial', fill: '#ff0000' });
  scene.tweens.add({
    targets: minusOneText,
    y: pos.y - 50,
    alpha: 0,
    duration: 3000,
    ease: 'Power1',
    onComplete: () => {
      minusOneText.destroy();
    }
  });
  goldCounter -= 1;
  goldText.setText(`Gold: ${goldCounter}`);
}
