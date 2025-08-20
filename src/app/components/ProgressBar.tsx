"use client";

interface Props {
  value: number; // 0-100
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full bg-gray-200 h-1">
      <div
        className="h-full bg-pink-500 transition-all duration-200"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
