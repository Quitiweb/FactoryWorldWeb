import assetsList from './assetsList.json';

const hexImages = [
  'grass1', 'grass2', 'grass3',  // Add more hexagon images if available
  'grass4', 'grass5', 'grass6', 'grass7', 'grass8', 'grass9'
];

// Filtrar los objetos de la lista de assets
const objectImages = assetsList
  .filter(filePath => filePath.includes('assets/hex-pack/PNG/Objects/'))
  .map(filePath => filePath.split('/').pop().replace(/\.(png|jpe?g|svg)$/, ''));

export function createHexagonBackground(scene, rows, cols) {
  const hexWidth = 120; // Updated hexagon width
  const hexHeight = 140; // Updated hexagon height
  const hexScale = 0.5;
  const scaledHexWidth = hexWidth * hexScale;
  const scaledHexHeight = hexHeight * hexScale;
  const hexPositions = [];
  const offsetX = (scene.sys.game.config.width - (cols * scaledHexWidth)) / 2;
  const offsetY = (scene.sys.game.config.height - (rows * scaledHexHeight * 0.75)) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * scaledHexWidth + (row % 2) * (scaledHexWidth / 2) + offsetX;
      const y = row * (scaledHexHeight * 0.75) + offsetY;
      const key = hexImages[Math.floor(Math.random() * hexImages.length)];
      hexPositions.push({ x, y, key });
      addHexagon(scene, x, y, key, hexScale);
    }
  }

  return hexPositions;
}

function addHexagon(scene, x, y, key, scale) {
  const hex = scene.add.image(x, y, key);
  hex.setScale(scale);
  console.log(`Hex added at (${x}, ${y}) with key ${key}`);
}

export function placeObjects(scene, hexPositions, numObjects) {
  const hexScale = 0.5;
  const selectedPositions = Phaser.Utils.Array.Shuffle(hexPositions).slice(0, numObjects);

  selectedPositions.forEach(pos => {
    const key = objectImages[Math.floor(Math.random() * objectImages.length)];
    const object = scene.add.image(pos.x, pos.y, key);
    object.setScale(hexScale);
    console.log(`${key} added at (${pos.x}, ${pos.y})`);
  });

  return selectedPositions;
}
