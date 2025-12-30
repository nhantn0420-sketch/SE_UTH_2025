import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  ButtonGroup,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Brush as BrushIcon,
  Clear as ClearIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Download as DownloadIcon,
  ColorLens as ColorIcon,
} from '@mui/icons-material';

const Whiteboard = ({ groupId, onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      setContext(ctx);
      saveState();
    }
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(dataUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const startDrawing = (e) => {
    if (!context) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
      saveState();
    }
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      saveState();
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `whiteboard-${groupId}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Bảng trắng</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Color Picker */}
            <ButtonGroup size="small">
              {colors.map((c) => (
                <IconButton
                  key={c}
                  onClick={() => setColor(c)}
                  sx={{
                    bgcolor: c,
                    width: 24,
                    height: 24,
                    border: color === c ? '2px solid #333' : 'none',
                    '&:hover': { bgcolor: c },
                  }}
                />
              ))}
            </ButtonGroup>

            {/* Line Width */}
            <Box sx={{ width: 100, mx: 2 }}>
              <Slider
                value={lineWidth}
                onChange={(e, val) => setLineWidth(val)}
                min={1}
                max={20}
                size="small"
              />
            </Box>

            {/* Actions */}
            <Tooltip title="Hoàn tác">
              <IconButton onClick={undo} disabled={historyIndex <= 0}>
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Làm lại">
              <IconButton onClick={redo} disabled={historyIndex >= history.length - 1}>
                <RedoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa tất cả">
              <IconButton onClick={clearCanvas} color="error">
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tải xuống">
              <IconButton onClick={downloadCanvas} color="primary">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            border: '1px solid #ddd',
            borderRadius: 1,
            overflow: 'hidden',
            cursor: 'crosshair',
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ width: '100%', display: 'block' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Whiteboard;
