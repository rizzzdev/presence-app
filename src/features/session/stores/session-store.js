import { atom } from "jotai";

export const initialSession = {
  id: "",
  token: "",
  ipAddress: "",
  userAgent: "",
  authId: "",
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const sessionStateAtom = atom(initialSession);
export const sessionsStateAtom = atom([]);
