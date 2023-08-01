import { useEffect } from "react";
const convertAudio = (setIsPlaying, result, audioRef) => {
  useEffect(() => {
    if (!result.audio || !result.audio.data) return;

    const audioBlob = new Blob([Uint8Array.from(result.audio.data)], {
      type: "audio/mpeg",
    });
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }

    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [result]);
};

export default convertAudio;
