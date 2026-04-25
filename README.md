# FactoryWorldWeb

Mini-juego web inspirado en la idea de construir y hacer crecer una pequeña fábrica sobre un mapa hexagonal.

## URL pública

Puedes jugarlo aquí:

**https://game.quitiweb.com**

## Qué es

FactoryWorldWeb es un prototipo jugable hecho con **Phaser** en el que el jugador gestiona casillas hexagonales, gasta oro para desbloquear posiciones y coloca objetos productivos que van generando más recursos con el tiempo.

## Cómo funciona

- empiezas con una cantidad inicial de oro,
- cada casilla tiene un coste de activación,
- algunas casillas permiten colocar objetos productivos,
- los objetos aumentan la generación de oro de forma periódica,
- el objetivo es ir expandiendo y optimizando la producción.

## Stack

- **Phaser 3** para el juego
- **Webpack** para el bundling
- assets 2D basados en un tileset hexagonal

## Scripts útiles

```bash
npm install
npm run build:dev
npm run build:prod
npm run serve
```

## Estado del proyecto

Ahora mismo es una base jugable y experimental. La idea es seguir iterando sobre economía, interacción y experiencia de usuario, especialmente en escritorio y móvil.
