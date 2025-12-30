import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Rating,
  Chip,
  Tabs,
  Tab,
  Divider,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import evaluationService from '../../services/evaluationService';
import { useAuth } from '../../context/AuthContext';

const PeerReviewView = ({ groupId, userId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState({ received: [], given: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const targetUserId = userId || user?.id;

  useEffect(() => {
    fetchReviews();
  }, [groupId, targetUserId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Fetch reviews received
      const received = await evaluationService.getPeerReviewsForUser(targetUserId, groupId);
      // Fetch reviews given
      const given = await evaluationService.getPeerReviewsByUser(targetUserId, groupId);
      
      setReviews({
        received: received.reviews || received || [],
        given: given.reviews || given || [],
      });
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      // Demo data
      setReviews({
        received: [
          {
            id: 1,
            reviewer: { full_name: 'Trần Thị B', avatar: null },
            score: 4,
            comment: 'Làm việc tốt, hoàn thành đúng deadline. Cần cải thiện kỹ năng giao tiếp.',
            checkpoint: { name: 'Checkpoint 1' },
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            reviewer: { full_name: 'Lê Văn C', avatar: null },
            score: 5,
            comment: 'Rất tích cực và hỗ trợ các thành viên khác. Code clean và dễ đọc.',
            checkpoint: { name: 'Checkpoint 2' },
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            reviewer: { full_name: 'Phạm Thị D', avatar: null },
            score: 4,
            comment: 'Có trách nhiệm cao, tuy nhiên đôi khi deadline bị trễ.',
            checkpoint: { name: 'Final Review' },
            created_at: new Date().toISOString(),
          },
        ],
        given: [
          {
            id: 1,
            reviewed_user: { full_name: 'Trần Thị B', avatar: null },
            score: 4,
            comment: 'Hoàn thành tốt công việc được giao',
            checkpoint: { name: 'Checkpoint 1' },
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            reviewed_user: { full_name: 'Lê Văn C', avatar: null },
            score: 3,
            comment: 'Cần cải thiện về tiến độ',
            checkpoint: { name: 'Checkpoint 1' },
            created_at: new Date().toISOString(),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageScore = (reviewList) => {
    if (reviewList.length === 0) return 0;
    const total = reviewList.reduce((sum, r) => sum + r.score, 0);
    return (total / reviewList.length).toFixed(1);
  };

  const groupReviewsByCheckpoint = (reviewList) => {
    const grouped = {};
    reviewList.forEach((review) => {
      const checkpointName = review.checkpoint?.name || 'Khác';
      if (!grouped[checkpointName]) {
        grouped[checkpointName] = [];
      }
      grouped[checkpointName].push(review);
    });
    return grouped;
  };

  const ReviewCard = ({ review, showReviewer = true }) => (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {showReviewer
                ? review.reviewer?.full_name?.charAt(0)
                : review.reviewed_user?.full_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                {showReviewer ? review.reviewer?.full_name : review.reviewed_user?.full_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(review.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Rating value={review.score} readOnly size="small" />
            <Typography variant="caption" display="block" color="text.secondary">
              {review.score}/5 điểm
            </Typography>
          </Box>
        </Box>
        
        {review.comment && (
          <Typography variant="body2" sx={{ 
            bgcolor: 'grey.50', 
            p: 1.5, 
            borderRadius: 1,
            fontStyle: 'italic',
          }}>
            "{review.comment}"
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <StarIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'warning.main' }} />
          Đánh giá đồng nghiệp
        </Typography>

        {/* Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light' }}>
              <Typography variant="h3" color="success.dark">
                {calculateAverageScore(reviews.received)}
              </Typography>
              <Rating value={parseFloat(calculateAverageScore(reviews.received))} readOnly />
              <Typography variant="body2" color="text.secondary">
                Điểm trung bình nhận được ({reviews.received.length} đánh giá)
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light' }}>
              <Typography variant="h3" color="info.dark">
                {reviews.given.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đánh giá đã gửi
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 2 }}>
          <Tab
            icon={<PersonIcon />}
            iconPosition="start"
            label={`Đánh giá nhận được (${reviews.received.length})`}
          />
          <Tab
            icon={<GroupIcon />}
            iconPosition="start"
            label={`Đánh giá đã gửi (${reviews.given.length})`}
          />
        </Tabs>

        {/* Received Reviews */}
        {activeTab === 0 && (
          <Box>
            {reviews.received.length === 0 ? (
              <Alert severity="info">Bạn chưa nhận được đánh giá nào</Alert>
            ) : (
              Object.entries(groupReviewsByCheckpoint(reviews.received)).map(([checkpoint, checkpointReviews]) => (
                <Accordion key={checkpoint} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography fontWeight="bold">
                      {checkpoint}
                      <Chip
                        label={`${checkpointReviews.length} đánh giá`}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {checkpointReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} showReviewer={true} />
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        )}

        {/* Given Reviews */}
        {activeTab === 1 && (
          <Box>
            {reviews.given.length === 0 ? (
              <Alert severity="info">Bạn chưa gửi đánh giá nào</Alert>
            ) : (
              Object.entries(groupReviewsByCheckpoint(reviews.given)).map(([checkpoint, checkpointReviews]) => (
                <Accordion key={checkpoint} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography fontWeight="bold">
                      {checkpoint}
                      <Chip
                        label={`${checkpointReviews.length} đánh giá`}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {checkpointReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} showReviewer={false} />
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PeerReviewView;
