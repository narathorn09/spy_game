"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-4 right-4 bg-white shadow px-4 py-2 rounded-lg text-gray-800"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
