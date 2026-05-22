import Image from "next/image";

const SIZE = 64;

export function DogIcon() {
  return (
    <Image
      src="/pet/dog.png"
      alt=""
      aria-hidden="true"
      width={SIZE}
      height={SIZE}
      className="opacity-95"
    />
  );
}

export function CatIcon() {
  return (
    <Image
      src="/pet/cat.png"
      alt=""
      aria-hidden="true"
      width={SIZE}
      height={SIZE}
      className="opacity-95"
    />
  );
}
