import { apiAuth, apiAdmin } from "@/api"

export function requestStreaming(roomId) {
    return apiAuth.post("/streaming/request", {
        room_id: roomId
    });
}

export function cancelStreaming(roomId) {
    return apiAuth.delete("/streaming/request", {
        room_id: roomId
    });
}

export function approveStreaming(roomId, requestId) {
    return apiAdmin.post("/streaming/approve", {
        room_id: roomId,
        request_id: requestId,
        approve: true
    });
}

export function rejectStreaming(roomId, requestId) {
    return apiAdmin.post("/streaming/approve", {
        room_id: roomId,
        request_id: requestId,
        approve: false
    });
}
