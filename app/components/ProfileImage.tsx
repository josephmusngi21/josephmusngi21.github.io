import Image, { type StaticImageData } from "next/image";

type ProfileImageProps = {
  src: string | StaticImageData;
  alt?: string;
};

export default function ProfileImage({ src, alt = "Profile photo" }: ProfileImageProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem] overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.16)] ring-1 ring-stone-200/70">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 16rem, 18rem"
        priority
      />
    </div>
  );
}