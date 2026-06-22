import React, { useRef, useEffect, useState } from 'react';

const BlueprintCanvas = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Set styles for blueprint drawing
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.font = '10px Space Mono';

      // 1. Draw large technical circle measurements in the center
      const baseRadius = Math.min(width, height) * 0.35;
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw dashed inner circle
      ctx.beginPath();
      ctx.setLineDash([5, 10]);
      ctx.arc(centerX, centerY, baseRadius * 0.75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw radial subdivision lines (every 45 degrees)
      for (let angle = 0; angle < 360; angle += 45) {
        const rad = (angle * Math.PI) / 180;
        const startX = centerX + Math.cos(rad) * (baseRadius * 0.2);
        const startY = centerY + Math.sin(rad) * (baseRadius * 0.2);
        const endX = centerX + Math.cos(rad) * (baseRadius * 1.1);
        const endY = centerY + Math.sin(rad) * (baseRadius * 1.1);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw degree text
        if (width > 600) {
          const textX = centerX + Math.cos(rad) * (baseRadius * 1.15) - 10;
          const textY = centerY + Math.sin(rad) * (baseRadius * 1.15) + 3;
          ctx.fillText(`${angle}°`, textX, textY);
        }
      }

      // Draw rotating target crosshair in the center
      const rot = time * 0.0005;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rot);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1.5;
      
      // Draw crosshair box
      ctx.beginPath();
      ctx.rect(-15, -15, 30, 30);
      ctx.stroke();
      
      // Draw crosshair diagonal lines
      ctx.beginPath();
      ctx.moveTo(-25, 0); ctx.lineTo(25, 0);
      ctx.moveTo(0, -25); ctx.lineTo(0, 25);
      ctx.stroke();
      ctx.restore();

      // 2. Draw user mouse tracker (Blueprint construction line)
      if (mousePos.x > 0 && mousePos.y > 0) {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.lineWidth = 1;
        
        // Draw coordinate lines from mouse to borders
        ctx.beginPath();
        ctx.setLineDash([2, 5]);
        ctx.moveTo(mousePos.x, 0);
        ctx.lineTo(mousePos.x, height);
        ctx.moveTo(0, mousePos.y);
        ctx.lineTo(width, mousePos.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw measuring line from center to mouse
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();

        // Calculate distance
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

        // Draw HUD readout next to mouse
        ctx.fillStyle = 'rgba(11, 30, 54, 0.85)';
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
        ctx.fillRect(mousePos.x + 15, mousePos.y + 15, 120, 50);
        ctx.strokeRect(mousePos.x + 15, mousePos.y + 15, 120, 50);

        ctx.fillStyle = 'rgba(0, 229, 255, 1)';
        ctx.fillText(`COORD_X: ${Math.round(mousePos.x)}px`, mousePos.x + 25, mousePos.y + 30);
        ctx.fillText(`COORD_Y: ${Math.round(mousePos.y)}px`, mousePos.x + 25, mousePos.y + 42);
        ctx.fillText(`RADIUS:  ${distance}px`, mousePos.x + 25, mousePos.y + 54);
      }

      // 3. Draw static UI layout blue-draft boxes to make it look like a website blueprint
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Top right spec box
      ctx.strokeRect(width - 150, 40, 110, 80);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.fillText('REF_SYS_MOD', width - 140, 55);
      ctx.fillText('SCALE: 1:1.2', width - 140, 70);
      ctx.fillText('GRID: 20px', width - 140, 85);
      ctx.fillText('STATUS: OK', width - 140, 100);

      // Bottom left compass spec box
      ctx.strokeRect(40, height - 120, 160, 80);
      ctx.fillText('DRAFT_SPECIFICATIONS', 50, height - 105);
      ctx.fillText('DOD: active_comp', 50, height - 90);
      ctx.fillText('RENDER_ENGINE: canvas2d', 50, height - 75);
      ctx.fillText('GRID_ALIGN: true', 50, height - 60);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <canvas 
      ref={canvasRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};

export default BlueprintCanvas;
