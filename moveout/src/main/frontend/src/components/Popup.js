import React from 'react'
import {Dialog, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme =>({
    dialogWrapper : {
        padding: theme.spacing(1),
        position: 'absolute',
    },
    dialogTitle:{
        paddingRight: '3px'
    }
}))
export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    return (
        <Dialog open={openPopup}  maxWidth= "md" classes = {{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style ={{display: "flex"}}>
                    <Typography variant = "h4" component = "div" style = {{flexGrow: 12}}>
                        {title}
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={()=>{setOpenPopup(false)}}>
                        X
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}