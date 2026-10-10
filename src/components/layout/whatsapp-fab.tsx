"use client";

import { Box } from "@chakra-ui/react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFab({ number }: { number: string }) {
  return (
    <Box position="fixed" bottom={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }} zIndex="overlay">
      <motion.a
        href={whatsappLink(number, DEFAULT_WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "grid",
          placeItems: "center",
          width: 58,
          height: 58,
          borderRadius: "9999px",
          background: "#25D366",
          color: "white",
          boxShadow: "0 10px 30px rgba(37, 211, 102, 0.45)",
        }}
      >
        <FaWhatsapp size={30} />
      </motion.a>
    </Box>
  );
}
