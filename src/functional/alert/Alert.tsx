import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import CSS from "./alert.module.css";
import { motion } from "framer-motion";

interface AlertProps {
  show: boolean;
  message: string;
  type: string;
  handleClose: () => void;
}

const alertVariants = {
  open: {
    scale: [0, 1],
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  close: {
    scale: [1, 0],
    opacity: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
function Alert({ show, message, type, handleClose }: AlertProps) {
  return (
    <motion.div
      className={CSS["container"]}
      data-value={type}
      variants={alertVariants}
      animate={show ? "open" : "close"}
    >
      <IconX className={CSS["btnClose"]} onClick={handleClose}></IconX>
      <div>{message}</div>
    </motion.div>
  );
}

export default Alert;
