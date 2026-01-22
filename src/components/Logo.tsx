interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="Happy Dental Agency"
        className={`${sizes[size]} w-auto object-contain`}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-heading font-bold text-navy text-xl">
            Happy Dental
          </span>
          <span className="text-xs font-medium text-gold tracking-wider uppercase">
            Agency
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
