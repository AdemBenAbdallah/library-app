import { rpcHandler } from "@blitzjs/rpc";
import { api } from "src/blitz-server";

export default api(
  rpcHandler({
    // formatError: errorFormater,
    onError: console.log,
  })
);
