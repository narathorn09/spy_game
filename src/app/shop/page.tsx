"use client";

import BottomNav from "../components/BottomNav";

const items = [
  { name: "Pink Hat", price: "$1" },
  { name: "Cool Shades", price: "$2" },
  { name: "Spy Coat", price: "$3" },
  { name: "Cute Boots", price: "$4" },
  { name: "Secret Map", price: "$5" },
  { name: "Bunny Ears", price: "$6" },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen pb-16 bg-gray-50 p-4 text-gray-800">
      <h1 className="text-xl mb-4">Shop</h1>
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        {items.map((item) => (
          <div key={item.name} className="bg-white p-2 rounded-xl shadow">
            <div className="h-12 bg-gray-50 rounded mb-2"></div>
            <div>{item.name}</div>
            <div className="text-pink-500">{item.price}</div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
