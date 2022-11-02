import { Button, InputBase, TextField } from "@material-ui/core"
import React from "react"
import parse from "html-react-parser";

const MessageView = ({state}) => {
  return (
    <form>
      {
        state.currentView === "message" &&
        <InputBase
          value={ `ID ` + state.messageID }
          defaultValue={ `ID ${state.messageID}` }
          margin="dense"
          disabled={ true }
          fullWidth={ true }
          className="messageInfoField"
        />
      }
      { state.currentView === "message" && <br /> }
      {
        state.currentView === "message" &&
        <InputBase
          value={ state.messageDate }
          defaultValue={ state.messageDate }
          margin="dense"
          disabled={ true }
          fullWidth={ true }
          className="messageInfoField"
        />
      }
      { state.currentView === "message" && <br /> }
      {
        state.currentView === "message" &&
        <TextField
          margin="dense"
          variant="outlined"
          fullWidth={ true }
          label="From"
          value={ state.messageFrom }
          disabled={ true }
          InputProps={{ style: { color: "#000000" } }}
        />
      }
      { state.currentView === "message" && <br /> }
      {
        state.currentView === "compose" &&
        <TextField
          margin="dense"
          id="messageTo"
          variant="outlined"
          fullWidth={ true }
          label="To"
          value={ state.messageTo }
          InputProps={{ style: { color: "#000000" } }}
          onChange={ state.fieldChangeHandler }
        />
      }
      { state.currentView === "compose" && <br /> }
      <TextField
        margin="dense"
        id="messageSubject"
        label="Subject"
        variant="outlined"
        fullWidth={ true }
        value={ state.messageSubject }
        disabled={ state.currentView === "message" }
        InputProps={{ style: { color: "#000000" } }}
        onChange={ state.fieldChangeHandler }
      />
      <br />
      {
        state.currentView === "message" &&
        <div className="iframeContainer">
          <iframe 
          src={"data:text/html;charset=utf-8," + encodeURIComponent(state.messageBody)}
          className="responsiveIframe"
          >
          </iframe>
        </div>
      }
      <br />
      {
        (state.currentView === "compose" || state.currentView === "reply") &&
        <TextField
        margin="dense"
        id="messageBody"
        variant="outlined"
        fullWidth={ true }
        multiline={ true }
        rows={ 12 }
        value={ state.messageBody }
        disabled={ state.currentView === "message" }
        InputProps={{ style: { color: "#000000" } }}
        onChange={ state.fieldChangeHandler }
        />
      }
      {
        state.currentView === "compose" &&
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10 }}
          onClick={ state.sendMessage }
        >
          Send
        </Button>
      }
      {
        state.currentView === "message" &&
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={ () => state.showComposeMessage("reply") }
        >
          Reply
        </Button>
      }
      {
        state.currentView === "message" &&
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: 10 }}
          onClick={ state.deleteMessage }
        >
          Delete
        </Button>
      }
    </form>
  )
}

export default MessageView;