"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const route = usePathname();

  return (
    <footer className="mt-96 flex h-80 w-full justify-center border-2 border-slate-200 bg-slate-100">
      <div className="grid w-full max-w-7xl grid-cols-3 py-6">
        <div>
          <Image
            src="/logo-nobg.png"
            alt="logo"
            width={100}
            height={100}
            className="size-24"
          />
          <address>
            NMAM Institute of Technology Nitte,
            <br />
            Karkala Taluk,
            <br />
            Udupi - 574110
            <br />
            Karnataka, India
          </address>
        </div>
        <div className="text-md flex flex-col font-medium">
          <h1 className="mb-2 text-lg font-semibold">Quick Links</h1>
          <div className="flex flex-col gap-0">
            <Link
              href={"/"}
              className={`cursor-pointer p-1 ${
                route == "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={"/recommend"}
              className={`cursor-pointer p-1 ${
                route == "/recommend" ? "underline" : ""
              }`}
            >
              Recommendation
            </Link>
            <Link
              href={"/identify"}
              className={`cursor-pointer p-1 ${
                route == "/identify" ? "underline" : ""
              }`}
            >
              Disease Identification
            </Link>
            <Link
              href={"/mitraai"}
              className={`cursor-pointer p-1 ${
                route == "/mitraai" ? "underline" : ""
              }`}
            >
              MitraAI
            </Link>
          </div>
        </div>
        <div>
          <h1 className="mb-2 text-lg font-semibold">Location 📍</h1>
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387144.1403279055!2d74.9550742!3d13.1895242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca9000f3ddf1d%3A0xc8bbea0d3320d66b!2s5XQ4%2BR24%20Bus%20stand%20for%20nitte%20students%20to%20get%20seat%20in%20bus%2C%20Karkala-Padubidri%20Rd%2C%20Nitte%2C%20Karnataka%20574110%2C%20India!5e0!3m2!1sen!2sus!4v1617712400000"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
