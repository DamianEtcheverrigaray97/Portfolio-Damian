import React from "react";
import { MdArrowOutward, MdSend } from "react-icons/md";
import clsx from "clsx";

type ButtonProps = {
  label: string;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function ButtonSimple({
  label,
  showIcon = true,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        className
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0"
        )}
      />
      <span className="relative flex items-center justify-center gap-2 text-xl"> {/* Ajuste de tamaño de texto */}
        {label} {showIcon && <MdSend className="inline-block" />}
      </span>
    </button>
  );
}
