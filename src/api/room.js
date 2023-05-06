import { apiAuth } from '@/api';

const debug = true

function getRoom(roomId) {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    if (storedRooms) {
        return storedRooms[roomId];
    } else {
        return null;
    }
}

function generateRoomId() {
    return String(Math.floor(Math.random() * 1000000000));
}

export function getRoomInfo(roomId) {
    if (debug) {
        return new Promise((resolve, reject) => {
            const room = getRoom(roomId);
            if (room) {
                resolve(room);
            } else {
                reject({
                    message: "会议室不存在"
                });
            }
        });
    } else {
        return apiAuth.get("/room", {
            params: { room_id: roomId }
        });
    }
}

export function createRoom(roomName) {
    if (debug) {
        return new Promise((resolve, reject) => {
            const newRoom = {
                room_id: generateRoomId(),
                room_name: roomName,
                socket_addr: "websocket server address",
                creator: "admin",
                is_admin: true,
            }
            const storedRooms = JSON.parse(localStorage.getItem("rooms"));
            localStorage.setItem("rooms", JSON.stringify({
                ...storedRooms,
                [newRoom.room_id]: newRoom
            }));
            resolve(newRoom);
        });
    } else {
        return apiAuth.post("/room", {
            room_name: roomName
        });
    }
}
