const GlowingBubbles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {[1, 2, 3, 4, 5, 6].map((group) => (
        <div key={group} className="glowing" style={{ animationDuration: `${group * 2}s` }}>
          {[1, 2, 3, 4].map((bubble) => (
            <span key={bubble} style={{ ['--i' as string]: bubble }}></span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GlowingBubbles;