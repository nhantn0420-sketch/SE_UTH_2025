"""Add system_reports table

Revision ID: add_system_reports
Revises: b8fb56fe37ea
Create Date: 2026-01-28

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import sqlite

# revision identifiers, used by Alembic.
revision = 'add_system_reports'
down_revision = 'b8fb56fe37ea'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create system_reports table
    op.create_table(
        'system_reports',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('subject', sa.String(length=200), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False, server_default='pending'),
        sa.Column('admin_response', sa.Text(), nullable=True),
        sa.Column('resolved_by_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('resolved_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.ForeignKeyConstraint(['resolved_by_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_system_reports_user_id'), 'system_reports', ['user_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_system_reports_user_id'), table_name='system_reports')
    op.drop_table('system_reports')
