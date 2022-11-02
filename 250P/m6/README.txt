Systems Used
============
Node Version: v16.17.1
Browser: Firefox 106.0
Operating System: macOS Monterey Version 12.5
Architecture: ARM-based

How to Test The Webserver
=========================
Run `cd server`
Run `npm run dev`

Run Series of Commands to Test Server:

curl localhost:8081/mailboxes

curl localhost:8081/mailboxes/INBOX

curl localhost:8081/messages/INBOX/44

curl -X DELETE localhost:8081/messages/INBOX/52

curl -d '{ "to" : "epic7bear@gmail.com", "from" : "epic7bear@gmail.com", "subject" : "This is a test", "message" : "If you see this then it worked!" }' -H "Content-Type:application/json" -X POST localhost:8081/messages

curl --location --request GET 'http://localhost:8081/contacts'

curl --location --request POST 'http://localhost:8081/contacts' \
-d '{
    "name": "Charles Weng",
    "email": "epic7bear@gmail.com"
}' -H "Content-Type:application/json"

curl --location --request PUT 'http://localhost:8081/contacts' \
-d '{
    "_id": "lV9dJGCgvzJ8w6q5",
    "name": "Charles Wang",
    "email": "epic7bear@gmail.com"
}' -H "Content-Type:application/json"

curl --location --request DELETE 'http://localhost:8081/contacts/lV9dJGCgvzJ8w6q5'

How to Test The Client
=========================
Run `cd client`
Run `npm run build`
Go to localhost:8081