from fastapi import FastAPI, Request, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from src.logging_config import setup_logging
import logging
from src.api import tasks # Import the tasks router

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Todo App Backend API",
    description="API for managing user tasks, including creation, retrieval, updates, and deletion.",
    version="1.0.0",
)

app.include_router(tasks.router, prefix="/api") # Include the tasks router

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down...")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()} for request: {request.url}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "message": "Validation Error"},
    )

@app.exception_handler(HTTPException) # Catch all HTTPException
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP exception: {exc.detail} with status {exc.status_code} for request: {request.url}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "message": "HTTP Error"},
    )

@app.exception_handler(Exception) # Catch all other exceptions
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled exception for request: {request.url}") # Logs traceback
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred.", "message": "Internal Server Error"},
    )

@app.get("/")
async def root():
    return {"message": "Todo App Backend API is running!"}