import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import React from "react"

const ContactList = ({state}) => {
  return (
    <List>
      {
        state.contacts.map(value => {
          let avatarImage;
          if (value.image) {
            avatarImage = <img src={value.image}></img>;
          } else {
            avatarImage = <Person></Person>;
          }
          return(
            <ListItem
              key={value}
              button onClick={ () => state.showContact(value._id, value.name, value.email) }
            >
              <ListItemAvatar>
                <Avatar>
                  { avatarImage }
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${value.name}`}></ListItemText>
            </ListItem>
          );
        })
      }
    </List>
  )
}

export default ContactList;