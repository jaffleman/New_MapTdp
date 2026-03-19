import os
import hashlib
import hmac
import json
import time
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import bcrypt
import jwt
import httpx

# ─── Config ───
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "maptdp")
JWT_SECRET = os.environ.get("JWT_SECRET", "maptdp_jwt_secret_2026_v1_secure")
EXPRESS_BACKEND = "http://localhost:3001"

# ─── App ───
app = FastAPI(title="MapTDP API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── MongoDB ───
client = MongoClient(MONGO_URL)
db = client[DB_NAME]
users_col = db["users"]
users_col.create_index("email", unique=True)

# ─── Models ───
class RegisterRequest(BaseModel):
    email: str
    password: str
    username: str

class LoginRequest(BaseModel):
    email: str
    password: str

# ─── JWT Helpers ───
def create_token(user_id: str, email: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": int(time.time()) + 86400 * 7,
        "iat": int(time.time()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_token(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token manquant")
    token = auth[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

# ─── Auth Routes ───
@app.post("/api/auth/register")
async def register(body: RegisterRequest):
    existing = users_col.find_one({"email": body.email})
    if existing:
        raise HTTPException(status_code=400, detail="Cet email est déjà utilisé")
    
    hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt())
    user = {
        "email": body.email,
        "username": body.username,
        "password": hashed.decode(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    result = users_col.insert_one(user)
    user_id = str(result.inserted_id)
    token = create_token(user_id, body.email)
    
    return {
        "token": token,
        "user": {
            "id": user_id,
            "email": body.email,
            "username": body.username,
        }
    }

@app.post("/api/auth/login")
async def login(body: LoginRequest):
    user = users_col.find_one({"email": body.email})
    if not user:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    if not bcrypt.checkpw(body.password.encode(), user["password"].encode()):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    user_id = str(user["_id"])
    token = create_token(user_id, user["email"])
    
    return {
        "token": token,
        "user": {
            "id": user_id,
            "email": user["email"],
            "username": user["username"],
        }
    }

@app.get("/api/auth/me")
async def get_me(payload: dict = Depends(verify_token)):
    from bson import ObjectId
    user = users_col.find_one({"_id": ObjectId(payload["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "username": user["username"],
    }

# ─── Health ───
@app.get("/api/healthz")
async def healthz():
    return {"status": "ok", "service": "maptdp-backend"}

# ─── TDP Routes Proxy ───
async def proxy_to_express(request: Request, path: str, method: str = "POST"):
    """Proxy TDP routes to Express backend if available"""
    try:
        body = await request.body()
        headers = {"Content-Type": "application/json"}
        async with httpx.AsyncClient(timeout=10.0) as client:
            if method == "POST":
                resp = await client.post(f"{EXPRESS_BACKEND}/{path}", content=body, headers=headers)
            elif method == "PUT":
                resp = await client.put(f"{EXPRESS_BACKEND}/{path}", content=body, headers=headers)
            elif method == "DELETE":
                resp = await client.delete(f"{EXPRESS_BACKEND}/{path}", content=body, headers=headers)
            elif method == "GET":
                resp = await client.get(f"{EXPRESS_BACKEND}/{path}", headers=headers)
            else:
                resp = await client.post(f"{EXPRESS_BACKEND}/{path}", content=body, headers=headers)
            return json.loads(resp.text) if resp.text else []
    except Exception:
        return []

@app.post("/api/search")
async def search(request: Request):
    return await proxy_to_express(request, "search", "POST")

@app.post("/api/searchBp")
async def search_bp(request: Request):
    return await proxy_to_express(request, "searchBp", "POST")

@app.post("/api/searchRep")
async def search_rep(request: Request):
    return await proxy_to_express(request, "searchRep", "POST")

@app.post("/api/create")
async def create(request: Request):
    return await proxy_to_express(request, "create", "POST")

@app.put("/api/update")
async def update(request: Request):
    return await proxy_to_express(request, "update", "PUT")

@app.delete("/api/delete")
async def delete(request: Request):
    return await proxy_to_express(request, "delete", "DELETE")

@app.get("/api/updateid")
async def updateid(request: Request):
    return await proxy_to_express(request, "updateid", "GET")
