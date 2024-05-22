import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


export default function DialogError({open = false, closeError, children}){

    return(
        <Dialog open={open}>
            <DialogTitle>Hubo un error</DialogTitle>
            <DialogContent>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeError} color="error" variant="contained">Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
}