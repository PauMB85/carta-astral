export function AuroraBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full aurora-blob pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(120, 60, 160, 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full aurora-blob pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180, 120, 40, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "5s",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full aurora-blob pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(60, 30, 120, 0.25) 0%, transparent 70%)",
          filter: "blur(45px)",
          animationDelay: "10s",
        }}
      />
    </div>
  );
}
