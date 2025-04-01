/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require("nativewind/preset")],
	theme: {
		extend: {
            colors: {
                primary: '#53B175',
                lightwhite: '#fcfcfc',
                grayy: '#7c7c7c'
            },
            fontFamily: {
                regular: ['Gilroy-Regular', 'sans-serif'],
                bold: ['Gilroy-Bold', 'sans-serif'],
                semibold: ['Gilroy-Semibold', 'sans-serif'],
            }
        },
	},
	plugins: [],
};
