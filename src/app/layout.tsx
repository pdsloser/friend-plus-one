import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "朋友加一：6人聚",
  description: "六個人，從共同領域開始認識。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body>
        <header className="site-header">
          <Link className="brand-link" href="/">
            <Image
              className="brand-logo"
              src="/assets/brand/logo.svg"
              alt="朋友加一"
              width={137}
              height={40}
              priority
            />
          </Link>
          <nav aria-label="主要導覽">
            <Link href="/events">活動列表</Link>
            <Link href="/about">關於</Link>
            <Link href="/login">登入</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>活動本身不收費，參加者僅需負擔自己的餐飲或咖啡廳低消。</span>
          <span>
            <Link href="/privacy">隱私權政策</Link>
            <Link href="/terms">使用條款</Link>
          </span>
        </footer>
      </body>
    </html>
  );
}
