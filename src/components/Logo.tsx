interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
  direction?: "horizontal" | "vertical";
}

const Logo = ({ size = "md", showText = true, variant = "dark", direction = "horizontal" }: LogoProps) => {
  const sizes = {
    sm: "h-10 lg:h-12",
    md: "h-16 md:h-24 lg:h-28",
    lg: "h-20 md:h-32 lg:h-36",
  };

  const textColors = {
    dark: "text-navy",
    light: "text-white",
  };

  return (
    <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'items-center'} ${direction === 'vertical' ? 'gap-1' : 'gap-3'} items-center text-center`}>
      <img
        src="/logo_main.png"
        alt="Happy Dental Agency"
        className={`${sizes[size]} w-auto object-contain transition-all duration-300`}
      />
      {showText && (
        <div className={`flex flex-col ${direction === 'vertical' ? 'leading-tight' : 'leading-none'}`}>
          <span className={`font-heading font-bold ${textColors[variant]} ${direction === 'vertical' ? 'text-[10px] md:text-xs' : 'text-base md:text-lg'} tracking-tight uppercase`}>
            Happy Dental Agency
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

