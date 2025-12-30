"""
Notification Service - Email & Real-time notifications
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from datetime import datetime

from sqlmodel import Session
from app.config import settings
from app.models.notification import Notification, NotificationType


class NotificationService:
    """Service for handling notifications"""
    
    def __init__(self):
        self.smtp_host = settings.smtp_host
        self.smtp_port = settings.smtp_port
        self.smtp_user = settings.smtp_user
        self.smtp_password = settings.smtp_password
    
    def create_notification(
        self,
        session: Session,
        user_id: int,
        notification_type: NotificationType,
        title: str,
        message: str,
        link: Optional[str] = None,
        send_email: bool = False
    ) -> Notification:
        """
        Create a notification and optionally send email
        """
        notification = Notification(
            user_id=user_id,
            type=notification_type,
            title=title,
            message=message,
            link=link
        )
        
        session.add(notification)
        session.commit()
        session.refresh(notification)
        
        if send_email and self.smtp_user:
            # Get user email from database
            from app.models.user import User
            user = session.get(User, user_id)
            if user and user.email:
                self.send_email(user.email, title, message)
                notification.is_email_sent = True
                session.add(notification)
                session.commit()
        
        return notification
    
    def create_bulk_notifications(
        self,
        session: Session,
        user_ids: List[int],
        notification_type: NotificationType,
        title: str,
        message: str,
        link: Optional[str] = None
    ) -> List[Notification]:
        """
        Create notifications for multiple users
        """
        notifications = []
        for user_id in user_ids:
            notification = Notification(
                user_id=user_id,
                type=notification_type,
                title=title,
                message=message,
                link=link
            )
            session.add(notification)
            notifications.append(notification)
        
        session.commit()
        return notifications
    
    def send_email(self, to_email: str, subject: str, body: str) -> bool:
        """
        Send an email notification
        """
        if not self.smtp_user or not self.smtp_password:
            print("SMTP credentials not configured")
            return False
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = to_email
            msg['Subject'] = f"[CollabSphere] {subject}"
            
            # HTML email body
            html_body = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background-color: #4A90D9; color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; background-color: #f9f9f9; }}
                    .footer {{ padding: 10px; text-align: center; color: #666; font-size: 12px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>CollabSphere</h1>
                    </div>
                    <div class="content">
                        <h2>{subject}</h2>
                        <p>{body}</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 CollabSphere - Hệ thống hỗ trợ học tập dựa trên dự án</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(html_body, 'html'))
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            return True
        
        except Exception as e:
            print(f"Failed to send email: {e}")
            return False
    
    # ==================== NOTIFICATION TEMPLATES ====================
    
    def notify_project_approved(self, session: Session, user_id: int, project_title: str):
        """Notify when project is approved"""
        return self.create_notification(
            session,
            user_id,
            NotificationType.PROJECT_APPROVED,
            "Dự án đã được phê duyệt",
            f'Dự án "{project_title}" của bạn đã được phê duyệt.',
            send_email=True
        )
    
    def notify_project_rejected(self, session: Session, user_id: int, project_title: str, reason: str):
        """Notify when project is rejected"""
        return self.create_notification(
            session,
            user_id,
            NotificationType.PROJECT_REJECTED,
            "Dự án bị từ chối",
            f'Dự án "{project_title}" đã bị từ chối. Lý do: {reason}',
            send_email=True
        )
    
    def notify_group_leader_assigned(self, session: Session, user_id: int, group_name: str):
        """Notify when assigned as group leader"""
        return self.create_notification(
            session,
            user_id,
            NotificationType.GROUP_LEADER_ASSIGNED,
            "Bạn được phân công làm trưởng nhóm",
            f'Bạn đã được phân công làm trưởng nhóm "{group_name}".',
            send_email=True
        )
    
    def notify_milestone_completed(
        self, 
        session: Session, 
        user_ids: List[int], 
        group_name: str, 
        milestone_title: str
    ):
        """Notify when milestone is completed"""
        return self.create_bulk_notifications(
            session,
            user_ids,
            NotificationType.MILESTONE_COMPLETED,
            "Mốc dự án đã hoàn thành",
            f'Nhóm "{group_name}" đã hoàn thành mốc "{milestone_title}".'
        )
    
    def notify_evaluation_received(self, session: Session, user_id: int, evaluator_name: str):
        """Notify when evaluation is received"""
        return self.create_notification(
            session,
            user_id,
            NotificationType.EVALUATION_RECEIVED,
            "Bạn nhận được đánh giá mới",
            f'Bạn đã nhận được đánh giá từ {evaluator_name}.',
            send_email=True
        )
    
    def notify_meeting_scheduled(
        self, 
        session: Session, 
        user_ids: List[int], 
        meeting_title: str,
        scheduled_time: datetime
    ):
        """Notify when meeting is scheduled"""
        time_str = scheduled_time.strftime("%d/%m/%Y %H:%M")
        return self.create_bulk_notifications(
            session,
            user_ids,
            NotificationType.MEETING_SCHEDULED,
            "Cuộc họp mới được lên lịch",
            f'Cuộc họp "{meeting_title}" đã được lên lịch vào {time_str}.'
        )
    
    def notify_resource_uploaded(
        self, 
        session: Session, 
        user_ids: List[int], 
        resource_name: str,
        uploader_name: str
    ):
        """Notify when new resource is uploaded"""
        return self.create_bulk_notifications(
            session,
            user_ids,
            NotificationType.RESOURCE_UPLOADED,
            "Tài nguyên mới được tải lên",
            f'{uploader_name} đã tải lên tài nguyên mới: "{resource_name}".'
        )


# Singleton instance
notification_service = NotificationService()
