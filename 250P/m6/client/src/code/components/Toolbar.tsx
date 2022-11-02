import { Button } from "@material-ui/core";
import { ImportContacts, Message } from "@material-ui/icons";
import React from "react";

const Toolbar = ({state}) => (
  <div>
    <Button variant="contained" color="primary"
      size="small" style={{ marginRight: 10 }}
      onClick={ () => state.showComposeMessage("new") }>
        <Message style={{ marginRight: 10 }} /> 
        New Message
    </Button>
    <Button variant="contained" color="primary"
      size="small" style={{ marginRight: 10 }}
      onClick={ state.showAddContact }>
        <ImportContacts style={{ marginRight: 10 }} />
        New Contact
    </Button>
  </div>
)

export default Toolbar;