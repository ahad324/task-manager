import os

EXTENSION = ".txt"

def generate_structure(path, depth=0):
    structure = ""
    try:
        for item in sorted(os.listdir(path)):
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                structure += "│   " * depth + "├── " + item + "/\n"
                structure += generate_structure(item_path, depth + 1)
            else:
                structure += "│   " * depth + "├── " + item + "\n"
    except PermissionError:
        structure += "│   " * depth + "├── [Permission Denied]\n"
    return structure

def show_file_contents(path, output_file):
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read().strip()
        if not content:
            return
        foldername, filename = os.path.split(path)
        foldername = foldername.replace(os.path.sep, "/")
        output_file.write(f"{foldername}/{filename}\n")
        output_file.write("<DOCUMENT>\n")
        output_file.write(content + "\n")
        output_file.write("</DOCUMENT>\n\n")
    except Exception as e:
        print(f"Error reading file {path}: {e}")

def process_project(section):
    folder = "client" if section == "frontend" else "server"
    label = "Frontend" if section == "frontend" else "Backend"
    src_path = os.path.join(os.getcwd(), folder, "src")

    if not os.path.isdir(src_path):
        print(f"{label} src folder not found at: {src_path}")
        return

    # Structure
    structure = generate_structure(src_path)
    structure_filename = f"{label}_Structure{EXTENSION}"
    with open(structure_filename, "w", encoding="utf-8") as f:
        f.write("Directory Structure:\n\n")
        f.write(structure)
    print(f"{label} structure saved to {structure_filename}")

    # Codebase
    content_filename = f"{label}_Codebase{EXTENSION}"
    with open(content_filename, "w", encoding="utf-8") as output_file:
        for root, _, files in os.walk(src_path):
            for file in files:
                if file == "__init__.py":
                    continue
                file_path = os.path.join(root, file)
                show_file_contents(file_path, output_file)
    print(f"{label} codebase saved to {content_filename}")

if __name__ == "__main__":
    choice = input("Enter [f] for frontend or [b] for backend: ").strip().lower()
    if choice == "f":
        process_project("frontend")
    elif choice == "b":
        process_project("backend")
    else:
        print("Invalid input. Use 'f' or 'b'.")
