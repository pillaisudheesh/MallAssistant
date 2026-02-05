from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True

class PromptRequest(BaseModel):
    """Data model for the incoming request."""
    prompt: str

class GenerationResponse(BaseModel):
    """Data model for the outgoing response."""
    response: str
