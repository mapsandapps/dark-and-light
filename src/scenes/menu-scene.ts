export class MenuScene extends Phaser.Scene {
  private creditsKey: Phaser.Input.Keyboard.Key
  private startKey: Phaser.Input.Keyboard.Key
  private texts: Phaser.GameObjects.Text[] = []

  constructor() {
    super({
      key: 'MenuScene'
    })
  }

  init(): void {
    this.creditsKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.C
    )
    this.creditsKey.isDown = false
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    )
    this.startKey.isDown = false
  }

  create(): void {
    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 - 80,
        'DARK & LIGHT'
      ).setOrigin(0.5, 0.5)
    )

    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        'PRESS X TO PLAY\nPRESS C FOR CREDITS', {
          align: 'center'
        }
      ).setOrigin(0.5, 0.5)
    )

    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2 + 80,
        'ARROW KEYS FOR CONTROLS'
      ).setOrigin(0.5, 0.5)
    )
  }

  update(): void {
    if (this.creditsKey.isDown) {
      this.scene.start('CreditsScene')
    }
    if (this.startKey.isDown) {
      this.scene.start('GameScene')
    }
  }
}
