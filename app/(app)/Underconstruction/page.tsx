import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UnderConstruction = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center gap-8 py-24 lg:py-6">
        <Image
          src="/underconstruction.svg"
          alt="Under Construction"
          width={300}
          height={300}
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[400px]"
          style={{ objectFit: "contain" }}
        />
        <h2 className=" text-3xl font-bold sm:text-4xl md:text-4xl lg:text-5xl">
          Under Construction
        </h2>
        <p className="text-zinc-400 text-md text-center sm:text-xl md:text-xl lg:text-2xl">
          This page is currently under construction and will be available soon.
        </p>
        <Link href="/board" className="text-primary">
          <Button variant="outline" className="text-primary">
           Go Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
