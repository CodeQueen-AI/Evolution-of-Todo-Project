import pytest
import subprocess
import sys
from unittest.mock import patch

# Temporarily add src to path for direct import, though typically
# functional tests would run the CLI as a subprocess
sys.path.insert(0, './src')
from main import main
from backend.services.task_repository import TaskRepository # To clear state

@pytest.fixture(autouse=True)
def clean_repo():
    """Ensure the repository is clean before each test."""
    repo = TaskRepository()
    repo.clear()
    yield

def run_cli_command(input_sequence: list):
    """
    Helper function to simulate CLI interaction for functional tests.
    It feeds a sequence of inputs and captures outputs.
    """
    # Use Popen for more control over stdin/stdout
    process = subprocess.Popen(
        [sys.executable, 'src/main.py'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1 # Line-buffered
    )

    # Send input and capture output
    output = []
    for user_input in input_sequence:
        process.stdin.write(user_input + '\n')
        process.stdin.flush()
        # Read until prompt or next menu
        # This is a simplification; a real solution might need more sophisticated parsing
        while True:
            line = process.stdout.readline()
            if not line:
                break
            output.append(line.strip())
            if "Enter your choice:" in line or "Welcome to the Todo CLI App!" in line:
                break
            
    # After all inputs, read any remaining output and terminate
    process.stdin.close()
    remaining_output, _ = process.communicate(timeout=1) # Give it a moment to finish
    output.extend(remaining_output.splitlines())
    process.wait() # Ensure process has terminated

    return "\n".join(output)

# This e2e test will rely on run_cli_command
# It's a placeholder since run_cli_command needs to be properly implemented
def test_e2e_add_and_view_tasks():
    # Simulate adding a task, then viewing tasks
    # Expected output contains the added task
    pass

def test_e2e_add_update_delete_view_tasks():
    # Simulate a full lifecycle
    pass
