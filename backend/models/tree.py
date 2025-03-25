from sqlalchemy import JSON, Column, Integer

from .base import Base


class DecisionTree(Base):
    __tablename__ = "decision_tree"

    id = Column(Integer, primary_key=True)
    tree = Column(JSON, nullable=False)
