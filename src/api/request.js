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

export function approveStreaming(roomId, requestId, approve) {
    return apiAdmin.post("/streaming/approve", {
        room_id: roomId,
        request_id: requestId,
        approve: approve
    });
}
