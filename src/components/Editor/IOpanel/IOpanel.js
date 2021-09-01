import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import styles from "./io.module.css";
import Drawer from "@material-ui/core/Drawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropagateLoad from "../../../hooks/Loader/Clockloader";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const IOpanel = ({
  input,
  output,
  handleInputChange,
  handleOutputChange,
  submitCode,
  isError,
  errorMessage,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("input");

  const toggleDrawer = (paneltype, state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setType(paneltype);
    setOpen(true);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={styles.iowrapper}>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        // maxWidth={"md"}
        // fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Keyboard Shortcuts</DialogTitle>
        <DialogContent style={{ width: "600px" }}>
          <DialogContentText>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>Run code</h4>
              </Grid>
              <Grid item sm={6}>
                CTRL + ENTER
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>To indent one level</h4>
              </Grid>
              <Grid item sm={6}>
                TAB
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>Two indent one fewer level</h4>
              </Grid>
              <Grid item sm={6}>
                SHIFT + TAB
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>Move line up/down</h4>
              </Grid>
              <Grid item sm={6}>
                CTRL + SHIFT + UP / DOWN
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>Duplicate line</h4>
              </Grid>
              <Grid item sm={6}>
                CTRL + SHIFT + D
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={6}>
                <h4>Comment/uncomment selection</h4>
              </Grid>
              <Grid item sm={6}>
                CTRL + /
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor={"bottom"}
        open={open}
        variant="persistent"
        onClose={() => setOpen(false)}
        classes={{
          paperAnchorBottom: `${styles.drawer} ${!open && styles.closed} `,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setOpen(false)}>
            <ExpandMoreIcon />
          </Button>
        </div>
        {type === "input" ? (
          <textarea
            name="input"
            placeholder="Enter your test case..."
            className={styles.inputfield}
            value={input}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.5 : 1 }}
            onChange={(e) => handleInputChange(e.target.value)}
          ></textarea>
        ) : (
          <textarea
            name="output"
            placeholder="See Results Here."
            className={styles.inputfield}
            disabled={true}
            style={{
              color: isError !== 0 ? "#bd1d1d" : "black",
              opacity: isLoading ? 0.5 : 1,
            }}
            value={isError !== 0 ? errorMessage : output}
          ></textarea>
        )}
      </Drawer>
      <Grid container>
        <Grid item sm={6}>
          <div style={{ display: "flex", height: "100%" }}>
            <div
              onClick={toggleDrawer("input")}
              style={{ background: type === "input" ? "white" : "#c4c4c4" }}
              className={styles.inputbutton}
            >
              <p>Input</p>
            </div>
            <div
              onClick={toggleDrawer("output")}
              style={{ background: type === "output" ? "white" : "#c4c4c4" }}
              className={styles.outputbutton}
            >
              <p>Output</p>
            </div>
          </div>
        </Grid>
        <Grid item sm={6}>
          <div className={styles.rundiv}>
            <Tooltip title={"Keyboard Shortcuts"} placement="bottom" arrow>
              <Button style={{ color: "white" }} onClick={handleClickOpen}>
                <KeyboardIcon />
              </Button>
            </Tooltip>
            <Button
              className={styles.runbutton}
              onClick={() => {
                setOpen(true);
                setType("output");
                submitCode();
              }}
            >
              {isLoading ? <PropagateLoad /> : "Run Code"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default IOpanel;

// #include<iostream>
// using namespace std;

// int main(){
//   cout<<"Welcome to Confrenz"<<endl;
//   return 0;
// }
