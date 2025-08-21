import os

# Domains to search for
TARGET_DOMAINS = ["xat.com", "xat.wiki", "xat.me", "http://xat", "https://xat", "window.open", "location.href", "window.location"]
SEARCH_FOLDER = "."  # Search in current directory

def search_domains_in_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
            content = file.readlines()
            for line_number, line in enumerate(content, start=1):
                for domain in TARGET_DOMAINS:
                    if domain in line:
                        print(f"[MATCH] {file_path} (line {line_number}): {line.strip()}")

                        # Print context (3 lines before and after)
                        start = max(0, line_number - 4)
                        end = min(len(content), line_number + 3)
                        print("  Context:")
                        for ctx_line_num in range(start, end):
                            prefix = ">" if ctx_line_num == line_number - 1 else " "
                            print(f"  {prefix} {ctx_line_num + 1}: {content[ctx_line_num].strip()}")
                        print()
    except Exception as e:
        print(f"[ERROR] Could not read {file_path}: {e}")

def search_directory(directory):
    file_count = 0
    match_count = 0

    for root, _, files in os.walk(directory):
        for filename in files:
            # Skip node_modules and other common directories to ignore
            if any(ignore_dir in root for ignore_dir in [".git", "node_modules"]):
                continue

            # Only check files with these extensions
            if filename.endswith((".js", ".html", ".css", ".svg", ".json", ".php")):
                file_path = os.path.join(root, filename)
                file_count += 1

                # Check if any matches were found before
                old_match_count = match_count
                search_domains_in_file(file_path)

                # If new matches were found, increment match count
                if match_count != old_match_count:
                    match_count += 1

    print(f"Searched {file_count} files, found matches in {match_count} files.")

if __name__ == "__main__":
    print(f"Searching for target domains {TARGET_DOMAINS} in current directory...")
    search_directory(SEARCH_FOLDER)
    print("Search complete.")
