## Patient Management System 👨‍⚕️🏥

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

### 💡Introduction

A healthcare patient management application built with Next.js, enabling patients to easily register, book, and manage their appointments with doctors. The platform includes an admin panel that allows administrators to manage doctor profiles, schedule, confirm, and cancel appointments, and send SMS notifications.

### 🎨 Layout

<p align="center">
    <img src="https://github.com/user-attachments/assets/25abe8b3-d55e-47dd-acfc-657b4318f525" alt="Image Example">
    <img src="https://github.com/user-attachments/assets/b883ea35-2d35-4157-9eb1-3848293bedb3" alt="Image Example">
</p>

### 🛠️ Tech Stack

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

### 📝 Features

- **Patient Registration**: Patients can easily sign up and create their personal profiles to start using the system.

- **Schedule an Appointment with a Doctor**: Patients can book appointments with available doctors at their preferred time, with the option to schedule multiple appointments.

- **Doctor Management on Admin Side**: Administrators can add and manage doctor profiles in the system, ensuring accurate doctor information.

- **Appointment and Scheduling Management om Admin Panel**: Administrators can view, confirm, cancel, set times, and ensure appointments are properly scheduled for patients.

- **Send SMS on Appointment Confirmation**: Patients will receive SMS notifications confirming their scheduled appointments and related details.

- **Fully Responsive Design**: The application provides an optimal experience across all devices, adjusting to different screen sizes.

- **File Upload Using Appwrite Storage**: Users can securely upload and store documents within the app using Appwrite's storage capabilities.

### 🚀 Getting started

**Prerequisites**

Ensure the following are installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/healthcare.git
cd healthcare
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Replace the placeholder values with your Appwrite credentials.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

