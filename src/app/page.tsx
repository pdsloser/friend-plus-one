import Image from "next/image";
import Link from "next/link";

import { EventCard } from "@/components/events/event-card";
import { getFeaturedPublicEventCards } from "@/server/queries/public-events";

export default async function HomePage() {
  const featured = await getFeaturedPublicEventCards();
  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>六個人，從共同領域開始認識。</h1>
          <p>每場固定六人，圍繞一個產業或工作主題進行交流。活動以邀請制為主，並視場次開放少量申請名額。</p>
          <Link className="button" href="/events">查看活動</Link>
        </div>
        <Image src="/assets/brand/friend-plus-one.svg" alt="朋友加一品牌主視覺" width={724} height={543} priority />
      </section>
      <section className="section"><h2>目前開放申請</h2><div className="event-grid">{featured.openForApplication.map((event) => <EventCard event={event} key={event.slug} />)}</div></section>
      <section className="section"><h2>即將舉辦</h2><div className="event-grid">{featured.upcoming.map((event) => <EventCard event={event} key={event.slug} />)}</div></section>
      <section className="section"><h2>活動如何進行</h2><p className="lede">不需要準備簡報，也不要求依序回答制式問題。主題只是聊天的起點，現場可以自然延伸。</p></section>
    </main>
  );
}
