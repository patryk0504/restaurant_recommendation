import React from 'react'
import {Button} from "@mui/material";

const Success = ({success, step, setStep}) => {

    const Previous = e => {
        e.preventDefault();
        setStep(step - 1);
    }

    return (

        success ? <div>
            <h1>You are done!</h1>
        </div> : <div>
            <h1>Some fields are missing!</h1>
            <Button
                onClick={Previous}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Previous
            </Button>
        </div>


    )
}

export default Success