import Phaser from 'phaser';
import { createHexagonBackground, placeObjects } from './hex-background';
import { initializeGold, updateGoldTextPosition, decreaseGold, showRedX, increaseGold, goldCounter } from './gold';
import setup from './setup.json';
import assetsList from './assetsList.json';

function getViewportSize() {
  const width = window.innerWidth || 1200;
  const height = window.innerHeight || 900;

  return {
    width: Phaser.Math.Clamp(width, 360, 1440),
    height: Phaser.Math.Clamp(height, 640, 1024),
  };
}

const initialViewport = getViewportSize();

const config = {
  type: Phaser.AUTO,
  width: initialViewport.width,
  height: initialViewport.height,
  backgroundColor: '#87CEEB',
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: initialViewport.width,
    height: initialViewport.height,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    resize: resize
  },
};

const game = new Phaser.Game(config);

function preload() {
  console.log('Preloading assets...');
  
  // Cargar imágenes de hexágonos
  this.load.image('grass1', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_01.png');
  this.load.image('grass2', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_02.png');
  this.load.image('grass3', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_03.png');
  this.load.image('grass4', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_04.png');
  this.load.image('grass5', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_05.png');
  this.load.image('grass6', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_06.png');
  this.load.image('grass7', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_07.png');
  this.load.image('grass8', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_08.png');
  this.load.image('grass9', './assets/hex-pack/PNG/Tiles/Terrain/Grass/grass_09.png');
  
  // Cargar iconos de altavoz y monedas
  this.load.svg('speakerOn', './assets/icons/speaker_on.svg');
  this.load.svg('speakerOff', './assets/icons/speaker_off.svg');
  this.load.svg('coins', './assets/icons/coins.svg');
  
  // Cargar música de fondo
  this.load.audio('backgroundMusic', './assets/music/One-Man-Symphony_A-New-Day-Begins.mp3');
  
  // Cargar todos los objetos desde la lista generada
  assetsList.forEach((filePath) => {
    const assetName = filePath.split('/').pop().replace(/\.(png|jpe?g|svg)$/, '');
    this.load.image(assetName, filePath);
  });
}

function create() {
  console.log('Creating scene...');
  const isMobile = this.scale.width <= 768;
  const title = this.add.text(16, 16, '¡Bienvenido a Factory World!', {
    font: `${isMobile ? 18 : 22}px Arial`,
    fill: '#fff',
    stroke: '#000000',
    strokeThickness: 4,
  });
  title.setDepth(50);

  const { hexPositions, hexScale } = createHexagonBackground(this);
  const objectScale = Math.max(0.42, hexScale);
  const initialObjects = Math.max(6, Math.round(hexPositions.length * 0.15));
  const objectPositions = placeObjects(this, hexPositions, initialObjects, objectScale);

  const existingMusic = this.sound.get('backgroundMusic');
  const music = existingMusic || this.sound.add('backgroundMusic');
  if (!music.isPlaying) {
    music.play({ loop: true, volume: 0.45 });
  }

  let isMusicOn = !music.mute;
  const speakerIcon = this.add.image(50, this.scale.height - 60, isMusicOn ? 'speakerOff' : 'speakerOn');
  speakerIcon.setScale(isMobile ? 0.34 : 0.28);
  speakerIcon.setDepth(50);
  speakerIcon.setInteractive(new Phaser.Geom.Circle(0, 0, 80), Phaser.Geom.Circle.Contains);

  speakerIcon.on('pointerdown', () => {
    isMusicOn = !isMusicOn;
    music.setMute(!isMusicOn);
    speakerIcon.setTexture(isMusicOn ? 'speakerOff' : 'speakerOn');
  });

  this.scale.on('resize', (gameSize) => {
    const width = gameSize.width || this.scale.width;
    const height = gameSize.height || this.scale.height;
    title.setStyle({ font: `${width <= 768 ? 18 : 22}px Arial` });
    speakerIcon.setScale(width <= 768 ? 0.34 : 0.28);
    speakerIcon.setPosition(50, height - 60);
  });

  const coinScale = Math.max(isMobile ? 0.28 : 0.24, hexScale * 0.55);

  hexPositions.forEach(pos => {
    const coinIcon = this.add.image(pos.x, pos.y, 'coins');
    coinIcon.setScale(coinScale);
    coinIcon.setDepth(20);
    coinIcon.setInteractive(new Phaser.Geom.Circle(0, 0, 44), Phaser.Geom.Circle.Contains);

    coinIcon.on('pointerdown', () => {
      if (objectPositions.some(objectPos => objectPos.x === pos.x && objectPos.y === pos.y)) {
        if (goldCounter >= setup.objectCellCost) {
          coinIcon.destroy();
          const objectKey = assetsList[Math.floor(Math.random() * assetsList.length)].split('/').pop().replace(/\.(png|jpe?g|svg)$/, '');
          this.add.image(pos.x, pos.y, objectKey).setScale(objectScale);
          decreaseGold(this, pos, setup.objectCellCost);
          increaseGold(this, pos, setup.objectCellGain);
        } else {
          showRedX(this, pos);
        }
      } else if (goldCounter >= setup.emptyCellCost) {
        coinIcon.destroy();
        decreaseGold(this, pos, setup.emptyCellCost);
      } else {
        showRedX(this, pos);
      }
    });
  });

  initializeGold(this);
}

function update() {
  // Actualizar la posición del contador de monedas de oro para que siempre esté en la esquina superior derecha
  updateGoldTextPosition(this);
}

function resize(gameSize) {
  const width = gameSize?.width || this.scale.width || this.sys.game.config.width;
  const height = gameSize?.height || this.scale.height || this.sys.game.config.height;
  this.cameras.resize(width, height);
}
