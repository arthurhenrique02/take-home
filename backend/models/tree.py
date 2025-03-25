from sqlalchemy import JSON, Column, Integer
from sqlalchemy.orm import Session

from .engine import Base, get_db


class DecisionTree(Base):
    __tablename__ = "tree"

    __database: Session = next(get_db())

    id = Column(Integer, primary_key=True)
    tree = Column(JSON, nullable=False)

    @classmethod
    def retrieve(cls):
        return cls.__database.query(DecisionTree).first()

    def create(self):
        if self.__database.query(DecisionTree).first():
            return

        self.__database.add(self)
        self.__database.commit()

    def update(self):
        self.__database.query(DecisionTree).update({"tree": self.tree})
        self.__database.commit()

    def save(self):
        if self.__database.query(DecisionTree).first():
            self.update()
        else:
            self.create()

    def delete(self, user_id: int) -> bool:
        pass
