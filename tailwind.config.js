/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "bg-black",
      "bg-skyblue",
      "bg-purple",
      "bg-babyblue",
      "bg-pink",
      "bg-silver",
      "bg-charcoal",
      "bg-rosepink",
      "bg-cobaltblue",
    ],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    lineHeight: {
      none: "1",
      tight: "1.2",
      snug: "1.2",
      normal: "1.2",
      relaxed: "1.2",
      loose: "1.2",
    },
    extend: {
      fontFamily: {
        sans: ["PP Pangram Sans"],
      },
      colors: {
        primary: "#dcdcdc",
        black: "#000000",
        black2: "#191919",
        black3: "#2d2d2d",
        silver: "#c0c0c0",
        white: "#ffffff",
        gray: "#f7f7f7",
        gray2: "#e8e8e8",
        gray3: "#888888",
        grayph: "#8c8c8c",
        graynav: "#eeeeee",
        grayborder: "#f0f0f0",
        grayborder2: "#f2f2f2",
        grayhborder: "#e8e8e8",
        bg: "#f0ece1",
        detailbg: "#f6f6f6",
        name: "#333333",
        bgpink: "#fecad6",
        pink: "#edbad2",
        green: "#21a664",
        lightgreen: "#baef80",
        blue: "#2c5dab",
        blue2: "#2a5ea5",
        babyblue: "#83daef",
        sky: "#dfe7f2",
        skyblue: "#83daef",
        purple: "#c77ee1",
        orange: "#f15b41",
        orangebanner: "#FB5B48",
        yellow: "#f6e163",
        charcoal: "#4b4846",
        rosepink: "#d4abab",
        cobaltblue:"#2d59c5"
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      borderRadius: px0_100,
      animation: {
        shake: "shake 0.15s linear",
        // <<< 지혜 / 추가 : 헤더 베너 >>>
        "slide-left-fade": "slideLeftFade 12s ease-in-out infinite",
        "slide-right-fade": "slideRightFade 12s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-10px)" },
        },
        // <<< 지혜 / 추가 : 헤더 베너 >>>
        slideLeftFade: {
          "0%": { transform: "translateX(-1200%)" },
          "20%": { transform: "translateX(0)" },
          "80%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-1200%)" },
        },
        slideRightFade: {
          "0%": { transform: "translateX(1200%)" },
          "20%": { transform: "translateX(0)" },
          "80%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(1200%)" },
        },
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
