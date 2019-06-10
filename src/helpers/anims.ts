function createAnims(ctx, spriteKey) {
  ctx.anims.create({
    key: 'movingHorizontal',
    frames: ctx.anims.generateFrameNumbers(spriteKey, {
      start: 9,
      end: 17
    }),
    frameRate: 10,
    repeat: -1
  })

  ctx.anims.create({
    key: 'movingDown',
    frames: ctx.anims.generateFrameNumbers(spriteKey, {
      start: 18,
      end: 26
    }),
    frameRate: 10,
    repeat: -1
  })

  ctx.anims.create({
    key: 'movingUp',
    frames: ctx.anims.generateFrameNumbers(spriteKey, {
      start: 0,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  })
}

export { createAnims }
