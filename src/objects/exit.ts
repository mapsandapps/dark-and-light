export class Exit extends Phaser.GameObjects.Rectangle {
  private debug: boolean

  constructor(params) {
    super(params.scene, params.x, params.y, params.width, params.height)

    this.debug = params.debug

    this.initImage()
    this.scene.add.existing(this)
  }

  private initImage(): void {
    this.setOrigin(0, 0)

    if (this.debug) {
      this.setFillStyle(0x00f000)
    }

    this.scene.physics.world.enable(this)
    this.body.setImmovable(true)
  }
}
