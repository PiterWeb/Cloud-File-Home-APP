import { writable } from "svelte/store";
import { Storage } from "@capacitor/storage";

export const ip = writable(null);
export const port = writable(null);

const checkIP = async () => {
    const { value } = await Storage.get({ key: "ip" });
    if (value !== null) {
      ip.set(value);
    }
    return;
  };
  
  const checkPort = async () => {
    const { value } = await Storage.get({ key: "port" });
    if (value !== null) {
      port.set(value);
    }
    return;
  };

checkIP();
checkPort();

ip.subscribe((value) => {
    if (value !== null) {
      Storage.set({
        key: "ip",
        value: value,
      });
    }
});

port.subscribe((value) => {
  if (value !== null) {
    Storage.set({
      key: "port",
      value: value,
    });
  }
});
