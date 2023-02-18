# TwitApp

TwitApp is a simple web application that allows users to post and interact with short messages called "twits". This app supports user registration, authentication, and authorization.

## Base url

```
https://twitee.cyclic.app
```

## Features

- User can register.
- User can log in.
- User can post twit.
- User can delete twit (if owned by user).
- User can add comments under twits.
- User can like twit.
- User can view all twit.
- User can logout.

## Technical Design

The application is built using the following technologies:

- Backend: Node.js, Express, Sql, Typescript
- Authentication: Passport.js
- Email: Nodemailer

The application consists of the following components:

### Users

Each user has an account with the following details:

- Name
- Email
- Password (encrypted)
- Date created

When a user registers, they provide their name, email, and password. The password is encrypted before being stored in the database.

### Authentication

The application uses Passport.js for authentication. Users can log in using their email and password. After successfully logging in, a user's session is established and they can access protected routes.

### Authorization

Protected routes are only accessible to authenticated users. Users can only delete their own twits. Users can like and comment on any twit.

### Twits

A twit is a short message posted by a user. Each twit has the following details:

- Content
- User ID
- Date created

### Comments

A comment is a message posted by a user in response to a twit. Each comment has the following details:

- Content
- Twit ID
- User ID
- Date created

### Likes

A like is a record indicating that a user has liked a twit. Each like has the following details:

- Twit ID
- User ID
- Date created

### Email

When a user registers, an email is sent to them welcoming them to the app. Nodemailer is used to send the email.

## Installation and Usage

To run this app on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/Skywonda/twitee.git`
2. Navigate to the project directory: `cd twitee`
3. Copy content in example.env to a new file called .env
4. Modify values to suit your needs
5. Install dependencies: `npm install`
6. Start the server: `npm start`
7. Open a web browser and go to `http://localhost:3000`

## Conclusion

TwitApp is a simple web application that allows users to post and interact with short messages. It supports user registration, authentication, and authorization. This documentation outlines the technical design of the application and provides instructions for running it locally.
