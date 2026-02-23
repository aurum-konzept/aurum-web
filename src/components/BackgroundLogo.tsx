import Image from "next/image";

export default function BackgroundLogo() {
  return (
    <div aria-hidden className="aurum-bg-logo">
      <Image
        src="/aurum-logo-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="aurum-bg-logo-img"
        priority={false}
      />
    </div>
  );
}