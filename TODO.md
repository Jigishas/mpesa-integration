# TODO List for Fixing 403 Error on localhost

- [x] Fix bugs in Server/server.js: Correct getAccessToken to use resolve instead of response, and fix /stkpush callback placement.
- [x] Add a root route (GET /) in Server/server.js to handle requests to the base URL.
- [x] Update client/src/App.jsx to use fetch to POST form data to /stkpush instead of redirecting.
- [x] Test the server and client integration.
