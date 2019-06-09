import { Player } from '../objects/player'

export class GameScene extends Phaser.Scene {
  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer
  private debug: boolean
  private layer: Phaser.Tilemaps.StaticTilemapLayer
  private map: Phaser.Tilemaps.Tilemap
  private tileset: Phaser.Tilemaps.Tileset
  private walls: Phaser.Physics.Arcade.StaticGroup

  private player: Player

  constructor() {
    super({
      key: "GameScene"
    })
  }

  init(): void {}

  private createWall(x, y, width, height): void {
    this.walls.add(new Phaser.GameObjects.Rectangle(this, x, y, width, height, 0xf00000, 1).setOrigin(0, 0), this.debug)
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

  create(): void {
    this.debug = true

    this.map = this.make.tilemap({ key: 'maze' })

    this.tileset = this.map.addTilesetImage('maze', 'tiles', 64, 64, 0, 0)
    // this.backgroundLayer = this.map.createStaticLayer('Background', this.tileset, 0, 0)
    this.layer = this.map.createStaticLayer('Map', this.tileset, 0, 0)

    this.convertObjects()

    this.walls = this.physics.add.staticGroup()
    this.addWalls()

    this.physics.add.collider(this.player, this.walls)

    this.cameras.main.startFollow(this.player)
  }

  update(): void {
    this.player.update()
  }

  private gameLost(): void {
    this.add.text(
      this.player.x,
      this.player.y,
      'Oh no!\nYou lost!', {
        align: 'center'
      }
    ).setOrigin(0.5, 0.5)
  }

  private convertObjects(): void {
    const objects = this.map.getObjectLayer('Objects').objects as any[]

    objects.forEach((object, i) => {
      if (object.name === 'Start') {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          key: 'player'
        })
      }
    })
  }

  private exitToWinScene(): void {
    this.scene.stop()
    this.scene.get('WinScene').scene.start()
  }
}
