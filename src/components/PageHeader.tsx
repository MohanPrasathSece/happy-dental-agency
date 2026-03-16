interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

const PageHeader = ({ title, subtitle, badge }: PageHeaderProps) => {
  return (
    <section className="hero-gradient pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-custom text-center">
        {badge && (
          <span className="inline-block bg-white/80 text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft">
            {badge}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy mb-4 animate-slide-up">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
