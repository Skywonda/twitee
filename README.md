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

- NOTE: YOU DON'T NEED TO PASS ACCESS TOKEN TO EVERY PROTECTED ROUTE IF YOU ARE USING A TOOL LIKE POSTMAN OR INSONMIA

# Users

Each user has an account with the following details:

- Name
- Email
- Password (encrypted)
- Date created

### Signup User

- Route: / users
- Method: POST
- Body:

```
{
    "name": "jon doe",
    "email": "doe@example.com",
    "password": "Password1",
}
```

- Response

Success

```
{
	"msg": "User created!",
	"user": {
		"id": "a7926233-6c03-4793-a11c-80628bad5994",
		"name": "Jon doe",
		"email": "doe@example.com",
		"password": "$argon2id$v=19$m=65536,t=3,p=4$lauUe1DoH0C9A7/00WW/AA$cmzyYa+SsJg3NBbm93U2cSA3zTx80WzSZsmQIhj4yaU",
		"created_at": "2023-02-21T11:04:28.253Z",
		"updated_at": "2023-02-21T11:04:28.253Z"
	}
}
```

When a user registers, they provide their name, email, and password. The password is encrypted before being stored in the database.

### Get users

- Route: /users
- Method: POST

- Response

```
{
	"user": [
		{
			"id": "a7926233-6c03-4793-a11c-80628bad5994",
			"name": "john doe",
			"email": "doe@example.com",
			"created_at": "2023-02-21T11:04:28.253Z",
			"updated_at": "2023-02-21T11:04:28.253Z"
		}
	]
}
```

# Query options

- search users by name:

  - query value: name

- Filter users by time created

  - hour
  - day
  - month

  ***

  - query value : time_format (required): This parameter specifies the format of the date created. The supported time formats are "hour", "day", and "month". If the time_format is "hour", the app will return records created within the past n hours specified by the start and end parameters. If the time_format is "day", the app will return records created within the past n days. If the time_format is "month", the app will return records created within the past n months.

  - query value 2: start (required): This parameter specifies the start date or time of the range you want to filter by. The value must be an integer representing the number of hours, days, or months ago, depending on the time_format used.

  - query value 3: end(optional): This parameter specifies the end date or time of the range you want to filter by. The value must be an integer representing the number of hours, days, or months ago, depending on the time_format used. If not specified, the app will return all records starting from the start date or time.

# Authentication

The application uses Passport.js for authentication. Users can log in using their email and password. After successfully logging in, a user's session is established and they can access protected routes.

### Login

- Route: /auth/login
- Method : POST
- Body :

```
{
	"email" : "doe@example.com",
	"password": "Password1"
}
```

- Response

Success

```
{
  "msg": "login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3OTI2MjMzLTZjMDMtNDc5My1hMTFjLTgwNjI4YmFkNTk5NCIsImVtYWlsIjoicHJpbmNlc2FtMzYwMEBnbWFpbC5jb20iLCJuYW1lIjoiSmFtZXMiLCJpYXQiOjE2NzY5ODQzMzUsImV4cCI6MTY3Njk4NzkzNX0.my5x6tiqxMCH8jjGFn7A_HXFtalanCKK4KXWM4jb7_o"
}
```

# Authorization

Protected routes are only accessible to authenticated users. Users can only delete their own twits. Users can like and comment on any twit.

# Twits

A twit is a short message posted by a user. Each twit has the following details:

- Content
- User ID
- Date created

### Add Twits

- Route: /posts
- Method: POST
- Authorization: Bearer token
- Body:

```
{
	"content": "my first post"
}
```

This is a protected route so users id is retreived from request

- Response

Success

```
{
	"msg": "Post created!",
	"post": {
		"id": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
		"ownerId": "a7926233-6c03-4793-a11c-80628bad5994",
		"content": "my first post",
		"created_at": "2023-02-21T11:07:19.172Z",
		"updated_at": "2023-02-21T11:07:19.172Z"
	}
}
```

### Get Twits

- Route: /posts/all
- Method: GET

- Response

```
{
	"post": [
		{
			"id": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
			"ownerId": "a7926233-6c03-4793-a11c-80628bad5994",
			"content": "my first post",
			"created_at": "2023-02-21T11:07:19.172Z",
			"updated_at": "2023-02-21T11:07:19.172Z",
			"owner": {
				"name": "John doe"
			}
		}
	]
}
```

# Query options

