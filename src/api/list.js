import SteinStore from "stein-js-client";

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list"
);

export const readAllData = params => {
  return store.read("", { ...params });
};

export const addData = data => {
  return store.append("", [{ ...data }]);
};
