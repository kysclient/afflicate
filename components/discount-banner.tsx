"use client";

import { useState, useEffect } from "react";

export function DiscountBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">🔥 오늘만 특가!</div>
          <div className="text-lg">최대 85% 할인 마감임박</div>
        </div>
        <div className="flex items-center space-x-2 bg-black/20 rounded-lg px-4 py-2">
          <span className="text-sm">남은시간:</span>
          <div className="flex space-x-1">
            <div className="bg-white text-red-500 px-2 py-1 rounded font-bold text-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="bg-white text-red-500 px-2 py-1 rounded font-bold text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="bg-white text-red-500 px-2 py-1 rounded font-bold text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
