import React, { useEffect, useState } from "react";
import Certificate from "./Certificate";
import url from "../../../ServerUrl";
import { Typography, Button, Grid } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddCertificateModal from "./AddCertificateModal";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [openAddCertificateModal, setOpenAddCertificateModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callUseEffect, setCallUseEffect] = useState(false);

  const getAllCertificates = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${url}/certificates/getAllCertificatesDashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": window.localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setAllCertificates(json.result);
    setCertificates(json.result);
    setIsLoading(false);
  };
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setCertificates(
          allCertificates.filter((certificate) =>
            certificate.name.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setCertificates(allCertificates);
  };
  //Below useEffect will be called whenever value of isOpen will be changed
  useEffect(() => {
    getAllCertificates();
  }, [callUseEffect]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Snackbar
            isOpen={isOpen}
            severity={severity}
            message={message}
            setIsOpen={setIsOpen}
          />
          {openAddCertificateModal && (
            <AddCertificateModal
              openAddCertificateModal={openAddCertificateModal}
              setOpenAddCertificateModal={setOpenAddCertificateModal}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
              setCallUseEffect={setCallUseEffect}
              callUseEffect={callUseEffect}
            />
          )}
          <Input
            type="text"
            className="mx-4"
            placeholder="Search certificate..."
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="text-secondary" />
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="success"
            onClick={() => setOpenAddCertificateModal(!openAddCertificateModal)}
          >
            Add a Certificate
          </Button>

          {certificates.length > 0 ? (
            <Grid container spacing={3} my={2}>
              {certificates.map((certificate) => (
                <Certificate
                  key={certificate._id}
                  id={certificate._id}
                  name={certificate.name}
                  image={certificate.image}
                  description={certificate.description}
                  link={certificate.link}
                  setIsOpen={setIsOpen}
                  setSeverity={setSeverity}
                  setMessage={setMessage}
                  setCallUseEffect={setCallUseEffect}
                  callUseEffect={callUseEffect}
                />
              ))}
            </Grid>
          ) : (
            <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
              No certificate found !
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Certificates;
