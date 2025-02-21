import React, { useRef, useEffect, useState } from "react";
import { drawBall } from "./Ball";
import { drawPaddle } from "./Paddle";
import { drawBricks } from "./Bricks";
import Score from "./score";
import Rules from "./Rules";

interface GameCanvasProps {
  difficulty: "easy" | "hard";
}

const GameCanvas: React.FC<GameCanvasProps> = ({ difficulty }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isHard = difficulty === "hard";

  const ballRef = useRef({
    x: 400,
    y: 300,
    size: 10,
    dx: isHard ? 4 : 2,
    dy: isHard ? -4 : -2,
    speed: isHard ? 4 : 2,
    color: "#0095dd",
  });

  const paddleRef = useRef({
    x: 360,
    y: 580,
    width: isHard ? 60 : 80,
    height: 10,
    speed: isHard ? 6 : 8,
    dx: 0,
    color: "#f8512d",
  });

  const bricksRef = useRef(
    Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        x: i * (70 + 10) + 45,
        y: j * (20 + 10) + 60,
        width: 70,
        height: 20,
        visible: true,
      }))
    )
  );

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Reset game
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setGameWon(false);

    ballRef.current = {
      x: 400,
      y: 300,
      size: 10,
      dx: isHard ? 4 : 2,
      dy: isHard ? -4 : -2,
      speed: isHard ? 4 : 2,
      color: "#0095dd",
    };

    paddleRef.current = {
      x: 360,
      y: 580,
      width: isHard ? 60 : 80,
      height: 10,
      speed: isHard ? 6 : 8,
      dx: 0,
      color: "#f8512d",
    };

    bricksRef.current = Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        x: i * (70 + 10) + 45,
        y: j * (20 + 10) + 60,
        width: 70,
        height: 20,
        visible: true,
      }))
    );
  };

  // Handle paddle movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paddleRef.current.dx = paddleRef.current.speed;
      } else if (e.key === "ArrowLeft") {
        paddleRef.current.dx = -paddleRef.current.speed;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        paddleRef.current.dx = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const update = () => {
      if (gameOver || gameWon) return;

      const ball = ballRef.current;
      const paddle = paddleRef.current;
      const bricks = bricksRef.current;

      // Move paddle
      paddle.x = Math.max(
        0,
        Math.min(800 - paddle.width, paddle.x + paddle.dx)
      );

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ball wall collision
      if (ball.x + ball.size > 800 || ball.x - ball.size < 0) {
        ball.dx *= -1;
      }
      if (ball.y - ball.size < 0) {
        ball.dy *= -1;
      }

      // Ball paddle collision
      if (
        ball.y + ball.size >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
      ) {
        ball.dy *= -1;
      }

      // Ball brick collision
      let bricksRemaining = 0;
      bricks.forEach((row) => {
        row.forEach((brick) => {
          if (brick.visible) {
            bricksRemaining++;
            if (
              ball.x >= brick.x &&
              ball.x <= brick.x + brick.width &&
              ball.y >= brick.y &&
              ball.y <= brick.y + brick.height
            ) {
              ball.dy *= -1;
              brick.visible = false;
              setScore((prev) => prev + 10);
            }
          }
        });
      });

      // Check for game win
      if (bricksRemaining === 0) {
        setGameWon(true);
      }

      // Game over if ball falls below paddle
      if (ball.y > 600) {
        setGameOver(true);
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaddle(
        ctx,
        paddleRef.current.x,
        paddleRef.current.y,
        paddleRef.current.width,
        paddleRef.current.height,
        paddleRef.current.color
      );
      drawBall(
        ctx,
        ballRef.current.x,
        ballRef.current.y,
        ballRef.current.size,
        ballRef.current.color
      );
      drawBricks(ctx, bricksRef.current);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameOver, gameWon]);

  return (
    <div className="relative">
      <Rules onClose={() => console.log("Rules closed")} />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="bg-gray-200 rounded"
      ></canvas>
      <Score score={score} />

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">Game Over</h2>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={resetGame}
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">You Win!</h2>
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
