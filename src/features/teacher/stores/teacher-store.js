import { atom } from "jotai";

export const initialAuth = {
  id: "",
  email: "",
  role: "USER",
  teacherId: "",
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const initialTeacher = {
  id: "",
  name: "",
  prefixTitle: null,
  suffixTitle: null,
  picketDay: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const teacherStateAtom = atom({ ...initialTeacher, auth: initialAuth });
export const teachersStateAtom = atom([]);
