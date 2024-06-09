from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated

from . import crud, models, schemas, auth, constants
from .database import engine
from .dependencies import get_db

from datetime import timedelta

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
) -> schemas.Token:
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=schemas.User)
async def read_users_me(
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
):
    return current_user


@app.get("/tasks/", response_model=list[schemas.Task])
async def read_own_tasks(
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_user_tasks(db, user.id)

@app.post("/tasks/", response_model=schemas.Task)
async def create_task_for_user(
    task: schemas.TaskCreate,
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_user_task(db=db, task=task, user_id=user.id)

# get task by id
@app.get("/tasks/{task_id}", response_model=schemas.Task)
async def read_task(
    task_id: str,
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db_task = crud.get_user_task(db, user_id=user.id, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# delete task
@app.delete("/tasks/{task_id}", response_model=schemas.Task)
async def delete_task(
    task_id: str,
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
    db: Session = Depends(get_db),
):
    user = crud.get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db_task = crud.get_user_task(db, user_id=user.id, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.delete_task(db, task_id=task_id)

# update task
@app.put("/tasks/{task_id}", response_model=schemas.Task)
async def update_task(
    task_id: str,
    task: schemas.TaskUpdate,
    current_user: Annotated[schemas.User, Depends(auth.get_current_user)],
    db: Session = Depends(get_db),
):
    print(task)
    user = crud.get_user_by_email(db, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db_task = crud.get_user_task(db, user_id=user.id, task_id=task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.update_task(db, task_id=task_id, task=task)

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

