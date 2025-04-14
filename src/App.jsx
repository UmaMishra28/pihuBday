import React, { useEffect, useState } from "react";
import LoveMessage from "./component/LoveMessage";
import love from "./data/message";
import dayjs from "dayjs";
import { motion , AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [message, setMessage] = useState("");
  const [showMain , setShowMain] = useState(false);
  const [favorites , setFavorites] = useState([]);
  const [heartAnimDone, setHeartAnimDone] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  },[])

  const handleStart = () => {
    setShowMain(true);
  };

  const toggleFavorite = (message) => {
    let updated;
    if(favorites.some(f => f.text === message.text )){
      updated = favorites.filter(f => f.text !== message.text)
    }
    else{
      updated = [...favorites , message];
    }
    setFavorites(updated);
    localStorage.setItem('favorites' , JSON.stringify(updated))
  }

  const getCountdown = () => {
    const now = dayjs();
    const target = dayjs("2026-04-14T00:00:00");
  
    const diffMs = target.diff(now); // difference in milliseconds
  
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateMessage = () => {
    const randomIndex = Math.floor(Math.random() * love.length);
    setMessage(love[randomIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 px-4 sm:px-6">
  <AnimatePresence>
    {!heartAnimDone && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-pink-400 z-50"
        initial={{ scale: 1 }}
        animate={{ scale: 30, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={() => setHeartAnimDone(true)}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          className="text-4xl sm:text-6xl text-white drop-shadow-xl"
        >
          ❤️
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  {!showMain ? (
    <motion.div
      className="flex flex-col items-center justify-center h-screen text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <motion.h1
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-red-500 to-pink-800 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-wide drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        🎉 Happy Birthday Merii Babuuuu ❤️
      </motion.h1>

      <motion.h2
        className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-pink-800 bg-clip-text text-transparent mb-3 sm:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 2 }}
      >
        Meri Pyaari Pihuuuuuuu, I love youuuu babuu ❤️
      </motion.h2>

      <motion.p
        className="mb-4 sm:mb-6 text-sm sm:text-lg bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        ek chiz hai tumhare liye babuu❤️
      </motion.p>

      <motion.button
        onClick={handleStart}
        className="bg-pink-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-xl font-semibold hover:bg-pink-600 transition duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start My Gift 💝
      </motion.button>
    </motion.div>
  ) : (
    <motion.div
      className="flex flex-col items-center text-center px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-sm sm:text-xl font-mono text-white bg-black/60 px-4 py-3 sm:px-6 sm:py-4 rounded-lg mb-4 sm:mb-6 shadow-xl tracking-wide sm:tracking-widest">
        <h1>Babuu tumhare agle bday main itna time reh gaya 😙😊</h1>
        <span className="block text-pink-400 mt-1 sm:mt-2">{countdown}</span>
      </div>

      <motion.h1
        className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 sm:mb-10 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        💌 Love Letter Generator 💌
      </motion.h1>

      {message && <LoveMessage message={message} />}

      <motion.button
        onClick={generateMessage}
        className="mt-4 sm:mt-6 bg-gradient-to-r from-pink-600 to-red-500 hover:from-red-600 hover:to-pink-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-lg font-bold transition duration-300 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Generate Love Note 💖
      </motion.button>
    </motion.div>
  )}
</div>

  );
}

export default App;