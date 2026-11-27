# Smart Ward Portal

A web-based platform designed to bridge the communication gap between citizens and local ward administration by making ward-related services and information more accessible, organized, and convenient.

**Smart Ward Portal** provides a centralized platform where citizens can access ward information, explore available services, submit complaints, and stay updated with notices and local projects. It also provides administrators with tools to manage and oversee portal activities.

🌐 **Live Demo:** [Smart Ward Portal](https://smart-ward-portal-client.onrender.com)

---

##  Features

### Citizen
- **User Authentication:** Register and securely log in to the portal.
- **Notices:** View announcements and important ward updates.
- **Ward Services:** Explore available ward services and their information.
- **Appointments:** Access and submit appointment requests.
- **Complaints:** Submit complaints and view complaint details.
- **Projects:** Browse information about ongoing and completed ward projects.

### Administrator
- **Admin Authentication:** Secure administrator login.
- **Notice Management:** Create and manage ward notices.
- **Department Management:** Manage ward departments.
- **Appointment Management:** View and manage appointment requests.
- **Complaint Management:** View and manage citizen complaints.
- **Project Management:** Manage ward project information.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React.js | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| Express.js | Backend framework |
| Node.js | Backend runtime |
| MongoDB Atlas | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Zod | Data validation |
| Axios | API communication |
| Cloudinary | Image and file management |
| Render | Application deployment |

---

## Project Structure

```text
Smart-Ward-Portal/
│
├── client/                 # Next.js frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Server/                 # Express.js backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── validators/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/Smart-Ward-Portal.git
```

Navigate into the project directory:

```bash
cd Smart-Ward-Portal
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `Server` directory and configure the following environment variables:

```env
NODE_ENV=development
PORT=8080

DB_URI=your_mongodb_connection_string

ORIGINS=http://localhost:3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_IN=7

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Build and start the backend:

```bash
npm run build
npm start
```

For development:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8080
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8080/api/v1
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

Make sure to configure your environment variables before running the application.

- MongoDB Atlas is required for the database connection.
- Cloudinary credentials are required for the configured media management functionality.
- Use a secure, private JWT secret.
- Configure the allowed frontend origin in the backend's `ORIGINS` variable.

**Important:** Never commit `.env` or `.env.local` files containing actual credentials to GitHub.

---

## Deployment

The application is deployed using **Render**.

| Component | Deployment |
|---|---|
| Frontend | [Smart Ward Portal](https://smart-ward-portal-client.onrender.com) |
| Backend | [Backend API](https://smart-ward-portal-api.onrender.com) |
| Database | MongoDB Atlas |

The frontend communicates with the deployed backend through the configured API base URL.

---

## Project Objective

The main objective of Smart Ward Portal is to improve accessibility, transparency, and communication between citizens and ward administration through a centralized digital platform.

By bringing ward notices, services, appointments, complaints, and project information together, the system aims to make everyday interactions with local administration more convenient and efficient.

---

## Developed By

**Smart Ward Portal** is an academic project developed as part of the BSc. CSIT program by Angel Khatri.

---

⭐ If you find this project interesting, feel free to explore the repository!

