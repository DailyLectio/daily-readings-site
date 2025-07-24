// app/layout.js
import "./globals.css";

export const metadata = {
  title: "FaithLinks | Daily Catholic Reflection",
  description: "Daily scripture readings, reflections, and prayers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
