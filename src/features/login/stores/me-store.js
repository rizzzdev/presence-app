import { atom } from "jotai";
import { initialSession } from "~/features/session/stores/session-store";
import { initialTeacher } from "~/features/teacher/stores/teacher-store";

export const initialMe = {
  session: initialSession,
  teacher: initialTeacher,
  accessToken: null,
};

export const meStateAtom = atom(initialMe);
