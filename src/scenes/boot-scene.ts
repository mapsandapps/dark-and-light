export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics
  private progressBar: Phaser.GameObjects.Graphics

  constructor() {
    super({
      key: 'BootScene'
    })
  }

  private createLoadingGraphics(): void {
    this.loadingBar = this.add.graphics()
      .fillStyle(0xffffff, 1)
      .fillRect(
        this.cameras.main.width / 4 - 2,
        this.cameras.main.height / 2 - 18,
        this.cameras.main.width / 2 + 4,
        20
      )
      this.progressBar = this.add.graphics()
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x000000)
    this.createLoadingGraphics()

    this.load.on(
      'progress',
      value => {
        this.progressBar.clear()
        this.progressBar.fillStyle(0x00f000, 1)
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        )
      },
      this
    )

    this.load.on(
      'complete',
      () => {
        this.progressBar.destroy()
        this.loadingBar.destroy()
      },
      this
    )

    this.load.pack('preload', './src/assets/pack.json', 'preload')
  }

  update(): void {
    this.scene.start('MenuScene')
  }
}
