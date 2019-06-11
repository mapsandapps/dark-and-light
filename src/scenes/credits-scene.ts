export class CreditsScene extends Phaser.Scene {
  private menuKey: Phaser.Input.Keyboard.Key
  private texts: Phaser.GameObjects.Text[] = []

  constructor() {
    super({
      key: 'CreditsScene'
    })
  }

  init(): void {
    this.menuKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.M
    )
    this.menuKey.isDown = false
  }

  create(): void {
    let text = 'Credits:\n'
    text += '\n'
    text += 'Map tiles by me\n'
    text += 'Character sprites from the Universal LPC Spritesheet Character Generator\n'
    text += 'Music \'City of Rain\' by Scrabbit\n'
    text += 'Code based on phaser-3-typescript by digitsensitive\n'
    text += '\n'
    text += 'Press M to return to menu'

    this.texts.push(
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        text
      ).setOrigin(0.5, 0.5)
    )
  }

  update(): void {
    if (this.menuKey.isDown) {
      this.scene.start('MenuScene')
    }
  }
}
