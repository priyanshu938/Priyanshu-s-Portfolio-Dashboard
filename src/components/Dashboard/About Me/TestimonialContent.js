import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditTestimonialContentModal from "./EditTestimonialContentModal";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import url from "../../../ServerUrl";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const TestimonialContent = () => {
  const [myDetails, setMyDetails] = useState([]);
  const [openEditTestimonialContentModal, setOpenEditTestimonialContentModal] =
    useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMyDetails = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/testimonial/getTestimonial`, {
      method: "GET",
    });
    const json = await response.json();
    if (response.status === 200) {
      setMyDetails(json.result[0]);
      setId(json.result[0]._id);
      setDescription(json.result[0].description);
      setDesignation(json.result[0].designation);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyDetails();
  }, [isOpenSnackbar]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4 ms-5">
          <Snackbar
            isOpen={isOpenSnackbar}
            severity={severity}
            message={message}
            setIsOpen={setIsOpenSnackbar}
          />
          {openEditTestimonialContentModal && (
            <EditTestimonialContentModal
              openEditTestimonialContentModal={openEditTestimonialContentModal}
              setOpenEditTestimonialContentModal={
                setOpenEditTestimonialContentModal
              }
              setIsOpenSnackbar={setIsOpenSnackbar}
              setSeverity={setSeverity}
              setMessage={setMessage}
              id={id}
              description={description}
              designation={designation}
            />
          )}

          <div className="container">
            <div className="row">
              <div className="col">
                <div className=" mb-5">
                  <label
                    className="ms-2 "
                    style={{ color: "#00b7eb", fontSize: "20px" }}
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
                    className="ms-2 mb-4"
                    value={myDetails.description}
                  />
                  <br />

                  <label
                    className="ms-2"
                    style={{ color: "#00b7eb", fontSize: "20px" }}
                  >
                    Designation :
                  </label>
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    style={{ width: "40vw" }}
                    multiline
                    type="text"
                    className="ms-2 mb-3 "
                    value={myDetails.designation}
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    style={{ backgroundColor: "gray", width: "10vw" }}
                    onClick={() => {
                      setOpenEditTestimonialContentModal(true);
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

export default TestimonialContent;
