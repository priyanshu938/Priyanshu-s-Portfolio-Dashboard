import React, { useState, useEffect } from "react";
import ServerUrl from "../../../ServerUrl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../ReusableComponents/Spinner";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllMessages = async () => {
    setIsLoading(true);
    const response = await fetch(`${ServerUrl}/contact/getAllContacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setMessages(json.result);
      setAllMessages(json.result);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllMessages();
  }, []);
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setMessages(
          allMessages.filter((message) =>
            message.name.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setMessages(allMessages);
  };
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container ">
          <Input
            type="text"
            className="mt-1 mx-4 my-4"
            placeholder="Search..."
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="text-secondary" />
              </InputAdornment>
            }
          />
          <div className="row" style={{ height: "75vh", overflow: "scroll" }}>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Time</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.length > 0 ? (
                          messages.map((message) => (
                            <tr key={message._id}>
                              <td>{message.name}</td>
                              <td>{message.email}</td>
                              <td>{message.message}</td>
                              <td>{message.time}</td>
                              <td>{message.date}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No messages</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Contact;
