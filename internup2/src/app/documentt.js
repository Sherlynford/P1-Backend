// pages/_app.js
import '../styles/globals.css';
import { GoogleFonts } from 'next/font/google';

const font = GoogleFonts({
  families: {
    'Noto+Sans+Thai': true,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: font }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
