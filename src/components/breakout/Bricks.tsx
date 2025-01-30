interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

export const drawBricks = (
  ctx: CanvasRenderingContext2D,
  bricks: Brick[][]
) => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        ctx.fillStyle = "#ff5733"; // Brick color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = "#fff"; // Outline
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
  });
};
