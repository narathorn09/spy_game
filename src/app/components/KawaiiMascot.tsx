"use client";
import { useState } from "react";

export default function KawaiiMascot() {
  const [jump, setJump] = useState(false);

  const handleClick = () => {
    if (!jump) {
      setJump(true);
      setTimeout(() => setJump(false), 600);
    }
  };

  return (
    <div
      className={`kawaii-mascot fixed bottom-4 right-4 z-50 ${jump ? "jump" : ""}`}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 120 120"
        className="mascot-svg breath bounce"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="head">
          <circle cx="60" cy="60" r="40" className="body" />
          <g className="eyes">
            <ellipse cx="45" cy="55" rx="8" ry="10" className="eye" />
            <ellipse cx="75" cy="55" rx="8" ry="10" className="eye" />
          </g>
          <g className="cheeks">
            <circle cx="45" cy="72" r="5" className="cheek" />
            <circle cx="75" cy="72" r="5" className="cheek" />
          </g>
        </g>
        <circle cx="90" cy="70" r="10" className="hand" />
        <g className="hearts">
          <path
            className="heart"
            d="M60 20c-2-3-6-3-8 0-2 3 0 6 4 9 4-3 6-6 4-9z"
          />
          <path
            className="heart"
            d="M72 14c-2-3-6-3-8 0-2 3 0 6 4 9 4-3 6-6 4-9z"
          />
        </g>
      </svg>
      <style jsx>{`
        .kawaii-mascot {
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        .mascot-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .body {
          fill: #ffd1dc;
          stroke: #ffc4d6;
          stroke-width: 2;
        }
        .eye {
          fill: #222;
        }
        .cheek {
          fill: #ffb3c6;
        }
        .hand {
          fill: #ffd1dc;
          transform-origin: 90px 70px;
        }
        .heart {
          fill: #ff95c8;
          opacity: 0;
        }
        .breath {
          animation: breath 4s ease-in-out infinite;
          transform-origin: 60px 60px;
        }
        .bounce {
          animation: bounce 3s ease-in-out infinite;
        }
        .eyes {
          animation: blink 5s infinite;
          transform-origin: 60px 55px;
        }
        .kawaii-mascot:hover .hand {
          animation: wave 1.2s ease-in-out infinite;
        }
        .kawaii-mascot:hover .head {
          animation: tilt 1.2s ease-in-out infinite alternate;
        }
        .kawaii-mascot:hover .heart {
          animation: float 2s ease-in-out infinite;
          opacity: 1;
        }
        .jump {
          animation: jump 0.6s ease-out;
        }
        @keyframes breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          92% { transform: scaleY(0.1); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(25deg); }
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(8deg); }
        }
        @keyframes jump {
          0% { transform: translateY(0); }
          30% { transform: translateY(-30%); }
          60% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-30px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
