import Modal from "@material-ui/core/Modal";
import React, { useContext } from "react";
import { DarkModeContext } from "../../pages/_app";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import modalStyles from "../../styles/Home.module.scss";

const YesButton = withStyles(() => ({
  root: {
    color: "#fff",
    background: "hsl(0, 100%, 37%)",
    transition: "background 0.35s ease-in-out",
    "&:hover": {
      background: "hsl(0, 100%, 47%)",
    },
  },
}))(Button);

const NoButton = withStyles(() => ({
  root: {
    color: "#fff",
    backgroundColor: "hsl(247, 32%, 41%)",
    "&:hover": {
      backgroundColor: "hsl(247, 32%, 55%)",
    },
  },
}))(Button);

function LogOutModal({ openModal, handleClose, signOut }) {
  const darkMode = useContext(DarkModeContext);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={modalStyles["modal-content-wrapper"]}>
        <div
          className={
            darkMode
              ? modalStyles["modal-content-light"]
              : modalStyles["modal-content-dark"]
          }
        >
          <h1>Are you sure you want to logout?</h1>
          <div className={modalStyles["modal-button-wrapper"]}>
            <div>
              <YesButton variant="contained" onClick={signOut}>
                Yes
              </YesButton>
            </div>

            <div>
              <NoButton variant="contained" onClick={handleClose}>
                No
              </NoButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LogOutModal;
