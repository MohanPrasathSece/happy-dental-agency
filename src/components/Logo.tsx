interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: "h-16",
    md: "h-20 md:h-28",
    lg: "h-26 md:h-36",
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo_main.png"
        alt="Happy Dental Agency"
        className={`${sizes[size]} w-auto object-contain transition-all duration-300`}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-bold text-navy text-base md:text-lg tracking-tight">
            Happy Dental Agency
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
