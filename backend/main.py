import uvicorn
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

origins = [
	"http://localhost:5173"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins = origins,
	allow_credentials = True,
	allow_methods=["*"],
	allow_headers=["*"],
)

sql_results = {"results": []}

@app.get("/sql_query")
async def query_sql(query : str):
	with sqlite3.connect('car_dealership.db') as connection:
		cursor = connection.cursor()
		cursor.execute(query)
		rows = cursor.fetchall()
		if rows:
			sql_results["results"] = rows
			return sql_results

if __name__ == "__main__":
	uvicorn.run(app, host ="0.0.0.0", port=8000)