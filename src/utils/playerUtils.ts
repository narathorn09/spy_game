import data from "../json/data.json";

// ตรวจว่าผู้เล่นพร้อมเริ่มหรือยัง
export const isReadyToStart = (players: { name: string; isSpy: boolean; role: string }[]) => {
  return players.length >= 3 && players.every(player => player.name.trim() !== "");
};

// แก้ไขชื่อผู้เล่น
export const handlePlayerChange = (
  players: { name: string; isSpy: boolean; role: string }[],
  index: number,
  value: string,
  setPlayers: (players: { name: string; isSpy: boolean; role: string }[]) => void
) => {
  const updatedPlayers = [...players];
  updatedPlayers[index].name = value;
  setPlayers(updatedPlayers);
};

// เพิ่มผู้เล่น
export const addPlayer = (
  players: { name: string; isSpy: boolean; role: string }[],
  setPlayers: (players: { name: string; isSpy: boolean; role: string }[]) => void
) => {
  setPlayers([...players, { name: "", isSpy: false, role: "" }]);
};

// ลบผู้เล่น
export const removePlayer = (
  players: { name: string; isSpy: boolean; role: string }[],
  index: number,
  setPlayers: (players: { name: string; isSpy: boolean; role: string }[]) => void
) => {
  const updatedPlayers = [...players];
  updatedPlayers.splice(index, 1);
  setPlayers(updatedPlayers);
};

// เริ่มเกม (สุ่ม Spy)
export const startGame = (
  players: { name: string; isSpy: boolean; role: string }[],
  spyNum: number
) => {
  // เซฟ location list ลง localStorage (ครั้งเดียว)
  localStorage.setItem("location", JSON.stringify(data));
  const locationListString = localStorage.getItem("location");
  const locationList = locationListString ? JSON.parse(locationListString) : [];

  // สุ่มสถานที่
  const randomLocationIndex = Math.floor(Math.random() * data.length);
  const selectedLocation = locationList[randomLocationIndex];

  // สุ่ม Spy
  const spyIndexes: number[] = [];
  while (spyIndexes.length < spyNum) {
    const randomIndex = Math.floor(Math.random() * players.length);
    if (!spyIndexes.includes(randomIndex)) {
      spyIndexes.push(randomIndex);
    }
  }

  // สุ่ม Role (ไม่เอาเรียง index)
  const nonSpyPlayers = players.filter((_, index) => !spyIndexes.includes(index));

  // เลือก Role เท่ากับจำนวน non-spy แล้วสับแบบสุ่ม
  const availableRoles = selectedLocation.roles.slice(0, nonSpyPlayers.length);
  const shuffledRoles = availableRoles.sort(() => Math.random() - 0.5);

  const updatedPlayers = players.map((player, index) => {
    if (spyIndexes.includes(index)) {
      return {
        ...player,
        isSpy: true,
        role: "Spy"
      };
    } else {
      const randomRoleIndex = Math.floor(Math.random() * shuffledRoles.length);
      const assignedRole = shuffledRoles.splice(randomRoleIndex, 1)[0]; // เอาแล้วลบออก เพื่อไม่ให้ซ้ำ
      return {
        ...player,
        isSpy: false,
        role: assignedRole
      };
    }
  });

  console.log("🔎 ผู้เล่น:", updatedPlayers);
  console.log("📍 สถานที่:", selectedLocation);

  localStorage.setItem("players", JSON.stringify(updatedPlayers));
  localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
};

