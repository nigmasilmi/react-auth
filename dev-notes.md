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
- Manage state for logged in or authorized in the component where the routes are defined, then render them conditionally.

### Authentication state persistance

- The states are lost with each reloading, because they are part of the variables and definitions for the process in course.
- We need to save that data outside of the application to persist it.
- We can save in local storage or cookies.
  [Local Storage vs. Cookies](https://academind.com/tutorials/localstorage-vs-cookies-xss)

- To log the user out automatically, we can start a timer with a setTimeout using the remaining time left for the token.
