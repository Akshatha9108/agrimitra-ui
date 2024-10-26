"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const route = usePathname();
  const [textColor, setTextColor] = useState(
    route == "/" ? "text-white" : "text-black",
  );

  const handleScroll = () => {
    if (route == "/" && window.scrollY < 700) {
      setTextColor("text-white");
    } else {
      setTextColor("text-black");
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    if (route !== "/") {
      window.removeEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [route]);

  return (
    <>
      <nav className="fixed z-[100] flex h-20 w-full justify-center border-b-2 border-slate-300 backdrop-blur-lg">
        <div className="flex w-full max-w-7xl justify-between">
          <Image
            src="/logo-nobg.png"
            alt="Website logo"
            width={180}
            height={38}
            priority
            className="size-20"
          />
          <div
            className={`flex items-center gap-6 text-lg font-semibold ${textColor}`}
          >
            <Link
              href={"/"}
              className={`cursor-pointer p-1 ${route == "/" ? "underline" : ""}`}
            >
              Home
            </Link>
            <Link
              href={"/recommend"}
              className={`cursor-pointer p-1 ${route == "/recommend" ? "underline" : ""}`}
            >
              Recommendation
            </Link>
            <Link
              href={"/identify"}
              className={`cursor-pointer p-1 ${route == "/identify" ? "underline" : ""}`}
            >
              Disease Identification
            </Link>
            <Link
              href={"/mitraai"}
              className={`cursor-pointer p-1 ${route == "/mitraai" ? "underline" : ""}`}
            >
              MitraAI
            </Link>
          </div>
        </div>
      </nav>
      {route !== "/" && <div className="h-20"></div>}
    </>
  );
}
