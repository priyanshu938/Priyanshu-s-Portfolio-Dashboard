import React, { useState, useEffect } from "react";
import ServerUrl from "../../../ServerUrl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Row, Table, Input as InputAntd, Button } from "antd";

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
      <Row gutter={10} style={{ margin: 10 }}>
        <Col span={22}>
          <Table
            loading={isLoading}
            pagination={true}
            dataSource={messages}
            columns={[
              {
                key: "name",
                title: "Name",
                dataIndex: "name",
              },
              {
                key: "email",
                title: "Email Id",
                dataIndex: "email",
              },
              {
                key: "message",
                title: "Message",
                dataIndex: "message",
              },
              {
                key: "time",
                title: "Time",
                dataIndex: "time",
              },
              {
                key: "date",
                title: "Date",
                dataIndex: "date",
                sorter: (a, b) => a.date > b.date,
                filterDropdown: ({
                  setSelectedKeys,
                  selectedKeys,
                  confirm,
                  clearFilters,
                }) => {
                  return (
                    <>
                      <InputAntd
                        autofocus
                        placeholder="Type text here"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                          setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                          );
                        }}
                        onPressEnter={(e) => {
                          confirm();
                        }}
                        onBlur={() => {
                          confirm();
                        }}
                      ></InputAntd>
                      <Button
                        style={{ margin: 6 }}
                        type="primary"
                        onClick={() => {
                          confirm();
                        }}
                      >
                        Search
                      </Button>
                      <Button
                        danger
                        onClick={() => {
                          clearFilters();
                          confirm();
                        }}
                      >
                        Reset
                      </Button>
                    </>
                  );
                },
                filterIcon: () => {
                  return <SearchIcon />;
                },
                onFilter: (value, record) => {
                  return record.date
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Contact;
