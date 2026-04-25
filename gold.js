import setup from './setup.json';

export let goldCounter = setup.initialGold;
let goldText;
let goldIncrement = 1;
const objectPositions = [];

function getResponsiveFontSize(scene, desktop = 20, mobile = 18) {
  return `${scene.scale.width <= 768 ? mobile : desktop}px Arial`;
}

function updateGoldText(scene) {
  if (!goldText) {
    return;
  }

  goldText.setText(`Gold: ${goldCounter}`);
  goldText.setStyle({ font: getResponsiveFontSize(scene, 20, 18) });
}

export function initializeGold(scene) {
  goldText = scene.add.text(scene.scale.width - 20, 16, `Gold: ${goldCounter}`, {
    font: getResponsiveFontSize(scene, 20, 18),
    fill: '#fff',
    stroke: '#000000',
    strokeThickness: 4,
  });
  goldText.setOrigin(1, 0);
  goldText.setDepth(50);

  scene.time.addEvent({
    delay: setup.goldIncrementInterval,
    callback: () => {
      goldCounter += goldIncrement;
      updateGoldText(scene);
      objectPositions.forEach(pos => showIncrement(scene, pos));
    },
    loop: true
  });
}

export function updateGoldTextPosition(scene) {
  if (!goldText) {
    return;
  }

  goldText.setPosition(scene.scale.width - 20, 16);
  updateGoldText(scene);
}

export function decreaseGold(scene, pos, amount) {
  const minusText = scene.add.text(pos.x, pos.y, `-${amount}`, {
    font: getResponsiveFontSize(scene, 20, 18),
    fill: '#ff0000'
  });
  scene.tweens.add({
    targets: minusText,
    y: pos.y - 50,
    alpha: 0,
    duration: 2000,
    ease: 'Power1',
    onComplete: () => {
      minusText.destroy();
    }
  });
  goldCounter = Math.max(0, goldCounter - amount);
  updateGoldText(scene);
}

export function showRedX(scene, pos) {
  const redXText = scene.add.text(pos.x, pos.y, 'X', {
    font: getResponsiveFontSize(scene, 20, 18),
    fill: '#ff0000'
  });
  scene.tweens.add({
    targets: redXText,
    y: pos.y - 50,
    alpha: 0,
    duration: 1500,
    ease: 'Power1',
    onComplete: () => {
      redXText.destroy();
    }
  });
}

export function increaseGold(scene, pos, amount) {
  goldIncrement += amount;
  objectPositions.push(pos);
}

function showIncrement(scene, pos) {
  const plusText = scene.add.text(pos.x, pos.y, `+${setup.objectCellGain}`, {
    font: getResponsiveFontSize(scene, 20, 18),
    fill: '#00ff00'
  });
  scene.tweens.add({
    targets: plusText,
    y: pos.y - 50,
    alpha: 0,
    duration: 2000,
    ease: 'Power1',
    onComplete: () => {
      plusText.destroy();
    }
  });
}
