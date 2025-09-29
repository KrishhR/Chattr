# Chattr - Real-Time Chat Application

[Live Demo](https://chattr-realtime-chat-app.onrender.com/)

Chattr is a full-stack real-time chat application built with Node.js, Express, React, Zustand, and Socket.io. It allows users to register, log in, and chat instantly with other users, supporting text and media messages. The app is deployed and accessible online.

---

## Features

- **User Authentication:** Register and log in securely.
- **User List:** See all available users to chat with.
- **Real-Time Messaging:** Instant message delivery using Socket.io.
- **Media Support:** Send images and media attachments.
- **Responsive UI:** Mobile-friendly and modern design.
- **Message Timestamps:** Each message displays its sent time.
- **Loading Skeletons:** Smooth UX with loading indicators.
- **Profile Images:** Users have avatars (default or custom).
- **Error Handling:** Toast notifications for errors and actions.

---

## Tech Stack

- **Frontend:** React, Zustand, Tailwind CSS
- **Backend:** Node.js, Express
- **Real-Time:** Socket.io
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Deployment:** Render

---

## Folder Structure

```
Chattr/
├── backend/           # Express server, Socket.io, MongoDB models
├── frontend/          # React app, Zustand store, components
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── lib/
│   │   └── skeletons/
├── readme.md
```

---

## How It Works

1. **Sign Up / Login:**  
   Users create an account or log in.

2. **User List:**  
   After login, users see a list of other users.

3. **Chat:**  
   Select a user to start chatting. Messages are sent and received in real time.

4. **Media:**  
   Attach images to messages.

5. **Notifications:**  
   Errors and important actions are shown via toast notifications.

---

## Setup & Installation

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
npm install
# Configure .env for MongoDB URI and JWT secret
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

**Backend (.env):**
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Deployment

The app is deployed on [Render](https://render.com/).  
Live URL: [https://chattr-realtime-chat-app.onrender.com/](https://chattr-realtime-chat-app.onrender.com/)

---

## Screenshots

*(Add screenshots here if available)*

---

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Author

Krishnam Rastogi