- Filter posts by time created

  - hour
  - day
  - month

  ***

  - query value : time_format (required): This parameter specifies the format of the date created. The supported time formats are "hour", "day", and "month". If the time_format is "hour", the app will return records created within the past n hours specified by the start and end parameters. If the time_format is "day", the app will return records created within the past n days. If the time_format is "month", the app will return records created within the past n months.

  - query value 2: start (required): This parameter specifies the start date or time of the range you want to filter by. The value must be an integer representing the number of hours, days, or months ago, depending on the time_format used.

  - query value 3: end(optional): This parameter specifies the end date or time of the range you want to filter by. The value must be an integer representing the number of hours, days, or months ago, depending on the time_format used. If not specified, the app will return all records starting from the start date or time.

### Get all user Twits

- Route: /posts/user/userId
- Method: GET
- Response:

```
{
	"post": [
		{
			"id": "b55bc152-41e5-414c-bf97-466f35e1d652",
			"ownerId": "0fc9514f-5ae5-42d1-b2ff-2ea8eaf56634",
			"content": "my first post",
			"created_at": "2023-02-17T18:57:24.661Z",
			"updated_at": "2023-02-17T18:57:24.661Z",
			"owner": {
				"name": "John doe"
			}
		}
	]
}
```

### Get a Twits

- Route: /posts/postId
- Method : GET
- Response:

```
{
	"id": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
	"ownerId": "a7926233-6c03-4793-a11c-80628bad5994",
	"content": "my first post",
	"created_at": "2023-02-21T11:07:19.172Z",
	"updated_at": "2023-02-21T11:07:19.172Z",
	"owner": {
		"id": "a7926233-6c03-4793-a11c-80628bad5994",
		"name": "John doe",
		"email": "doe@example.com",
		"password": "$argon2id$v=19$m=65536,t=3,p=4$lauUe1DoH0C9A7/00WW/AA$cmzyYa+SsJg3NBbm93U2cSA3zTx80WzSZsmQIhj4yaU",
		"created_at": "2023-02-21T11:04:28.253Z",
		"updated_at": "2023-02-21T11:04:28.253Z"
	},
	"comment": [
		{
			"id": "9d4faf4f-352e-44f5-bfc6-d6a18a9e1a38",
			"content": "This is my first post!",
			"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
			"authorId": "a7926233-6c03-4793-a11c-80628bad5994",
			"created_at": "2023-02-21T11:07:53.065Z",
			"updated_at": "2023-02-21T11:07:53.065Z"
		}
	],
	"like": [
		{
			"id": "c06148f2-c38c-4387-8fd6-0dbada5684f3",
			"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
			"userId": "a7926233-6c03-4793-a11c-80628bad5994",
			"created_at": "2023-02-21T12:59:05.525Z",
			"updated_at": "2023-02-21T12:59:05.525Z"
		}
	]
}
```

### Delete Twit

- Route: post/postId
- Method: DELETE
- Authorization : Bearer token

```
{
  "msg": "Twit deleted!"
}
```

# Comments

A comment is a message posted by a user in response to a twit. Each comment has the following details:

- Content
- Twit ID
- User ID
- Date created

### Add comment

- Route: /posts/comment
- Method: POST
- Authorization: Bearer token
- Body:

```
{
	"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
	"content": "This is my first comment!"
}
```

- Response:

Success

```

	"msg": "Comment added",
	"commnet": {
		"id": "9d4faf4f-352e-44f5-bfc6-d6a18a9e1a38",
		"content": "This is my first post!",
		"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df",
		"authorId": "a7926233-6c03-4793-a11c-80628bad5994",
		"created_at": "2023-02-21T11:07:53.065Z",
		"updated_at": "2023-02-21T11:07:53.065Z"
	}
}
```

# Likes

A like is a record indicating that a user has liked a twit. Each like has the following details:

- Twit ID
- User ID
- Date created

### Like Twit

- Route: /posts/like
- Method : POST
- Authorization: Bearer token
- Body:

```
{
	"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df"
}
```

- Response

Success

```
{
	"msg": "Post has been liked!"
}
```

### Dislike Twit

- Route: /posts/dislike
- Method : POST
- Authorization: Bearer token
- Body:

```
{
	"postId": "08ac1277-36c8-4f52-afa7-c02dcbf5d5df"
}
```

- Response

Success

```
{
	"msg": "Post has been liked!"
}
```

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
