import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import evaluationService from '../../services/evaluationService';

const PeerReview = ({ groupId, checkpointId, members, onComplete }) => {
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Initialize reviews for each member
    const initialReviews = {};
    members.forEach((member) => {
      initialReviews[member.id] = {
        score: 3,
        comment: '',
      };
    });
    setReviews(initialReviews);
  }, [members]);

  const handleScoreChange = (memberId, newValue) => {
    setReviews((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        score: newValue,
      },
    }));
  };

  const handleCommentChange = (memberId, comment) => {
    setReviews((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        comment,
      },
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const reviewData = Object.entries(reviews).map(([memberId, review]) => ({
        reviewed_user_id: parseInt(memberId),
        score: review.score,
        comment: review.comment,
      }));

      await evaluationService.submitPeerReview(groupId, checkpointId, reviewData);
      toast.success('Đánh giá đồng nghiệp thành công');
      if (onComplete) onComplete();
    } catch (err) {
      toast.error('Gửi đánh giá thất bại');
    } finally {
      setSubmitting(false);
    }
  };

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
          Đánh giá đồng nghiệp
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          Hãy đánh giá công bằng các thành viên trong nhóm dựa trên mức độ đóng góp và tinh thần làm việc nhóm.
        </Alert>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thành viên</TableCell>
                <TableCell align="center">Điểm đánh giá</TableCell>
                <TableCell>Nhận xét</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body1">{member.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {member.student_id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Rating
                      value={reviews[member.id]?.score || 3}
                      onChange={(event, newValue) => handleScoreChange(member.id, newValue)}
                      max={5}
                    />
                    <Typography variant="caption" display="block" color="text.secondary">
                      {reviews[member.id]?.score || 3}/5
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="Nhận xét về thành viên..."
                      value={reviews[member.id]?.comment || ''}
                      onChange={(e) => handleCommentChange(member.id, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSubmit}
            disabled={submitting}
          >
            Gửi đánh giá
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Dialog wrapper for PeerReview
export const PeerReviewDialog = ({ open, onClose, groupId, checkpointId, members }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Đánh giá đồng nghiệp</DialogTitle>
      <DialogContent>
        <PeerReview
          groupId={groupId}
          checkpointId={checkpointId}
          members={members}
          onComplete={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PeerReview;
