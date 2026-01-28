"""add user settings column

Revision ID: 20260128_metadata
Revises: add_system_reports
Create Date: 2026-01-28 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import sqlite

# revision identifiers, used by Alembic.
revision = '20260128_metadata'
down_revision = 'add_system_reports'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add user_settings JSON column to users table
    op.add_column('users', sa.Column('user_settings', sa.JSON(), nullable=True))


def downgrade() -> None:
    # Remove user_settings column
    op.drop_column('users', 'user_settings')
