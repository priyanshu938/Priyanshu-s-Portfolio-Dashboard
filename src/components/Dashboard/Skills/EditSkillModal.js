import React, { useState } from "react";
import url from "../../../ServerUrl";
import { Modal, Form, Input } from "antd";

export default function EditSkillModal({
  openEditSkillModal,
  setOpenEditSkillModal,
  setIsOpen,
  setSeverity,
  setMessage,
  id,
  image,
  skill,
  callUseEffect,
  setCallUseEffect,
}) {
  const handleSubmitForm = async (values) => {
    const data = {
      skill: values.skill,
      image: values.image,
    };
    try {
      const response = await fetch(`${url}/skills/editSkill/${id}`, {
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
        setOpenEditSkillModal(!openEditSkillModal);
        setCallUseEffect(!callUseEffect);
      }
    } catch (error) {
      setIsOpen(true);
      setSeverity("error");
      setMessage("Internal Server Error!");
    }
  };
  const [fields, setFields] = useState([
    {
      name: ["skill"],
      value: skill,
    },
    {
      name: ["image"],
      value: image,
    },
  ]);
  return (
    <div>
      <Modal
        open={openEditSkillModal}
        onCancel={() => setOpenEditSkillModal(false)}
        okButtonProps={{
          form: "edit-skill-form",
          key: "submit",
          htmlType: "submit",
        }}
        centered
      >
        <Form
          id="edit-skill-form"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
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
