import { apiAuth, apiAdmin } from "@/api"

const debug = false;

export function requestStreaming(roomId) {
    if (debug) {
        return new Promise((resolve, reject) => {
            resolve({
                message: "请求成功"
            });
        });
    } else {
        return apiAuth.post("/streaming/request", {
            room_id: roomId
        });
    }
}

export function cancelRequest(roomId) {
    if (debug) {
        return new Promise((resolve, reject) => {
            resolve({
                message: "取消成功"
            });
        });
    } else {
        return apiAuth.delete("/streaming/request", {
            room_id: roomId
        });
    }
}

export function approveStreaming(roomId, requestId, approve) {
    if (debug) {
        return new Promise((resolve, reject) => {
            resolve({
                message: "处理成功"
            });
        })
    } else {
        return apiAdmin.post("/streaming/approve", {
            room_id: roomId,
            request_id: requestId,
            approve: approve
        });
    }
}
