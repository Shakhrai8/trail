const convertAudio = (audioResult, audioRef) => {
  if (!audioResult.data) return;
  const audioBlob = new Blob([Uint8Array.from(audioResult.data)], {
    type: "audio/mpeg",
  });
  const audioUrl = URL.createObjectURL(audioBlob);

  if (audioRef.current) {
    audioRef.current.srcObject = audioBlob;
  }

  return () => {
    URL.revokeObjectURL(audioUrl);
  };
};

export default convertAudio;
