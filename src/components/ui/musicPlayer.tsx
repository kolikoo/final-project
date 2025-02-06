// MusicPlayer.tsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { musicList } from "@/musics/musicList"; 
import mp3Image from "@/images/mp3 image Background Removed.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useTranslation } from "react-i18next";

const MusicPlayer = () => {
  const {t}=useTranslation()
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    if (audioRef.current) {
      audioRef.current.src = musicList[index].src;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current = new Audio(musicList[index].src);
      audioRef.current.loop = true;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicList[currentTrack].src);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-5 right-5 px-4 py-5 dark:bg-[#C4D7F2] z-[999] dark:text-black bg-[#450920] font-semibold  text-white rounded-lg shadow-lg"
        >
          {t("header.doyouwantmusic")}
        </button>
      )}

      {isVisible && (
        <div className="fixed bottom-5 right-5 flex flex-col items-center justify-center z-[9999] bg-[#f8f4e3] bg-opacity-0 rounded-lg  h-[350px] p-0">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-[9999] bg-red-500  text-white px-2 py-1 rounded-lg text-sm hover:bg-red-700"
          >
            ✖
          </button>

          <div className="relative">
            {/* Title Text with animation */}
            <motion.h2
              className="text-[#cfc6bc] text-[8px] font-semibold absolute top-[150px] left-[33%] transform -translate-x-1/2 z-[999] animate-slideIn "
              animate={{
                x: ["-2vw", "10px"], // Move from left to right
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {musicList[currentTrack].title}
            </motion.h2>

            {/* MP3 Image */}
            <img
              className="w-[250px] h-[350px] relative"
              src={mp3Image}
              alt="MP3 Player"
            />
          </div>

          <div className="flex justify-center items-center gap-4 absolute top-[300px] right-[23%]">
            <button
              onClick={() =>
                changeTrack(
                  (currentTrack - 1 + musicList.length) % musicList.length,
                )
              }
              className="bg-[#5c3e1e] p-2 rounded-full text-white text-sm hover:bg-gray-800 dark:bg-[#C4D7F2] dark:text-black"
            >
              <ChevronLeftIcon />
            </button>

            <button
              onClick={togglePlay}
              className="bg-[#5c3e1e] p-2 rounded-full text-white text-lg hover:bg-gray-800 dark:bg-[#C4D7F2] dark:text-black"
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>

            <button
              onClick={() => changeTrack((currentTrack + 1) % musicList.length)}
              className="bg-[#5c3e1e] p-2 rounded-full text-white text-sm hover:bg-gray-800 dark:bg-[#C4D7F2] dark:text-black"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
