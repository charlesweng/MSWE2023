Systems Used
============
Node Version: v16.17.1
Browser: Firefox 106.0
Operating System: macOS Monterey Version 12.5
Architecture: ARM-based

Why Use REST
============
REST, also known as RESTful API's (REpresentational State Transfer), is an architectural style for systems such as HTTP 
protocols. RESTful systems are stateless, which means server does not need to know about the state of the client. REST also has 
a simple request system, GET PUT POST DELETE, that return response codes 200x, 400x, 500x and simple url path naming system
like /noun/:id etc. Overall REST allows clients to uniformly interact with the server through a well architected system.

How Does AJAX Help With Web App
===============================
AJAX, asynchronous javascript and xml, allows client application to asynchronously (independently without blocking) communicate
with the webserver. This means content on the client will display even though the server data hasn't been fetched yet. This
allows for a smooth experience for the user using the application as they can click and modify the ui while waiting for the
server to respond.

How to Test The Webserver
=========================
Run `cd server`
Run `npm run dev`

Run Series of Commands to Test Server:

curl localhost:8081/mailboxes

curl localhost:8081/mailboxes/INBOX

curl localhost:8081/messages/INBOX/44

curl -X DELETE localhost:8081/messages/INBOX/52

curl -d '{ "to" : "epic7bear@gmail.com", "from" : "epic7bear@gmail.com", "subject" : "This is a test", "text" : "If you see this then it worked!" }' -H "Content-Type:application/json" -X POST localhost:8081/messages

curl --location --request GET 'http://localhost:8081/contacts'

curl --location --request POST 'http://localhost:8081/contacts' \
-d '{
    "name": "Charles Weng",
    "email": "epic7bear@gmail.com"
}' -H "Content-Type:application/json"

curl --location --request PUT 'http://localhost:8081/contacts' \
-d '{
    "_id": "yjjnFpwE3z87rVtB",
    "name": "Chuck Wang",
    "email": "chuckwang@gmail.com"
}' -H "Content-Type:application/json"

curl --location --request DELETE 'http://localhost:8081/contacts/lV9dJGCgvzJ8w6q5'

How to Test The Client
=========================
Run `cd client`
Run `npm run build`
Go to localhost:8081