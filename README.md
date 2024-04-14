# Messenger project
Messenger application with Java Spring backend and React JS frontend

*  **Backend:**
Backend is Spring boot app with Spring security for implementing authorization and authenticatoin.
Sprign Data with Hibernate to interact with databases : PostgeSQL (*for auth purpuse*) and MongoDB (*for storing message data*).
To route messages between server and users this project use STOMP over WebSockets

* **Frontend:**
This project use React JS and TypeScript to implement SPA, Redux to save global state of application and Material UI.

> [!Caution]
> Because this project is under development most of implemented featured located in feature branches.
> * `feature/chat-service` Contains current chat implementation
> * `feature/frontend` Contains current frontend implementation
> * `develop` Has server with auth implementation
> *  `main` Now only have a copy of code from `develop`
