"""
Common response schemas
"""

from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, List

T = TypeVar('T')


class ResponseMessage(BaseModel):
    """Simple message response"""
    message: str
    success: bool = True


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response wrapper"""
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int


class ImportResult(BaseModel):
    """Result of import operation"""
    success_count: int
    error_count: int
    errors: List[str] = []
    created_items: List[str] = []
