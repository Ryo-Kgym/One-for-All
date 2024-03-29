import type { User } from "@type/user";
import { saveCookie } from "@persistence/browser/client/cookie";

export const saveUser = async (user: User) => {
  saveCookie({ key: "user", value: JSON.stringify(user) });
};
