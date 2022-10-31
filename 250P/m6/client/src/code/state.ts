import * as IMAP from "./IMAP";

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

    showHidePleaseWait : function(inVisible: boolean): void {
      this.setState({ pleaseWaitVisible: false });
    }.bind(inParentComponent),

    addMailboxToList : function(inMailbox: IMAP.IMailbox): void {
      const c1: IMAP.IMailbox[] = this.state.mailboxes.slice(0);
      c1.push(inMailbox);
      this.setState({ mailboxes: c1 });
    }.bind(inParentComponent),
  }
}