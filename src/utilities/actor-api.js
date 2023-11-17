import sendRequest from "./send-request";
const BASE_URL = "/api/actors";
const SUFFIX = "actorAPI/actors-list.json"

export async function getActorsFromProxy(publicIP) {
    return sendRequest(`${BASE_URL}/${publicIP}${SUFFIX}`);
}