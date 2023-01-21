import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SendIcon from "@mui/icons-material/Send";
import Url from "../../../ServerUrl";
import { Button } from "@mui/material";
import Snackbar from "../../ReusableComponents/Snackbar";
import SnackbarForSendingMail from "../../ReusableComponents/SnackbarForShowingWait";
import Spinner from "../../ReusableComponents/Spinner";
import AddEmailContactModal from "./AddEmailContactModal";
import AddAttachmentsModal from "./AddAttachmentsModal";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  HtmlEditor,
  Table,
  QuickToolbar,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";

const EmailViaForm = () => {
  const [mailContactsFetchedFromServer, setMailContactsFetchedFromServer] =
    useState([]);
  const [sendMailTo, setSendMailTo] = useState([]);

  const [subject, setSubject] = useState("");
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [rteObject, setRteObject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openAddEmailContactModal, setAddEmailContactModal] = useState(false);
  const [openAddAttachmentsModal, setAddAttachmentsModal] = useState(false);
  const [openSnackbarForSendingMail, setOpenSnackbarForSendingMail] =
    useState(false);

  const getAllSavedMailContacts = async () => {
    const response = await fetch(`${Url}/emailViaForm/getSavedEmailContacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setMailContactsFetchedFromServer(json);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllSavedMailContacts();
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(attachments);
    if (sendMailTo.length > 0) {
      const data = {
        email: `${sendMailTo}`,
        subject: subject,
        cc: `${cc}`,
        bcc: `${bcc}`,
        html: rteObject.getHtml(),
        attachments: attachments,
      };
      try {
        setOpenSnackbarForSendingMail(true);
        const response = await fetch(`${Url}/emailViaForm/sendEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        const a = [];
        setSendMailTo([...a]);
        setSubject("");
        setCc([...a]);
        setBcc([...a]);
        setAttachments([...a]);
        setRteObject("");
        setMailContactsFetchedFromServer([]);
        setOpenSnackbarForSendingMail(false);
        setSeverity("success");
        setMessage(json.message);
        setIsOpen(true);
        setIsLoading(true);
      } catch (error) {
        setSeverity("error");
        setMessage("Internal Server Error!");
        setIsOpen(true);
      }
    } else {
      setSeverity("error");
      setMessage("Please select atleast one email");
      setIsOpen(true);
    }
  };
  const clearCacheData = async () => {
    try {
      const response = await fetch(`${Url}/emailViaForm/clearAttachments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setSeverity("success");
      setMessage(json.message);
      setIsOpen(true);
      setIsLoading(true);
    } catch (error) {
      setSeverity("error");
      setMessage("Internal Server Error!");
      setIsOpen(true);
    }
  };
  const toolbarSettings = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "LowerCase",
      "UpperCase",
      "|",
      "Formats",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "Outdent",
      "Indent",
      "|",
      "CreateLink",
      "|",
      "ClearFormat",
      "Print",
      "SourceCode",
      "FullScreen",
      "|",
      "Undo",
      "Redo",
    ],
  };
  const quickToolbarSettings = {
    link: ["Open", "Edit", "UnLink"],
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <Snackbar
            isOpen={isOpen}
            severity={severity}
            message={message}
            setIsOpen={setIsOpen}
          />
          <SnackbarForSendingMail
            isOpen={openSnackbarForSendingMail}
            severity="info"
            message="Sending mail..."
            setIsOpen={setOpenSnackbarForSendingMail}
          />

          {openAddEmailContactModal && (
            <AddEmailContactModal
              openAddEmailContactModal={openAddEmailContactModal}
              setAddEmailContactModal={setAddEmailContactModal}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
          )}

          {openAddAttachmentsModal && (
            <AddAttachmentsModal
              openAddAttachmentsModal={openAddAttachmentsModal}
              setAddAttachmentsModal={setAddAttachmentsModal}
              attachments={attachments}
              setAttachments={setAttachments}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
          )}
          <Box mx={2}>
            <form onSubmit={handleSubmit}>
              <Box style={{ display: "flex" }}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={mailContactsFetchedFromServer}
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => (
                    <TextField {...params} label="Mail to" />
                  )}
                  sx={{ width: "50vw" }}
                  style={{ marginBottom: "5vh" }}
                  onChange={(event, value) => {
                    const mail = value.map((x) => x.email);
                    setSendMailTo(mail);
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  style={{
                    backgroundColor: "green",
                    height: "8vh",
                    marginLeft: "5vw",
                  }}
                  onClick={() =>
                    setAddEmailContactModal(!openAddEmailContactModal)
                  }
                >
                  Add Email Contact
                </Button>
              </Box>
              <Box style={{ display: "flex" }}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={mailContactsFetchedFromServer}
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => <TextField {...params} label="Cc" />}
                  sx={{ width: "22vw" }}
                  style={{ marginBottom: "5vh" }}
                  onChange={(event, value) => {
                    const mail = value.map((x) => x.email);
                    setCc(mail);
                  }}
                />

                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={mailContactsFetchedFromServer}
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => (
                    <TextField {...params} label="Bcc" />
                  )}
                  sx={{ width: "22vw" }}
                  style={{ marginBottom: "5vh", marginLeft: "5vw" }}
                  onChange={(event, value) => {
                    const mail = value.map((x) => x.email);
                    setBcc(mail);
                  }}
                />
              </Box>
              <TextField
                required
                id="outlined-required"
                label="Subject"
                style={{ marginBottom: "5vh" }}
                sx={{ width: "50vw" }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <br />
              <RichTextEditorComponent
                height={"50vh"}
                width={"70vw"}
                ref={(richtexteditor) => {
                  setRteObject(richtexteditor);
                }}
                toolbarSettings={toolbarSettings}
                quickToolbarSettings={quickToolbarSettings}
              >
                <Inject
                  services={[Toolbar, Link, HtmlEditor, Table, QuickToolbar]}
                ></Inject>
              </RichTextEditorComponent>

              <br />
              <Box style={{ display: "flex" }}>
                {attachments.length > 0 ? (
                  <div
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "gray",
                    }}
                  >
                    <AttachFileOutlinedIcon />
                    {attachments.length} attachments added successfully!
                  </div>
                ) : (
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      style={{ backgroundColor: "gray" }}
                      onClick={() =>
                        setAddAttachmentsModal(!openAddAttachmentsModal)
                      }
                    >
                      Add attachments
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      style={{
                        backgroundColor: "red",
                        height: "6vh",
                        marginLeft: "5vw",
                        color: "white",
                      }}
                      onClick={clearCacheData}
                    >
                      Clear cached data
                    </Button>
                  </Box>
                )}
              </Box>
              <br />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                style={{ backgroundColor: "green", marginTop: "5vh" }}
              >
                Send
              </Button>
            </form>
          </Box>
        </div>
      )}
    </div>
  );
};

export default EmailViaForm;
