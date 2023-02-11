import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/userAction";
import { AppDispatch } from "../../store/index";
import {
  createContact,
  updateContact,
  deleteContact,
} from "../../store/userAction";
import "./dashboard.scss";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import mal from "../../assets/img/male.png";
import femal from "../../assets/img/female.png";

function Dashboard() {
  // @ts-ignore: Property '...' does not exist on type 'void'
  const { userInfo, contacts, loading, male, female } = useSelector(
    // @ts-ignore: Property '...' does not exist on type 'void'
    (state) => state.user
  );
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [contactId, setContactId] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  function handleCreatSubmit(e: any) {
    e.preventDefault();
    handleCloseCreate();
    const data = {
      first_name,
      last_name,
      gender,
      phone,
      userId: userInfo.id,
    };
    dispatch(createContact(data));
  }

  function handleUpdateSubmit(e: any) {
    e.preventDefault();
    const data = {
      first_name,
      last_name,
      gender,
      phone,
      userId: userInfo.id,
      contactId,
    };
    dispatch(updateContact(data));
  }

  return (
    <div className="dashboard">
      {!loading ? (
        <>
          <div className="title">
            <h2>{`Hey ${userInfo?.first_name}, welcome!`}</h2>
          </div>
          <div className="info">
            <div className="item green">
              <div className="num one">
                {contacts?.length > 0 ? contacts?.length : 0}
              </div>
              <div className="text">Total</div>
            </div>
            <div className="item orange">
              <div className="num one">{male.length > 0 ? male.length : 0}</div>
              <div className="text">Male</div>
            </div>
            <div className="item pink">
              <div className="num one">
                {female.length > 0 ? female.length : 0}
              </div>
              <div className="text">Female</div>
            </div>
          </div>
          <div className="contacts">
            <div className="con">
              <h3>All Contacts</h3>
              <button onClick={handleClickOpenCreate}>Create</button>
            </div>
            <div className="box">
              {contacts.map((contact, i) => (
                <div className="single" key={i}>
                  <div className="single-one">
                    {contact.gender === "male" ? (
                      <img src={mal} alt="" />
                    ) : (
                      <img src={femal} alt="" />
                    )}
                    <div className="both">
                      <p>
                        {contact.first_name} {contact.last_name}
                      </p>
                      <p>☎ {contact.phone}</p>
                    </div>
                  </div>
                  <div className="single-two">
                    <button
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        handleClickOpen();
                        setContactId(contact.id);
                      }}
                      className="edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          deleteContact({
                            userId: userInfo.id,
                            contactId: contact.id,
                          })
                        );
                      }}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Dialog open={openCreate} onClose={handleClose}>
            <DialogTitle>Create New Contact</DialogTitle>
            <DialogContent>
              <form onSubmit={handleCreatSubmit}>
                <TextField
                  fullWidth
                  id=""
                  label="first name"
                  helperText="Please enter your first name"
                  color="success"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="last name"
                  helperText="Please enter your last name"
                  color="success"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="gender"
                  helperText="Please enter your gender"
                  color="success"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="phone"
                  helperText="Please enter your phone"
                  color="success"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                  Create
                </button>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCreate}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Contact</DialogTitle>
            <DialogContent>
              <form onSubmit={handleUpdateSubmit}>
                <TextField
                  fullWidth
                  id=""
                  label="first name"
                  helperText="Please enter your first name"
                  color="success"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="last name"
                  helperText="Please enter your last name"
                  color="success"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="gender"
                  helperText="Please enter your gender"
                  color="success"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <TextField
                  fullWidth
                  id=""
                  label="phone"
                  helperText="Please enter your phone"
                  color="success"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                  Update
                </button>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
