import { Box, Modal } from "@mui/material";
import { ReactNode } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 700,
    overflow: "scroll",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 10,
};

interface IProps {
    children: ReactNode;
    open: boolean;
    handleClose: () => void;
    height?: number;
}

export default function CustomModal({
    children,
    open,
    handleClose,
    height,
}: IProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, height: height ? height : style.height }}>
                {children}
            </Box>
        </Modal>
    );
}
