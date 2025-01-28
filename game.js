import Phaser from 'phaser';
import { createHexagonBackground, placeObjects } from './hex-background';
import assetsList from './assetsList.json';

const config = {
  type: Phaser.AUTO,
  width: 1200, // Aumentar el ancho del lienzo
  height: 900, // Aumentar la altura del lienzo
  backgroundColor: '#87CEEB', // Color azul del océano
  scene: {
    preload: preload,
    create: create,
    update: update,
    resize: resize
  },
};

const game = new Phaser.Game(config);

let goldCounter = 0;
let goldText;

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
  this.add.text(10, 10, '¡Bienvenido a Factory World!', { font: '20px Arial', fill: '#fff' });

  const hexPositions = createHexagonBackground(this, 10, 10);
  const objectPositions = placeObjects(this, hexPositions, 15); // Colocar objetos solo en 15 hexágonos aleatorios

  // Reproducir la música de fondo
  const music = this.sound.add('backgroundMusic');
  music.play({ loop: true });

  // Agregar el icono del altavoz
  let isMusicOn = true;
  const speakerIcon = this.add.image(50, this.sys.game.config.height - 100, 'speakerOff').setInteractive();
  speakerIcon.setScale(0.25); // Reducir el tamaño del icono a la mitad

  speakerIcon.on('pointerdown', () => {
    isMusicOn = !isMusicOn;
    music.setMute(!isMusicOn);
    speakerIcon.setTexture(isMusicOn ? 'speakerOff' : 'speakerOn');
  });

  // Hacer que el icono flote siempre en la esquina inferior izquierda
  this.scale.on('resize', (gameSize) => {
    const { width, height } = gameSize;
    speakerIcon.setPosition(50, height - 100);
  });

  // Mostrar iconos de monedas sobre todos los hexágonos
  hexPositions.forEach(pos => {
    const coinIcon = this.add.image(pos.x, pos.y, 'coins').setInteractive();
    coinIcon.setScale(0.25); // Ajustar el tamaño del icono de monedas

    coinIcon.on('pointerdown', () => {
      coinIcon.destroy(); // Eliminar el icono de monedas
      if (objectPositions.some(objectPos => objectPos.x === pos.x && objectPos.y === pos.y)) {
        const objectKey = assetsList[Math.floor(Math.random() * assetsList.length)].split('/').pop().replace(/\.(png|jpe?g|svg)$/, '');
        const object = this.add.image(pos.x, pos.y, objectKey);
        object.setScale(0.5); // Ajustar el tamaño del objeto
      }
    });
  });

  // Agregar el contador de monedas de oro
  goldText = this.add.text(this.sys.game.config.width - 20, 20, `Gold: ${goldCounter}`, { font: '20px Arial', fill: '#fff' });
  goldText.setOrigin(1, 0); // Alinear el texto a la derecha

  // Incrementar el contador de monedas de oro cada segundo
  this.time.addEvent({
    delay: 1000,
    callback: () => {
      goldCounter += 1;
      goldText.setText(`Gold: ${goldCounter}`);
    },
    loop: true
  });
}

function update() {
  // Actualizar la posición del contador de monedas de oro para que siempre esté en la esquina superior derecha
  goldText.setPosition(this.sys.game.config.width - 20, 20);
}

function resize(gameSize) {
  const { width, height } = gameSize;
  if (width === undefined) { width = this.sys.game.config.width; }
  if (height === undefined) { height = this.sys.game.config.height; }
  this.cameras.resize(width, height);
}
