import React from 'react';
import { motion } from 'framer-motion';

function LoveMessage({ message }) {
  return (
    <motion.div
      className="max-w-xl w-full mx-auto bg-white p-6 rounded-2xl shadow-2xl text-center text-lg font-medium transition duration-300 sm:p-4 sm:mx-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-xl font-semibold sm:text-base">
        {message}
      </p>
    </motion.div>
  );
}

export default LoveMessage;
