export const drawPaddle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color; // Keep only one color
  ctx.fill();
  ctx.closePath();
};
