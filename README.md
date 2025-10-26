# 📺 TV Series Management System (Angular)

This is an **Angular-based web application** designed for managing TV series with **role-based access control** and **JWT authentication**. The application allows different types of users (Admins and Normal Users) to interact with the system based on their roles.

---

## 🔐 Features

### ✅ Authentication & Authorization

- **JWT-based authentication**
- **AuthGuard** to protect routes and restrict access for unauthorized users
- **Role-based access control** for Admin and Normal users

---

## 👤 User Roles

### 🔸 Admin

- Add new TV series
- View all added TV series
- Filter/search TV series with multiple filters
- Update existing TV series data
- Delete TV series from the system

### 🔹 Normal User

- View all available TV series
- Search TV series by title
- View full details of a selected TV series

---

## 🛠️ Technologies & Tools Used

- **Angular**
- **JWT (JSON Web Tokens)**
- **Angular Material Components**
  - `mat-auto-complete`
  - `mat-chip-list`
  - `mat-radio-group`
  - `mat-date-range-input`
  - `mat-error`
- **Bootstrap**
- **Material UI**
- **Reactive Forms** with built-in validators
- **Lazy Loading** for optimized module loading
- **Paginated API responses** from backend
- **Custom 404 Page** for invalid routes
- **Login Page**

---

## 📸 UI Snapshots
<img src="public/login1.png" alt="Login Page" width="100">
<img src="public/register1.png" alt="Login Page" width="100">
---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Angular CLI
- Backend API with JWT support

### Installation

```bash
git clone https://github.com/IT19395906/tv-series-management-application-frontend.git
cd your-repo-name
npm install
ng serve
