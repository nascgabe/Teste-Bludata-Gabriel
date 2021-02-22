import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles(theme => ({
    button: {
        marginTop: '5%',
        width: '100%',
        backgroundColor:'#19458D',
        "&:hover": {
            backgroundColor: "#0082BF"},
        color:'white',
      
    }
}));
export default function IconLabelButtons(props) {
    const classes = useStyles();
    return (
        <div>
            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
            <Button
                variant='contained'
                onClick={props.onClick}
                className={classes.button}
                endIcon={<SendIcon>send</SendIcon>}
            >
                aprovar Todos
            </Button>
        </div>
    );
}