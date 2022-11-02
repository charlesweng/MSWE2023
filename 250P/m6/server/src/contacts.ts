import Nedb from "nedb";
import * as path from "path";
const Datastore = require("nedb");

export interface IContact {
  _id?: number, name: string, email: string
}

export class Worker {
  private db: Nedb;

  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "contacts.db"),
      autoload: true
    });
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({ }, { _id: 1, name: 1, email: 1, image: 1},
        (inError: Error | null, inDocs: IContact[]) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve(inDocs);
          }
        }
      );
    });
  }

  public addContacts(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(inContact,
        (inError: Error | null, inNewDoc: IContact) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve(inNewDoc);
          }
        }
      );
    });
  }

  public deleteContact(inID: string): Promise<string | void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove({ _id: inID }, { }, 
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve();
          }
        }
      );
    });
  }

  public updateContact(inContact: IContact): Promise<IContact | void> {
    return new Promise((inResolve, inReject) => {
      this.db.update({ _id: inContact._id }, inContact, { },
        (inError: Error | null, numberOfUpdated: number) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve();
          }
        }
      );
    });
  }
  
}