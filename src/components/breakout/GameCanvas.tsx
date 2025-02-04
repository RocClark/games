import React, { useRef, useEffect, useState } from "react";
import { drawBall } from "./Ball";
import { drawPaddle } from "./Paddle";
import { drawBricks } from "./Bricks";
import Score from "./score";
import Rules from "./Rules";

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [ball, setBall] = useState({
    x: 400,
    y: 300,
    size: 10,
    dx: 2, // Reduced speed
    dy: -2, // Reduced speed
    speed: 2, // Global speed control
    color: "#0095dd",
  });

  const [paddle, setPaddle] = useState({
    x: 360,
    y: 580,
    width: 80,
    height: 10,
    speed: 8,
    dx: 0,
    color: "#f8512d",
  });

  const [bricks, setBricks] = useState(() =>
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
  const bricksRef = useRef(bricks); // Ref to hold the latest brick state

  useEffect(() => {
    bricksRef.current = bricks; // Keep the ref updated with the latest state
  }, [bricks]);

  const [score, setScore] = useState(0);

  const movePaddle = () => {
    setPaddle((prev) => {
      let newX = prev.x + prev.dx;
      if (newX < 0) newX = 0;
      if (newX + prev.width > 800) newX = 800 - prev.width;
      return { ...prev, x: newX };
    });
  };

  const moveBall = () => {
    setBall((prev) => {
      let { x, y, dx, dy } = prev;

      // Wall collisions
      if (x + prev.size > 800 || x - prev.size < 0) dx *= -1;
      if (y - prev.size < 0) dy *= -1;

      // Paddle collisions
      if (
        x > paddle.x &&
        x < paddle.x + paddle.width &&
        y + prev.size > paddle.y
      ) {
        dy = -prev.speed;
      }

      // Bottom collision (reset)
      if (y + prev.size > 600) {
        resetGame();
      }

      return { ...prev, x: x + dx, y: y + dy, dx, dy };
    });
  };

  const resetGame = () => {
    setScore(0);
    setBricks((prev) =>
      prev.map((column) =>
        column.map((brick) => ({
          ...brick,
          visible: true,
        }))
      )
    );
    setBall((prev) => ({ ...prev, x: 400, y: 300, dx: 4, dy: -4 }));
  };

  const increaseScore = () => {
    setScore((prev) => prev + 1);
  };

  const checkBrickCollisions = () => {
    let hitBrick = false;
    let newDx = ballRef.current.dx;
    let newDy = ballRef.current.dy;

    bricksRef.current = bricksRef.current.map((column) =>
      column.map((brick) => {
        if (
          brick.visible &&
          ballRef.current.x + ballRef.current.size > brick.x &&
          ballRef.current.x - ballRef.current.size < brick.x + brick.width &&
          ballRef.current.y + ballRef.current.size > brick.y &&
          ballRef.current.y - ballRef.current.size < brick.y + brick.height
        ) {
          console.log("Brick hit at:", brick.x, brick.y); // Debugging log
          hitBrick = true;

          // Determine bounce direction
          const ballTop = ballRef.current.y - ballRef.current.size;
          const ballBottom = ballRef.current.y + ballRef.current.size;
          const ballLeft = ballRef.current.x - ballRef.current.size;
          const ballRight = ballRef.current.x + ballRef.current.size;

          const brickTop = brick.y;
          const brickBottom = brick.y + brick.height;
          const brickLeft = brick.x;
          const brickRight = brick.x + brick.width;

          // Check if the ball is hitting the brick from the top or bottom
          if (ballBottom > brickTop && ballTop < brickBottom) {
            newDy *= -1; // Reverse vertical direction
          }

          // Check if the ball is hitting the brick from the sides
          if (ballRight > brickLeft && ballLeft < brickRight) {
            newDx *= -1; // Reverse horizontal direction
          }

          return { ...brick, visible: false };
        }
        return brick;
      })
    );

    if (hitBrick) {
      ballRef.current.dx = newDx;
      ballRef.current.dy = newDy;
      setScore((prevScore) => prevScore + 1);
      setBricks([...bricksRef.current]); // Update state to trigger re-render
    }
  };

  const paddleRef = useRef(paddle);
  const ballRef = useRef(ball);

  useEffect(() => {
    paddleRef.current = paddle;
  }, [paddle]);

  useEffect(() => {
    ballRef.current = ball;
  }, [ball]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      movePaddle();

      ballRef.current.x += ballRef.current.dx;
      ballRef.current.y += ballRef.current.dy;

      checkBrickCollisions(); // Check brick collisions every frame

      // Ball-wall collision
      if (
        ballRef.current.x + ballRef.current.size > 800 ||
        ballRef.current.x - ballRef.current.size < 0
      ) {
        ballRef.current.dx *= -1;
      }
      if (ballRef.current.y - ballRef.current.size < 0) {
        ballRef.current.dy *= -1;
      }

      // Ball collision with paddle
      if (
        ballRef.current.x > paddleRef.current.x &&
        ballRef.current.x < paddleRef.current.x + paddleRef.current.width &&
        ballRef.current.y + ballRef.current.size > paddleRef.current.y
      ) {
        const paddleCenter = paddleRef.current.x + paddleRef.current.width / 2;
        const hitPosition =
          (ballRef.current.x - paddleCenter) / (paddleRef.current.width / 2);

        // Scale the angle (30° max in either direction)
        const maxBounceAngle = (60 * Math.PI) / 180; // Convert 30 degrees to radians
        const bounceAngle = hitPosition * maxBounceAngle;

        // Calculate new direction using sine and cosine
        const speed = Math.sqrt(
          ballRef.current.dx ** 2 + ballRef.current.dy ** 2
        );
        ballRef.current.dx = speed * Math.sin(bounceAngle);
        ballRef.current.dy = -speed * Math.cos(bounceAngle);
      }

      // Ball falls below canvas (reset game)
      if (ballRef.current.y + ballRef.current.size > 600) {
        resetGame();
      }

      // Draw everything
      drawBricks(ctx, bricksRef.current);
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

      requestAnimationFrame(gameLoop);
    };

    const gameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameId);
  }, []); // Runs once

  // Handle paddle movement with event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paddleRef.current.dx = paddleRef.current.speed;
      }
      if (e.key === "ArrowLeft") {
        paddleRef.current.dx = -paddleRef.current.speed;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        paddleRef.current.dx = 0; // Stop movement when key is released
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
    </div>
  );
};

export default GameCanvas;
