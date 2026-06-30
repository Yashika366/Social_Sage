const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30",

    secondary:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[#41342f]",

    ghost:
      "text-[var(--text)] hover:text-[var(--accent)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;