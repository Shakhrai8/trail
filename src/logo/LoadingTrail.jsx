const LoadingTrail = () => {
  return (
    <div className="loading-container">
      <iframe
        src={"/loadingTrail.html"}
        title="Loading"
        scrolling="no"
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LoadingTrail;
