import React from "react";
import Url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

const AddProjectModal = ({
  openAddProjectModal,
  setOpenAddProjectModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) => {
  const { TextArea } = Input;
  const handleSubmitForm = async (values) => {
    const data = {
      title: values.title,
      image: values.image,
      description: values.description,
      githubLink: values.githubLink,
      youtubeVideoLink: values.youtubeVideoLink,
      liveProjectLink: values.liveProjectLink,
    };
    try {
      const response = await fetch(`${Url}/projects/addProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        setIsOpen(true);
        setSeverity("success");
        setMessage(json.message);
        setOpenAddProjectModal(!openAddProjectModal);
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
        open={openAddProjectModal}
        onCancel={() => setOpenAddProjectModal(false)}
        okButtonProps={{
          form: "add-project-form",
          key: "submit",
          htmlType: "submit",
        }}
        style={{ marginTop: "12vh", marginBottom: "5vh" }}
        centered
      >
        <Form
          id="add-project-form"
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

export default AddProjectModal;
