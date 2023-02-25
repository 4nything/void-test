import { StylesConfig } from "react-select";

export type Region = 'eu' | "ap" | "na" | "kr" | "latam" | "br";

export const options = [
  { value: "eu", label: "Europe" },
  { value: "ap", label: "Asia" },
  { value: "na", label: "North America" },
  { value: "kr", label: "Korea" },
  { value: "latam", label: "Latam" },
  { value: "br", label: "Brasil" },
];

export const styleOptions: StylesConfig = {
  option: (styles) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    ":hover": { backgroundColor: "#4745c4" },
    ":active": { backgroundColor: "#4745c4" },
    ":focus": { backgroundColor: "#4745c4" },
    "::backdrop": { backgroundColor: "#4745c4" },
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "#262569",
    color: "white",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "#262569",
    color: "white",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
  }),
  container: (styles) => ({
    ...styles,
    width: "300px",
  }),
};