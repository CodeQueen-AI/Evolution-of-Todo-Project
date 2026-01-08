import jwt  # pip install pyjwt

# Your backend secret (from .env)
SECRET = "my_super_secret_1234"  # replace with your .env secret

# Payload
payload = {
    "sub": "test_user"
}

# Generate token
token = jwt.encode(payload, SECRET, algorithm="HS256")
print("Your JWT token:")
print(token)
