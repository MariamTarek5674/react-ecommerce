import React from 'react'

export default function RatingStar({productRate}) {
  return (
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            let width = "0%";
    
            if (starNumber <= Math.floor(productRate)) {
              width = "100%";
            } else if (starNumber === Math.ceil(productRate) && !Number.isInteger(productRate)) {
              width = "50%";
            }
    
            return (
              <div key={starNumber} className="relative text-sm">
                <span className="text-gray-300">★</span>
                <span
                  className="absolute top-0 left-0 text-yellow-400 overflow-hidden h-full"
                  style={{ width }}
                >
                  ★
                </span>
              </div>
            );
          })}
        </div>
      );
}
