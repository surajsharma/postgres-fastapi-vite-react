"""Item model for ORM"""

from sqlalchemy import String, Integer, Column, Text
from db import Base

class Item(Base):
    """Item dscription for orm"""
    __tablename__ = 'items'
    type=Column(String(255))
    title=Column(Text)
    position=Column(Integer, primary_key=True, unique=True, nullable=False)
