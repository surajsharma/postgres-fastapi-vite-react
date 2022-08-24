"""Create DB Session"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://username:password@postgres:5432/vector"
# SQLALCHEMY_DATABASE_URL = "postgresql://admin:suraj@localhost:5432/vector"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind = engine)
Base = declarative_base()
