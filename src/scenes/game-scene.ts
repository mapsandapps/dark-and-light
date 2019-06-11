import { Exit } from '../objects/exit'
import { Player } from '../objects/player'

import { createAnims } from '../helpers/anims'

export class GameScene extends Phaser.Scene {
  private debug: boolean = false
  private layer: Phaser.Tilemaps.StaticTilemapLayer
  private map: Phaser.Tilemaps.Tilemap
  private music: Phaser.Sound.BaseSound
  private tileset: Phaser.Tilemaps.Tileset
  private walls: Phaser.Physics.Arcade.StaticGroup

  private exit: Exit
  private player: Player

  constructor() {
    super({
      key: "GameScene"
    })
  }

  init(): void {}

  private createWall(x, y, width, height): void {
    this.walls.add(new Phaser.GameObjects.Rectangle(this, x, y, width, height, 0x00f000, 1).setOrigin(0, 0), this.debug)
  }

  private addWallToTile(tile): void {
    const WALL_WIDTH = 1
    if (tile.properties.preventDown) {
      this.createWall(tile.pixelX, tile.pixelY + tile.height - WALL_WIDTH, tile.width, WALL_WIDTH)
    }
    if (tile.properties.preventLeft) {
      this.createWall(tile.pixelX, tile.pixelY, WALL_WIDTH, tile.height)
    }
    if (tile.properties.preventRight) {
      this.createWall(tile.pixelX + tile.width - WALL_WIDTH, tile.pixelY, WALL_WIDTH, tile.height)
    }
    if (tile.properties.preventUp) {
      this.createWall(tile.pixelX, tile.pixelY, tile.width, WALL_WIDTH)
    }
  }

  private addWalls(): void {
    this.map.layer.data.forEach((row: any) => {
      row.forEach(tile => {
        this.addWallToTile(tile)
      })
    })
  }

  private addFogOfWar(): void {
    interface GameConfig {
      width: number
      height: number
    }

    let gameConfig = this.game.config as GameConfig

    this.make.image({
      x: gameConfig.width / 2,
      y: gameConfig.height / 2,
      key: 'mask',
      add: true
    })
      .setBlendMode('MULTIPLY')
      .setScrollFactor(0)
  }

  create(): void {
    this.sound.pauseOnBlur = false // TODO: change to true
    this.music = this.sound.add('music')
    this.music.play(null, {
      loop: true // FIXME: not working
    })

    this.map = this.make.tilemap({ key: 'maze' })

    this.tileset = this.map.addTilesetImage('maze', 'tiles', 64, 64, 1, 2)
    this.layer = this.map.createStaticLayer('Map', this.tileset, 0, 0)

    createAnims(this, 'character')

    this.convertObjects()

    this.walls = this.physics.add.staticGroup()
    this.addWalls()

    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.player, this.exit, this.exitCallback, null, this)

    this.cameras.main.startFollow(this.player)

    this.addFogOfWar()
  }

  update(): void {
    this.player.update()
  }

  private convertObjects(): void {
    const objects = this.map.getObjectLayer('Objects').objects as any[]

    objects.forEach((object, i) => {
      if (object.name === 'Start') {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          key: 'character'
        })
      } else if (object.name === 'Finish') {
        this.exit = new Exit({
          scene: this,
          x: object.x,
          y: object.y,
          width: object.width,
          height: object.height
        })
      }
    })
  }

  private exitToWinScene(): void {
    this.music.stop()
    this.player.setActive(false)
    this.scene.stop()
    this.scene.get('WinScene').scene.start()
  }

  private exitCallback(): void {
    this.cameras.main.fadeOut(1000)
    this.time.addEvent({
      delay: 1000,
      callback: this.exitToWinScene,
      callbackScope: this
    })
  }
}
