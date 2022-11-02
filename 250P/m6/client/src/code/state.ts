import * as IMAP from "./IMAP";
import * as Contacts from "./Contacts";
import * as SMTP from "./SMTP";
import { config } from "./config";
import { toBase64 } from "./Utils";

export function createState(inParentComponent) {
  return {
    pleaseWaitVisible : false,
    contacts: [],
    mailboxes: [],
    messages: [],
    currentView: "welcome",
    currentMailbox: null,

    messageID: null,
    messageDate: null,
    messageFrom: null,
    messageTo: null,
    messageSubject: null,
    messageBody: null,

    contactID: null,
    contactName: null,
    contactEmail: null,
    contactImage: null,

    showHidePleaseWait : function(inVisible: boolean): void {
      this.setState({ pleaseWaitVisible: inVisible });
    }.bind(inParentComponent),

    addMailboxToList : function(inMailbox: IMAP.IMailbox): void {
      const c1: IMAP.IMailbox[] = this.state.mailboxes.slice(0);
      c1.push(inMailbox);
      this.setState({ mailboxes: c1 });
    }.bind(inParentComponent),

    addContactToList : function(inContact: Contacts.IContact): void {
      const c1: Contacts.IContact[] = this.state.contacts.slice(0);
      c1.push(inContact);
      this.setState({ contacts: c1 });
    }.bind(inParentComponent),

    showComposeMessage : function(inType: string): void {
      switch (inType) {
        case "new":
          this.setState({
            currentView: "compose",
            messageTo: "",
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail,
          })
          break;
        case "reply":
          this.setState({
            currentView: "compose",
            messageTo: this.state.messageFrom,
            messageSubject: `Re: ${this.state.messageSubject}`,
            messageFrom: config.userEmail,
            messageBody: `\n\n---- Original Message ---- \n\n${this.state.messageBody}`,
          })
          break;
        case "contact":
          this.setState({
            currentView: "compose",
            messageTo: this.state.contactEmail,
            messageSubject: "",
            messageBody: "",
            messageFrom: config.userEmail,
          })
          break;
      }
    }.bind(inParentComponent),

    showAddContact : function(): void {
      this.setState({
        currentView: "contactAdd",
        contactID: null,
        contactName: "",
        contactEmail: "",
        contactImage: "",
      });
    }.bind(inParentComponent),

    setCurrentMailbox : function(inPath: string): void {
      this.setState({
        currentView: "welcome",
        currentMailbox: inPath,
      });
      this.state.getMessages(inPath);
    }.bind(inParentComponent),

    getMessages : async function(inPath: string): Promise<void> {
      this.state.showHidePleaseWait(true);
      let messages: IMAP.IMessage[] = [];
      try {
        const imapWorker: IMAP.Worker = new IMAP.Worker();
        messages = await imapWorker.listMessages(inPath);
      } catch (inError) {
        console.log(inError);
      }
      this.state.showHidePleaseWait(false);
      this.state.clearMessages();
      messages.forEach((inMessage: IMAP.IMessage) => {
        this.state.addMessageToList(inMessage);
      });
    }.bind(inParentComponent),

    clearMessages : function(): void {
      this.setState({
        messages: []
      });
    }.bind(inParentComponent),

    addMessageToList : function(inMessage: IMAP.IMessage): void {
      const msg: any = {
        id: inMessage.id,
        date: inMessage.date,
        from: inMessage.from,
        subject: inMessage.subject,
      };
      const c1: any[] = [...this.state.messages, msg];
      this.setState({
        messages: c1
      });
    }.bind(inParentComponent),

    showContact : function(inID: string, inName: string, inEmail: string): void {
      this.setState({
        currentView: "contact",
        contactID: inID,
        contactName: inName,
        contactEmail: inEmail,
      });
    }.bind(inParentComponent),

    fieldChangeHandler: function(inEvent: any): void {
      if (inEvent.target.id === "contactName" && inEvent.target.length > 16) {
        return;
      }
      this.setState({
        [inEvent.target.id]: inEvent.target.value
      });
    }.bind(inParentComponent),

    fileChangeHandler: async function(inEvent: any): Promise<void> {
      this.state.showHidePleaseWait(true);
      let result;
      try {
        result = await toBase64(inEvent.target.files[0]);
      } catch (inError) {
        // console.log(inError);
      }
      this.state.showHidePleaseWait(false);
      this.setState({
        contactImage: result,
      });
    }.bind(inParentComponent),

    saveContact : async function(): Promise<void> {
      const c1 = this.state.contacts.slice(0);
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: Contacts.IContact = await contactsWorker.addContact({
        name: this.state.contactName, email: this.state.contactEmail, image: this.state.contactImage,
      });
      this.state.showHidePleaseWait(false);
      c1.push(contact);
      this.setState({
        contacts: c1,
        contactID: null,
        contactName: "",
        contactEmail: "",
      });
    }.bind(inParentComponent),

    deleteContact : async function(): Promise<void> {
      this.state.showHidePleaseWait(true);
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(this.state.contactID);
      this.state.showHidePleaseWait(false);
      const c1 = this.state.contacts.filter((contact: Contacts.IContact) => contact._id !== this.state.contactID);
      this.setState({
        contacts: c1,
        contactID: null,
        contactName: "",
        contactEmail: "",
      })
    }.bind(inParentComponent),

    showMessage : async function(inMessage: IMAP.IMessage): Promise<void> {
      this.state.showHidePleaseWait(true);
      const imapWorker: IMAP.Worker = new IMAP.Worker();
      const msgBody: string = await imapWorker.getMessageBody(
        inMessage.id, this.state.currentMailbox
      );
      this.state.showHidePleaseWait(false);
      this.setState({
        currentView: "message",
        messageID: inMessage.id,
        messageDate: inMessage.date,
        messageFrom: inMessage.from,
        messageTo: "",
        messageSubject: inMessage.subject,
        messageBody: msgBody,
      });
    }.bind(inParentComponent),

    sendMessage : async function(): Promise<void> {
      this.state.showHidePleaseWait(true);
      const smtpWorker: SMTP.Worker = new SMTP.Worker();
      await smtpWorker.sendMessage(
        this.state.messageTo,
        this.state.messageFrom,
        this.state.messageSubject,
        this.state.messageBody,
      );
      this.state.showHidePleaseWait(false);
      this.setState({ currentView: "welcome" });
    }.bind(inParentComponent),

    deleteMessage : async function(): Promise<void> {
      this.state.showHidePleaseWait(true);
      const imapWorker: IMAP.Worker = new IMAP.Worker();
      await imapWorker.deleteMessage(
        this.state.messageID, this.state.currentMailbox,
      );
      this.state.showHidePleaseWait(false);
      const c1 = this.state.messages.filter((inElement) => inElement.id !== this.state.messageID);
      this.setState({ messages: c1, currentView: "welcome" });
    }.bind(inParentComponent),

  }
}