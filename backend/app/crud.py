from sqlalchemy.orm import Session

from . import models, schemas, utils, auth


def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        id=utils.generate_uuid(),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user_task(db: Session, task: schemas.TaskCreate, user_id: str):
    db_task = models.Task(
        **task.model_dump(), owner_id=user_id, id=utils.generate_uuid()
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_user_tasks(db: Session, user_id: str, skip: int = 0, limit: int = 10):
    return (
        db.query(models.Task)
        .filter(models.Task.owner_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_user_task(db: Session, user_id: str, task_id: str):
    return (
        db.query(models.Task)
        .filter(models.Task.owner_id == user_id, models.Task.id == task_id)
        .first()
    )

def get_task_by_id(db: Session, task_id: str):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task_id: str, task: schemas.TaskUpdate):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    db_task.title = task.title
    db_task.description = task.description
    db_task.due_date = task.due_date
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: str):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    db.delete(db_task)
    db.commit()
    return db_task
