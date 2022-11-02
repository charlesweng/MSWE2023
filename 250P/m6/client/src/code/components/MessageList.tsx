import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";

const MessageList = ({state}) => {
  return (
  <Table stickyHeader padding="none">
    <TableHead>
      <TableCell style={{ width: 120 }}>Date</TableCell>
      <TableCell style={{ width: 300 }}>From</TableCell>
      <TableCell>Subject</TableCell>
    </TableHead>
    <TableBody>
      {
        state.messages.map(message => {
          return (
            <TableRow
              key={message.id}
              onClick={ () => state.showMessage(message) }
            >
              <TableCell>{ (new Date(message.date)).toLocaleDateString() }</TableCell>
              <TableCell>{ message.from }</TableCell>
              <TableCell>{ message.subject }</TableCell>
            </TableRow>
          );
        })
      }
    </TableBody>
  </Table>
  );
}

export default MessageList;