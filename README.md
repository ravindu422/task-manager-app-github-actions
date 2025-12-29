# Task Manager Application

A simple yet practical Task Manager application built for learning and practicing:

- **Best coding practices**
- **Automated testing** (Jest, Vitest)
- **CI/CD pipelines** (GitHub Actions)
- **API development** (REST)
- **Modern frontend development** 

## Features

- [x] CRUD operations for tasks
- [x] Marks tasks as complete/incomplete
- [x] Filter tasks by status ***(All, Active, Completed)***
- [x] Responsive UI
- [x] REST API with Express
- [x] Comperhensive test coverage
- [x] Automated CI/CD pipeline

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **ESLint** - Code linting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **Axios** - HTTP client

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Trivy** - Security scanning


## Project Structure

```
task-manager-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── tests/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── .github/
    └── workflows/
        └── ci-cd.yml
```