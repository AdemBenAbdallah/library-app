import { SimpleRolesIsAuthorized } from "@blitzjs/auth";
import { RoleType, User } from "db";
import { PropsWithChildren } from "react";

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<RoleType>;
    PublicData: {
      userId: User["id"];
      role: RoleType;
    };
  }
}

export type ReactFC<T> = React.FC<PropsWithChildren & T>;
