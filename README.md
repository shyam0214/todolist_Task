
# 📝 Todoist Task Organizer

This is a Node.js application that integrates with the **Todoist API** to fetch and consolidate data into a structured JSON tree format:
**Projects → Sections → Tasks → Comments**.

### 🔍 Purpose

Designed to demonstrate the ability to work with third-party APIs, handle asynchronous data flow, and organize complex data structures — ideal for showcasing backend skills in an interview setting.

---

## 📂 JSON Output Structure

```json
[
  {
    "id": 123,
    "name": "Project Name",
    "sections": [
      {
        "id": 456,
        "name": "Section Name",
        "tasks": [
          {
            "id": 789,
            "content": "Task Content",
            "comments": [
              {
                "id": 101,
                "content": "Comment content"
              }
            ]
          }
        ]
      }
    ]
  }
]
```

---

## 🛠 Tech Stack

- **Node.js** – Runtime environment  
- **Axios** – For HTTP requests  
- **dotenv** – Manage environment variables  
- **Async/Await** – For clean and readable asynchronous code  

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shyam0214/todolist_Task.git
cd todolist_Task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
TODOIST_API_KEY=your_todoist_api_token_here
```

### 4. Run the application

```bash
node index.js
```
➡️ After executing the above command, a folder named data will be created in the root directory. Inside it, you can view the JSON response in the todoistData.json file.
---

## 💡 What You’ll Learn From This Project

- Working with external APIs and authentication  
- Structuring nested JSON data  
- Managing async code using Promises  
- Environment variable management using `dotenv`  

---

## 👤 Author

**Shyam Gupta**  
Backend Developer | Node.js, NestJS, MongoDB, MySQL  
[GitHub Profile](https://github.com/shyam0214)

---
