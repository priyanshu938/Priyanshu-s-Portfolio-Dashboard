import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import Work from "./Work";
import url from "../../../ServerUrl";
import { Typography, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AddWorkModal from "./AddWorkModal";
import Snackbar from "../../ReusableComponents/Snackbar";
import Spinner from "../../ReusableComponents/Spinner";

const Works = () => {
  const [works, setWorks] = useState([]);
  const [allWorks, setAllWorks] = useState([]);
  const [openAddWorkModal, setOpenAddWorkModal] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllWorks = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/works/getAllWorksDashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setAllWorks(json.result);
    setWorks(json.result);
    setIsLoading(false);
  };
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    searchVal.length > 0
      ? setWorks(
          allWorks.filter((work) =>
            work.name.toLowerCase().includes(searchVal.toLowerCase())
          )
        )
      : setWorks(allWorks);
  };
  //Below useEffect will be called whenever value of isOpen will be changed
  useEffect(() => {
    getAllWorks();
  }, [isOpen]);
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
          {openAddWorkModal && (
            <AddWorkModal
              openAddWorkModal={openAddWorkModal}
              setOpenAddWorkModal={setOpenAddWorkModal}
              setIsOpen={setIsOpen}
              setSeverity={setSeverity}
              setMessage={setMessage}
            />
          )}
          <Input
            type="text"
            className="mt-1 mx-4"
            placeholder="Search work experience..."
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
            color='success'
            onClick={() => setOpenAddWorkModal(!openAddWorkModal)}
          >
            Add work experience
          </Button>

          {works.length > 0 ? (
            <ImageList
              sx={{
                width: 1000,
                height: 450,
                "&::-webkit-scrollbar": { display: "none" },
              }}
              cols={2}
              rowHeight={400}
            >
              {works.map((work) => (
                <Work
                  key={work._id}
                  id={work._id}
                  name={work.name}
                  image={work.image}
                  description={work.description}
                  url={work.url}
                  setIsOpen={setIsOpen}
                  setSeverity={setSeverity}
                  setMessage={setMessage}
                />
              ))}
            </ImageList>
          ) : (
            <Typography px={2} my={4} variant="h6" component="div" gutterBottom>
              No work experience found !
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default Works;
