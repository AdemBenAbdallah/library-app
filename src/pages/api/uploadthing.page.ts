import { ourFileRouter } from "@/uploadthing/uploadthing-router";
import { createRouteHandler } from "uploadthing/next-legacy";

export default createRouteHandler({
  router: ourFileRouter,
});
