import React from "react";
import url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function AddSkillModal({
  openAddSkillModal,
  setOpenAddSkillModal,
  setIsOpen,
  setSeverity,
  setMessage,
}) {
  const handleSubmitForm = async (values) => {
    console.log(values);
    const data = {
      skill: values.skill,
      image: values.image,
    };
    try {
      const response = await fetch(`${url}/skills/addSkill`, {
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
        setOpenAddSkillModal(!openAddSkillModal);
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
        open={openAddSkillModal}
        onCancel={() => setOpenAddSkillModal(false)}
        okButtonProps={{
          form: "add-skill-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="add-skill-form"
          onFinish={(values) => {
            handleSubmitForm(values);
          }}
          layout="vertical"
        >
          <Form.Item name="skill" label="Skill name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item name="image" label="Image Url">
            <Input type="url" required />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
