import { Chip, List } from "@material-ui/core"
import React from "react";

const MailboxList = ({state}) => {
  return (
    <List>
      {
        state.mailboxes.filter(value => value.name !== '[Gmail]').map(value => {
          return (
            <Chip label={`${value.name}`}
                  onClick={ () => state.setCurrentMailbox(encodeURIComponent(value.path)) }
                  style={{ width: 128, marginBottom: 10 }}
                  color={ state.currentMailbox === encodeURIComponent(value.path)  ? "secondary" : "primary" }
            />
          );
        })
      }
    </List>
  )
}

export default MailboxList;