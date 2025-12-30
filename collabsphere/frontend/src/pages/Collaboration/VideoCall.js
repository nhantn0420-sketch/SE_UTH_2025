import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Avatar,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  CallEnd as CallEndIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const VideoCall = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const localVideoRef = useRef(null);

  useEffect(() => {
    // Initialize local video
    initLocalStream();
    
    // Demo participants
    setParticipants([
      { id: 1, name: 'Nguyễn Văn A', isHost: true },
      { id: 2, name: 'Trần Thị B', isHost: false },
      { id: 3, name: 'Lê Văn C', isHost: false },
    ]);

    return () => {
      // Cleanup
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Failed to get local stream:', err);
    }
  };

  const toggleAudio = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const handleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing
        await initLocalStream();
        setIsScreenSharing(false);
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
      }
    } catch (err) {
      console.error('Screen share error:', err);
    }
  };

  const handleEndCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    navigate(`/groups/${groupId}`);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button startIcon={<BackIcon />} onClick={() => navigate(`/groups/${groupId}`)}>
            Quay lại
          </Button>
          <Typography variant="h6">Video Call</Typography>
          <Chip label={`${participants.length} người tham gia`} size="small" />
        </Box>
        <IconButton onClick={() => navigate(`/chat/${groupId}`)}>
          <ChatIcon />
        </IconButton>
      </Box>

      {/* Video Grid */}
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* Local Video */}
            <Grid item xs={12} md={participants.length > 1 ? 6 : 12}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 300,
                  bgcolor: 'grey.900',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isVideoOn ? 'block' : 'none',
                  }}
                />
                {!isVideoOn && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>
                      {user?.full_name?.charAt(0) || 'U'}
                    </Avatar>
                  </Box>
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">{user?.full_name} (Bạn)</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Remote Videos (Demo) */}
            {participants.slice(1).map((participant) => (
              <Grid item xs={12} md={6} key={participant.id}>
                <Box
                  sx={{
                    height: '100%',
                    minHeight: 200,
                    bgcolor: 'grey.800',
                    borderRadius: 2,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar sx={{ width: 60, height: 60, fontSize: '1.5rem' }}>
                    {participant.name.charAt(0)}
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">{participant.name}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        {/* Controls */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            bgcolor: 'grey.100',
          }}
        >
          <Tooltip title={isAudioOn ? 'Tắt mic' : 'Bật mic'}>
            <IconButton
              onClick={toggleAudio}
              sx={{
                bgcolor: isAudioOn ? 'grey.300' : 'error.main',
                color: isAudioOn ? 'text.primary' : 'white',
                '&:hover': {
                  bgcolor: isAudioOn ? 'grey.400' : 'error.dark',
                },
              }}
            >
              {isAudioOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isVideoOn ? 'Tắt camera' : 'Bật camera'}>
            <IconButton
              onClick={toggleVideo}
              sx={{
                bgcolor: isVideoOn ? 'grey.300' : 'error.main',
                color: isVideoOn ? 'text.primary' : 'white',
                '&:hover': {
                  bgcolor: isVideoOn ? 'grey.400' : 'error.dark',
                },
              }}
            >
              {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isScreenSharing ? 'Dừng chia sẻ' : 'Chia sẻ màn hình'}>
            <IconButton
              onClick={handleScreenShare}
              sx={{
                bgcolor: isScreenSharing ? 'primary.main' : 'grey.300',
                color: isScreenSharing ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: isScreenSharing ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              <ScreenShareIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Kết thúc cuộc gọi">
            <IconButton
              onClick={handleEndCall}
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
              }}
            >
              <CallEndIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    </Box>
  );
};

export default VideoCall;
