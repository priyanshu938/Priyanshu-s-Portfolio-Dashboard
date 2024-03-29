import React, { useEffect, useState } from "react";
import { Button, Link } from "@mui/material";
import EditFrontContentModal from "./EditFrontContentModal";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import url from "../../../ServerUrl";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";
import { Image } from "antd";

const FrontContent = () => {
  const [myDetails, setMyDetails] = useState([]);
  const [openEditFrontContentModal, setOpenEditFrontContentModal] =
    useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callUseEffect, setCallUseEffect] = useState(false);

  const getMyDetails = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/resume/getResume`, {
      method: "GET",
    });
    const json = await response.json();
    if (response.status === 200) {
      setMyDetails(json.result[0]);
      setId(json.result[0]._id);
      setImage(json.result[0].image);
      setDescription(json.result[0].description);
      setLink(json.result[0].link);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyDetails();
  }, [callUseEffect]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4">
          <Snackbar
            isOpen={isOpenSnackbar}
            severity={severity}
            message={message}
            setIsOpen={setIsOpenSnackbar}
          />
          {openEditFrontContentModal && (
            <EditFrontContentModal
              openEditFrontContentModal={openEditFrontContentModal}
              setOpenEditFrontContentModal={setOpenEditFrontContentModal}
              setIsOpenSnackbar={setIsOpenSnackbar}
              setSeverity={setSeverity}
              setMessage={setMessage}
              callUseEffect={callUseEffect}
              setCallUseEffect={setCallUseEffect}
              id={id}
              image={image}
              description={description}
              link={link}
            />
          )}

          <div className="container">
            <div className="row">
              <div className="col-4">
                <Image
                  src={myDetails.image}
                  alt="not found"
                  width={300}
                  style={{ marginTop: "5vh" }}
                />
              </div>
              <div className="col">
                <div className="mt-4 mb-5 ms-2">
                  <label
                    className="ms-2 "
                    style={{ color: "#1976D2", fontSize: "20px" }}
                  >
                    Name :
                  </label>
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "40vw" }}
                    type="text"
                    className="ms-2"
                    value="Hello, I am Priyanshu Tiwari"
                  />
                  <br />
                  <label
                    className="ms-2 mt-4 "
                    style={{ color: "#1976D2", fontSize: "20px" }}
                  >
                    Description :
                  </label>
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "40vw" }}
                    multiline
                    type="text"
                    className="ms-2 mb-5 "
                    value={myDetails.description}
                  />
                  <br />
                  <Link href={myDetails.link} target="_blank" underline="none">
                    <Button
                      className=""
                      variant="contained"
                      endIcon={<LaunchIcon />}
                    >
                      Resume Link
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-4"></div>
                <div className="col">
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="info"
                    style={{
                      width: "10vw",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      setOpenEditFrontContentModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontContent;
