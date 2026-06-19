from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

hashed = "$2b$12$3qXxe1mUs0WwC4ynGyqquuuCi0mAuyPpY0Mz2K8633wVj6MMklXfa"

print(
    pwd_context.verify(
        "password123",
        hashed
    )
)