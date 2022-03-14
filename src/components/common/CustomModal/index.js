import  React from "react"
import Modal from '@mui/material/Modal';
import  "./CustomModal.scss"

const CustomModal = (props) => {
    const {customClass, handleClose, visible, children} = props

    return(
            <div className="">
                <Modal
                    open={visible}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={`custom-modal ${customClass}`}>
                        {children}
                    </div>
                </Modal>
            </div>
    )
}

export default CustomModal
