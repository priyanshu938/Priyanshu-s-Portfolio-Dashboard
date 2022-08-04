import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Certificate from "./Certificate";
import url from "../../../ServerUrl";
import { Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddCertificateModal from "./AddCertificateModal";
import Snackbar from "../../ReusableComponents/Snackbar";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [openAddCertificateModal, setOpenAddCertificateModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getAllCertificates = async () => {
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
  useEffect(() => {getAllCertificates()}, [isOpen]);
  return (
    <div className="mt-4">
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
        />
      )}
      <Typography px={2} variant="h4" component="div" gutterBottom>
        My Certificates
      </Typography>
      <Input
        type="text"
        className="mt-1 mx-4"
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
        style={{ backgroundColor: "green" }}
        onClick={() => setOpenAddCertificateModal(!openAddCertificateModal)}
      >
        Add a Certificate
      </Button>

      {certificates.length > 0 ? (
        <ImageList
          sx={{
            width: 1000,
            height: 450,
            "&::-webkit-scrollbar": { display: "none" },
          }}
          cols={2}
          rowHeight={400}
        >
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
            />
          ))}
        </ImageList>
      ) : (
        <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
          No certificate found !
        </Typography>
      )}
    </div>
  );
};

export default Certificates;
