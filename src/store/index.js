import { init } from "@rematch/core";
import user from "@/models/user";
import room from "@/models/room";

const store = init({
    models: {
        user, room
    }
});

export default store;
