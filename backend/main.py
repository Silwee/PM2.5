from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncpg

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_db():
    return await asyncpg.connect("postgres://postgres:postgres@localhost:5432/PM25")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/{day}/{lon}/{lat}")
async def getValue(day: int, lon: float, lat: float):
    conn = await get_db()
    if day < 10:
        day = "2021010" + str(day)
    else:
        day = "202101" + str(day)
    try:
        query = 'SELECT ST_Value(r.rast, ST_SetSRID(ST_MakePoint(' + str(lon) + ', ' + str(lat) + '), 4326)) AS val FROM pm25.\"' + str(day) + '\" r ORDER BY val LIMIT 1;'
        print(query)
        row = await conn.fetchrow(query)
        
    finally:
        await conn.close()
    return {"pointValue": f" {row['val']}"}
