const AnimatedLogo = () => {
  return (
    <div className="logo-container">
      <iframe
        src={"/logo.html"}
        title="Logo"
        scrolling="no"
        frameBorder="0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default AnimatedLogo;
