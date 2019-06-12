export class Player extends Phaser.GameObjects.Sprite {
  private health: number
  private speed: number

  private cursors: Phaser.Input.Keyboard.CursorKeys

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)

    this.initSprite()
    this.scene.add.existing(this)
  }

  private initSprite() {
    this.active = true
    this.health = 1
    this.speed = 200

    this.setDisplayOrigin(32, 32)
      .setFlipX(false)
      .setDepth(0)

    this.cursors = this.scene.input.keyboard.createCursorKeys()

    this.scene.physics.world.enable(this)
    this.body.setSize(32, 44)
      .setOffset(16, 20)
  }

  update(): void {
    if (this.active) {
      this.handleInput()
    } else {
      if (this.body) {
        this.body.setVelocity(0)
      }
    }
  }

  private handleInput(): void {
    if (this.cursors.up.isDown) {
      this.body.setVelocity(0, -this.speed)
      this.anims.play('movingUp', true)
    } else if (this.cursors.right.isDown) {
      this.body.setVelocity(this.speed, 0)
      this.anims.play('movingHorizontal', true)
      this.setFlipX(true)
    } else if (this.cursors.down.isDown) {
      this.body.setVelocity(0, this.speed)
      this.anims.play('movingDown', true)
    } else if (this.cursors.left.isDown) {
      this.body.setVelocity(-this.speed, 0)
      this.anims.play('movingHorizontal', true)
      this.setFlipX(false)
    } else {
      this.body.setVelocity(0, 0)
      this.anims.stop()
    }
  }
}
