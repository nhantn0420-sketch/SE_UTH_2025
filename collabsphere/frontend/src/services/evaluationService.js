import api from './api';

const evaluationService = {
  // ===== Group Evaluations =====

  // Get group evaluations
  async getGroupEvaluations(groupId) {
    const response = await api.get(`/evaluations/groups/${groupId}`);
    return response.data;
  },

  // Create group evaluation (params: score, feedback, criteria_scores as query params)
  async createGroupEvaluation(groupId, evaluationData) {
    const { score, feedback, criteria_scores } = evaluationData;
    const params = new URLSearchParams();
    params.append('score', score);
    if (feedback) params.append('feedback', feedback);
    if (criteria_scores) params.append('criteria_scores', criteria_scores);
    const response = await api.post(`/evaluations/groups/${groupId}?${params.toString()}`);
    return response.data;
  },

  // Note: updateGroupEvaluation endpoint doesn't exist in backend

  // ===== Member Evaluations =====

  // Get member evaluations (path: /members/{userId}, group_id as query param)
  async getMemberEvaluations(groupId, memberId) {
    const response = await api.get(`/evaluations/members/${memberId}?group_id=${groupId}`);
    return response.data;
  },

  // Create member evaluation (path: /members/{userId}, other params as query)
  async createMemberEvaluation(groupId, memberId, evaluationData) {
    const { score, feedback, contribution_assessment } = evaluationData;
    const params = new URLSearchParams();
    params.append('group_id', groupId);
    params.append('score', score);
    if (feedback) params.append('feedback', feedback);
    if (contribution_assessment) params.append('contribution_assessment', contribution_assessment);
    const response = await api.post(`/evaluations/members/${memberId}?${params.toString()}`);
    return response.data;
  },

  // ===== Peer Reviews =====

  // Get peer reviews for a group (path: /peer-reviews/{groupId})
  async getPeerReviews(groupId) {
    const response = await api.get(`/evaluations/peer-reviews/${groupId}`);
    return response.data;
  },

  // Submit peer review (path: /peer-reviews, all params as query)
  async submitPeerReview(groupId, reviewData) {
    const { reviewee_id, score, cooperation_score, contribution_score, communication_score, feedback, is_anonymous = true } = reviewData;
    const params = new URLSearchParams();
    params.append('group_id', groupId);
    params.append('reviewee_id', reviewee_id);
    params.append('score', score);
    params.append('cooperation_score', cooperation_score);
    params.append('contribution_score', contribution_score);
    params.append('communication_score', communication_score);
    if (feedback) params.append('feedback', feedback);
    params.append('is_anonymous', is_anonymous);
    const response = await api.post(`/evaluations/peer-reviews?${params.toString()}`);
    return response.data;
  },

  // Note: getMyPeerReviews and checkPeerReviewStatus don't exist in backend

  // ===== Milestone Answers =====

  // Get milestone answers (path: /milestone-answers/{groupId}, question_id as query param)
  async getMilestoneAnswers(groupId, questionId = null) {
    let url = `/evaluations/milestone-answers/${groupId}`;
    if (questionId) url += `?question_id=${questionId}`;
    const response = await api.get(url);
    return response.data;
  },

  // Submit milestone answer (path: /milestone-answers, params as query)
  async submitMilestoneAnswer(questionId, groupId, answer) {
    const params = new URLSearchParams();
    params.append('question_id', questionId);
    params.append('group_id', groupId);
    params.append('answer', answer);
    const response = await api.post(`/evaluations/milestone-answers?${params.toString()}`);
    return response.data;
  },

  // ===== Checkpoint Evaluations =====

  // Create checkpoint evaluation (path: /checkpoints/{checkpointId}, params as query)
  async createCheckpointEvaluation(checkpointId, evaluationData) {
    const { score, feedback } = evaluationData;
    const params = new URLSearchParams();
    params.append('score', score);
    if (feedback) params.append('feedback', feedback);
    const response = await api.post(`/evaluations/checkpoints/${checkpointId}?${params.toString()}`);
    return response.data;
  },

  // Note: getCheckpointEvaluation, getEvaluationSummary, getFinalGrades, exportGrades don't exist in backend
};

export default evaluationService;
