import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./contacts";
import { IContact } from "./contacts";

const app: Express = express();
const PORT = 8081;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.json());

app.use("/", 
  express.static(path.join(__dirname, "../../client/dist"))
);

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  inResponse.header("Access-Control-Allow-Headers", 
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  // continue the chain of requests
  inNext();
});

app.get("/mailboxes",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
      inResponse.status(200).json(mailboxes);
    } catch (inError) {
      inResponse.status(500).send({ error: inError });
    }
  }
);

app.get("/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox: inRequest.params.mailbox
      });
      inResponse.status(200).json(messages);
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.get("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string | undefined = await imapWorker.getMessageBody({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10)
      });
      inResponse.status(200).send(messageBody);
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.delete("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10)
      });
      inResponse.status(200).send({ code: 200, message: "success" });
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.post("/messages",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
      await smtpWorker.sendMessage(inRequest.body);
      inResponse.status(200).send({ code: 200, message: "success" });
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.get("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contacts: IContact[] = await contactsWorker.listContacts();
      inResponse.json(contacts);
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.post("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactWorker: Contacts.Worker = new Contacts.Worker();
      const contact: IContact = await contactWorker.addContacts(inRequest.body);
      inResponse.json(contact);
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.delete("/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      inResponse.status(200).send({ code: 200, message: "success" });
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.put("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.updateContact(inRequest.body);
      inResponse.status(200).send({ code: 200, message: "success" });
    } catch (inError) {
      inResponse.status(500).send({ code: 500, message: "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Mailbag app listening on ${PORT}.`)
});