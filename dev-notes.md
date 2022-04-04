## React Auth + Firebase

Revisiting React Auth and Firebase
Includes dev notes

### Initial config in Firebase

- From a newly created project, go to Authentication.
- Choose a sign-in method: email/password, enable just email/password

### Sign up with email / password : Firebase

[Firebase documentation on the matter](https://firebase.google.com/docs/reference/rest/auth)

### Navigation Guards

- Mechanism to protect access to routes based on authentication

### The purpose of tokens

- Tokens are like a temporary permit than contains the thing that they are giving you permission for and your identification data in some way.

- The generation of that permit is responsability of the backend, some API.

- If we use Firebase as backend, there are endpoints in the API that allows you to access to that permit, if you ask properly for it and if you fill the requirements.

- The response of that request contains the token and the time until the token expires. Like the initial number of a count-back.

- There is no point for the user to use that same token because the backend won't grant permissions with an expired token.

- We can tell the user that they need to identify again (log in) by showing them the login page.

- We know when to show the login page because if we know the time in the future that this token expires, then we can decide if showing the login page or not.

- Remember that if the user is not logged in, they can not see some restricted routes. Just the initial one (/auth).

- So, what is the solution? log the user out when their token has expired.
