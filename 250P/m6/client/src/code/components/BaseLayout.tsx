import { DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Dialog } from "material-ui";
import React from "react";
import { Component } from "react";
import { createState } from "../state";

class BaseLayout extends Component {
  state = createState(this);

  render() {
    return (
      <div className="appContainer">
        <p>Hello World</p>
        <Dialog open={this.state.pleaseWaitVisible}
          // disableBackdropClick={true}
          // disableEscapeKeyDown={true}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            Please Wait
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              ...Contacting Server...
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default BaseLayout;