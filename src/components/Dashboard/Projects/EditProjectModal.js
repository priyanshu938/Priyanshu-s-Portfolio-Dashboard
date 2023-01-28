import React, { useState } from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

const EditProjectModal = ({
  openEditProjectModal,
  setOpenEditProjectModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  image,
  title,
  description,
  githubLink,
  liveProjectLink,
  youtubeVideoLink,
  callUseEffect,
  setCallUseEffect,
}) => {
  const { TextArea } = Input;
  const [fields, setFields] = useState([
    {
      name: ["image"],
      value: image,
    },
    {
      name: ["title"],
      value: title,
    },
    {
      name: ["description"],
      value: description,
    },
    {
      name: ["githubLink"],
      value: githubLink,
    },
    {
      name: ["youtubeVideoLink"],
      value: youtubeVideoLink,
    },
    {
      name: ["liveProjectLink"],
      value: liveProjectLink,
    },
  ]);

  const handleSubmitForm = async (values) => {
    const data = {
      image: values.image,
      title: values.title,
      description: values.description,
      githubLink: values.githubLink,
      liveProjectLink: values.liveProjectLink,
      youtubeVideoLink: values.youtubeVideoLink,
    };
    try {
      const response = await fetch(`${Url}/projects/editProject/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 200) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenEditProjectModal(!openEditProjectModal);
        setCallUseEffect(!callUseEffect);
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };

  return (
    <div>
      <Modal
        open={openEditProjectModal}
        onCancel={() => setOpenEditProjectModal(false)}
        okButtonProps={{
          form: "edit-project-form",
          key: "submit",
          htmlType: "submit",
        }}
        style={{ marginTop: "12vh", marginBottom: "5vh" }}
        centered
      >
        <Form
          id="edit-project-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="title" label="Project title">
            <Input type="text" required />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input type="url" required />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} type="text" required />
          </Form.Item>
          <Form.Item name="githubLink" label="Github url">
            <Input type="url" required />
          </Form.Item>
          <Form.Item name="youtubeVideoLink" label="Youtube video url">
            <Input type="url" />
          </Form.Item>
          <Form.Item name="liveProjectLink" label="Live project url">
            <Input type="url" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProjectModal;
