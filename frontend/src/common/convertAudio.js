import { useEffect } from "react";
 const convertAudio = (setIsPlaying, result, audioRef) => {

 useEffect(() => {
   // Check if result.audio and result.audio.data exist
   if (!result.audio || !result.audio.data) return;

   const audioBlob = new Blob([Uint8Array.from(result.audio.data)], {
     type: "audio/mpeg",
   });
   const audioUrl = URL.createObjectURL(audioBlob);

   if (audioRef.current) {
     // Set the src attribute of the audio element to the generated URL
     audioRef.current.src = audioUrl;
   }

   // Clean up the URL object when the component unmounts
   return () => {
     URL.revokeObjectURL(audioUrl);
   };
 }, [result]);
 
};

export default convertAudio;