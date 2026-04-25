import Phaser from 'phaser';
import assetsList from './assetsList.json';

const hexImages = [
  'grass1', 'grass2', 'grass3',
  'grass4', 'grass5', 'grass6', 'grass7', 'grass8', 'grass9'
];

const objectImages = assetsList
  .filter(filePath => filePath.includes('assets/hex-pack/PNG/Objects/'))
  .map(filePath => filePath.split('/').pop().replace(/\.(png|jpe?g|svg)$/, ''));

function getBoardSettings(scene) {
  const width = scene.scale.width || scene.sys.game.config.width;
  const height = scene.scale.height || scene.sys.game.config.height;
  const isMobile = width <= 768;

  const hexWidth = 120;
  const hexHeight = 140;
  const uiPaddingX = isMobile ? 20 : 36;
  const uiPaddingTop = isMobile ? 90 : 80;
  const uiPaddingBottom = isMobile ? 120 : 80;

  const availableWidth = Math.max(260, width - uiPaddingX * 2);
  const availableHeight = Math.max(260, height - uiPaddingTop - uiPaddingBottom);

  const cols = isMobile ? 5 : 10;
  const rows = isMobile ? 7 : 10;

  const scaleX = availableWidth / (cols * hexWidth);
  const scaleY = availableHeight / (rows * hexHeight * 0.75 + hexHeight * 0.25);
  const hexScale = Phaser.Math.Clamp(Math.min(scaleX, scaleY), isMobile ? 0.42 : 0.48, isMobile ? 0.72 : 0.62);

  return {
    width,
    height,
    cols,
    rows,
    hexScale,
    hexWidth,
    hexHeight,
    uiPaddingTop,
    uiPaddingBottom,
  };
}

export function createHexagonBackground(scene) {
  const { width, height, cols, rows, hexScale, hexWidth, hexHeight, uiPaddingTop, uiPaddingBottom } = getBoardSettings(scene);
  const scaledHexWidth = hexWidth * hexScale;
  const scaledHexHeight = hexHeight * hexScale;
  const totalBoardWidth = cols * scaledHexWidth + scaledHexWidth / 2;
  const totalBoardHeight = rows * (scaledHexHeight * 0.75) + scaledHexHeight * 0.25;
  const offsetX = (width - totalBoardWidth) / 2 + scaledHexWidth / 2;
  const verticalSpace = height - uiPaddingTop - uiPaddingBottom;
  const offsetY = uiPaddingTop + Math.max(0, (verticalSpace - totalBoardHeight) / 2) + scaledHexHeight / 2;
  const hexPositions = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * scaledHexWidth + (row % 2) * (scaledHexWidth / 2) + offsetX;
      const y = row * (scaledHexHeight * 0.75) + offsetY;
      const key = hexImages[Math.floor(Math.random() * hexImages.length)];
      hexPositions.push({ x, y, key });
      addHexagon(scene, x, y, key, hexScale);
    }
  }

  return { hexPositions, hexScale };
}

function addHexagon(scene, x, y, key, scale) {
  scene.add.image(x, y, key).setScale(scale);
}

export function placeObjects(scene, hexPositions, numObjects, objectScale = 0.5) {
  const selectedPositions = Phaser.Utils.Array.Shuffle([...hexPositions]).slice(0, numObjects);

  selectedPositions.forEach(pos => {
    const key = objectImages[Math.floor(Math.random() * objectImages.length)];
    scene.add.image(pos.x, pos.y, key).setScale(objectScale);
  });

  return selectedPositions;
}
