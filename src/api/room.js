import { apiAuth } from '@/api';

function haveRoom(roomName) {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    return storedRooms && storedRooms.filter(room => room.room_name === roomName).length > 0;
}

export function getRoomInfo(roomId) {
    // return apiAuth.get(`/room`, {
    //     params: { room_id: roomId }
    // });
    return new Promise((resolve, reject) => {
        if (haveRoom(roomId)) {
            resolve({
                room_id: "room_id",
                room_name: "room_name",
                socket_addr: "websocket server address",
                is_admin: false,
            });
        } else {
            reject({
                message: "会议室不存在"
            });
        }
    });
}

export function createRoom(roomName) {
    // return apiAuth.post(`/room`, {
    //     room_name: roomName
    // });
    return new Promise((resolve, reject) => {
        const storedRooms = JSON.parse(localStorage.getItem("rooms"));
        if (storedRooms && storedRooms.filter(room => room.room_name === roomName).length > 0) {
            reject({
                message: "会议室名已存在"
            });
        } else {
            const newRoom = {
                room_id: "room_id",
                room_name: roomName,
                socket_addr: "websocket server address",
                is_admin: true,
            };
            if (storedRooms) {
                storedRooms.push(newRoom);
                localStorage.setItem("rooms", JSON.stringify(storedRooms));
            } else {
                localStorage.setItem("rooms", JSON.stringify([newRoom]));
            }
            resolve(newRoom);
        }
    });
}
