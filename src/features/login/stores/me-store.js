import { atom } from "jotai";
import { initialSession } from "~/features/session/stores/session-store";
import { initialTeacher } from "~/features/teacher/stores/teacher-store";

export const initialMe = {
  isAuthenticated: false,
  mySession: initialSession,
  myTeacher: initialTeacher,
  isLoading: true,
};

export const meAtom = atom(initialMe);
