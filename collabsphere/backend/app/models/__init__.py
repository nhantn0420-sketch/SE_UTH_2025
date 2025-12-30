# Models Package
from app.models.user import User, UserRole
from app.models.subject import Subject, Curriculum
from app.models.academic import Class, ClassMember
from app.models.project import Project, ProjectStatus, ProjectMilestone
from app.models.group import Group, GroupMember, GroupRole, Checkpoint, CheckpointSubmission
from app.models.evaluation import GroupEvaluation, MemberEvaluation, PeerReview, MilestoneAnswer
from app.models.resource import Resource, ResourceType
from app.models.notification import Notification, NotificationType
from app.models.communication import ChatMessage, Meeting, MeetingParticipant
