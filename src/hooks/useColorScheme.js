import { useMemo } from "react";

export default function useColorScheme() {
  const colorSchemes = useMemo(() => [
    { bg: "bg-green", text: "text-black" },
    { bg: "bg-blue", text: "text-white" },
    { bg: "bg-orange", text: "text-black" },
    { bg: "bg-yellow", text: "text-black" },
    { bg: "bg-pink", text: "text-black" }
  ], []);

  const getColorScheme = (index) => {
    return colorSchemes[index % colorSchemes.length];
  };

  return getColorScheme;
}
