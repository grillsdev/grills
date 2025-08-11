import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* Simple Analytics Script */}
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        data-collect-dnt="true"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
