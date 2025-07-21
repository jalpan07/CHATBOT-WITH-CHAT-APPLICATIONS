import subprocess
import platform

def open_calculator():
    system = platform.system()
    try:
        if system == "Windows":
            subprocess.run("calc.exe", check=True)
        elif system == "Darwin":  # macOS
            subprocess.run(["open", "-a", "Calculator"], check=True)
        elif system == "Linux":
            subprocess.run(["gnome-calculator"], check=True)  # For GNOME desktops
        else:
            print("Unsupported operating system!")
    except Exception as e:
        print(f"Error opening calculator: {e}")

if __name__ == "__main__":
    open_calculator()
