from pydantic import BaseModel
from datetime import datetime, date


class TaskBase(BaseModel):
    title: str
    description: str | None = None
    due_date: date | None = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass


class Task(TaskBase):
    id: str
    owner_id: str
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: str
    items: list[Task] = []

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class UserInDB(User):
    hashed_password: str
