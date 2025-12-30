import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  FormatListBulleted as ListIcon,
  FormatListNumbered as NumberedListIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import config from '../../config';
import { useAuth } from '../../context/AuthContext';

// Simple collaborative text editor component
const DocumentEditor = ({ documentId, groupId, initialContent = '', onSave }) => {
  const { user } = useAuth();
  const [content, setContent] = useState(initialContent);
  const [socket, setSocket] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    // Connect to socket for real-time collaboration
    const newSocket = io(config.SOCKET_URL, {
      auth: { token: localStorage.getItem(config.ACCESS_TOKEN_KEY) },
    });

    newSocket.on('connect', () => {
      newSocket.emit('join_document', { document_id: documentId });
    });

    newSocket.on('document_update', (data) => {
      if (data.user_id !== user?.id) {
        // Apply remote changes
        setContent(data.content);
      }
    });

    newSocket.on('user_joined_document', (data) => {
      setCollaborators((prev) => [...prev, data.user_id]);
    });

    newSocket.on('cursor_update', (data) => {
      // Handle cursor position updates from other users
      console.log('Cursor update:', data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leave_document', { document_id: documentId });
      newSocket.disconnect();
    };
  }, [documentId, user?.id]);

  const handleContentChange = useCallback((e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);

    // Broadcast changes to other users
    if (socket) {
      socket.emit('document_change', {
        document_id: documentId,
        content: newContent,
        user_id: user?.id,
      });
    }
  }, [socket, documentId, user?.id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(content);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const toolbarButtons = [
    { icon: <BoldIcon />, command: 'bold', tooltip: 'In đậm (Ctrl+B)' },
    { icon: <ItalicIcon />, command: 'italic', tooltip: 'In nghiêng (Ctrl+I)' },
    { icon: <UnderlineIcon />, command: 'underline', tooltip: 'Gạch chân (Ctrl+U)' },
    { icon: <ListIcon />, command: 'insertUnorderedList', tooltip: 'Danh sách' },
    { icon: <NumberedListIcon />, command: 'insertOrderedList', tooltip: 'Danh sách đánh số' },
    { icon: <CodeIcon />, command: 'formatBlock', value: 'pre', tooltip: 'Code block' },
  ];

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Trình soạn thảo văn bản</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Collaborators */}
            {collaborators.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {collaborators.slice(0, 3).map((userId, index) => (
                  <Tooltip key={userId} title={`User ${userId}`}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                      {index + 1}
                    </Avatar>
                  </Tooltip>
                ))}
                {collaborators.length > 3 && (
                  <Chip label={`+${collaborators.length - 3}`} size="small" />
                )}
              </Box>
            )}
            <IconButton onClick={handleSave} disabled={isSaving} color="primary">
              <SaveIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            p: 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'grey.50',
            borderRadius: '4px 4px 0 0',
          }}
        >
          {toolbarButtons.map((btn, index) => (
            <Tooltip key={index} title={btn.tooltip}>
              <IconButton
                size="small"
                onClick={() => execCommand(btn.command, btn.value)}
              >
                {btn.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>

        {/* Editor */}
        <Box
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
          sx={{
            minHeight: 400,
            p: 2,
            border: 1,
            borderColor: 'divider',
            borderTop: 0,
            borderRadius: '0 0 4px 4px',
            outline: 'none',
            '&:focus': {
              borderColor: 'primary.main',
            },
            '& pre': {
              bgcolor: 'grey.100',
              p: 1,
              borderRadius: 1,
              fontFamily: 'monospace',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DocumentEditor;
