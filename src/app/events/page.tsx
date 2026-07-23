import { EventCard } from "@/components/events/event-card";
import { listPublicEventCards } from "@/server/queries/public-events";

const categories = [ { name: "全部", slug: "" }, { name: "數位遊戲", slug: "digital-games" }, { name: "VTuber", slug: "vtuber" }, { name: "出版與內容", slug: "publishing-content" }, { name: "活動企劃", slug: "event-planning" }, { name: "自由工作者", slug: "freelancers" }, { name: "插畫與視覺創作", slug: "illustration-visual" }, { name: "其他", slug: "other" } ];

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const events = await listPublicEventCards(category);
  return <main className="page"><section className="section"><h1>活動列表</h1><p className="lede">第一版提供分類篩選，不提供關鍵字搜尋。</p><div className="tabs" aria-label="分類">{categories.map((item) => <a href={item.slug ? `/events?category=${item.slug}` : "/events"} key={item.slug || "all"}>{item.name}</a>)}</div><div className="event-grid">{events.map((event) => <EventCard event={event} key={event.slug} />)}</div></section></main>;
}
