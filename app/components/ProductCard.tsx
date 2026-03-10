interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  badge?: "New" | "Sold Out" | "Sale";
  bgColor?: string;
  src?: string;
  discount?: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  badge,
  bgColor,
  src,
  discount,
}: ProductCardProps) {
  // Calculate Atome instalment (price / 3)
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
  const atomeAmount = !isNaN(numericPrice)
    ? `RM${(numericPrice / 3).toFixed(2)}`
    : null;

  return (
    <div className="group cursor-pointer border border-[#e9c9bb]">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: bgColor }}
          />
        )}
        {badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] tracking-[0.08em] uppercase px-3 py-1 rounded-full font-medium ${
              badge === "Sold Out"
                ? "bg-white text-[#212121]"
                : badge === "Sale"
                ? "bg-[#f18080] text-white"
                : "bg-[#f18080] text-white"
            }`}
          >
            {badge === "Sale" && discount ? `Save ${discount}` : badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-3 space-y-0.5">
        <h3 className="text-[11px] font-medium tracking-[0.15em] text-[#212121] uppercase">
          {name}
        </h3>
        <div className="flex gap-2 items-center">
          <span
            className={`text-[13px] ${
              originalPrice ? "text-[#f18080]" : "text-[#212121]"
            }`}
          >
            {price}
          </span>
          {originalPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              {originalPrice}
            </span>
          )}
        </div>
        {/* Atome payment */}
        {atomeAmount && (
          <p className="text-[14px] text-[#a0998f] leading-snug">
            or 3 payments of{" "}
            <span className="font-semibold text-[#212121]">{atomeAmount}</span>{" "}
            with{" "}
            <span className="font-bold text-[#212121]">atome</span>{" "}
            <span>⚡</span>
          </p>
        )}
      </div>
    </div>
  );
}
