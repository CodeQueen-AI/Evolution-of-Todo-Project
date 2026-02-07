def handle_error(e: Exception, message: str = "An unexpected error occurred."):
    print(f"Error: {message} Details: {e}")

def get_int_input(prompt: str) -> Optional[int]:
    while True:
        value = input(prompt).strip()
        if not value:
            return None
        try:
            return int(value)
        except ValueError:
            print("Invalid input. Please enter a number.")
