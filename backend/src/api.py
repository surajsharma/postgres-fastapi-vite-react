# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

"""FASTAPI BACKEND"""

from typing import List
from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel
from db import SessionLocal, engine
from sqlalchemy import event, exc

from seed import INITIAL_DATA

import models

app = FastAPI()
class Item(BaseModel):
    """item model for fastapi"""
    type: str
    title: str
    position: int
    class Config:
        """required for sqlalchemy"""
        orm_mode = True

db = SessionLocal()

@app.on_event("startup")
def configure():
    """CREATE DB"""
    print("🍍 CREATING DB...")
    models.Base.metadata.create_all(bind=engine)


@app.get("/seed", response_model=List[Item], status_code=status.HTTP_200_OK)
async def db_seed():
    """seed db if frontend requests"""
    try:
        db.execute("""CREATE TABLE IF NOT EXISTS items (position integer  PRIMARY KEY, type text, title text)""")
        objects = []
        print("🍕 TABLE CREATED... SEEDING...")

        for item in INITIAL_DATA["items"]:
            objects.append(models.Item(**item))


        item = db.query(models.Item).first()

        if not item:
            db.add_all(objects)
            db.commit()

    except exc.SQLAlchemyError as error:
        db.rollback()
        raise error

    items = db.query(models.Item).all()    
    return items

@app.get("/items", response_model=List[Item], status_code=status.HTTP_200_OK)
async def get_items():
    """get all items"""
    items = db.query(models.Item).all()
    return items

@app.get("/items/{id}", response_model=Item, status_code=status.HTTP_200_OK)
async def get_item(_id:int):
    """get one item"""
    item = db.query(models.Item).filter(models.Item.position == _id).first()
    return item

@app.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
async def create_item(item:Item):
    """create an item"""
    new_item = models.Item(title=item.title,
                           type=item.type,
                           position=item.position)

    db_item = db.query(models.Item).filter(models.Item.position == new_item.position).first()

    if db_item is not None:
        raise HTTPException(status_code=400, detail="Item already exists")

    db.add(new_item)
    db.commit()
    return new_item

@app.put("/items/{position}", response_model=Item, status_code=status.HTTP_200_OK)
async def update_item(position:int, item:Item):
    """update an item"""
    item_to_update = db.query(models.Item).filter(models.Item.position == position).first()

    print(item_to_update)

    item_to_update.title = item.title
    item_to_update.type = item.type

    db.commit()
    return item_to_update

@app.delete("/items/{position}")
async def del_item(position:int):
    """delete an item"""
    item_to_delete = db.query(models.Item).filter(models.Item.position == position).first()

    if item_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource Not Found")

    db.delete(item_to_delete)
    db.commit()

    return item_to_delete
