import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { SeatList } from "@/components/events/seat-list";
import { formatTaipeiDateTime } from "@/lib/dates/format";
import { getPublicEventDetail } from "@/server/queries/public-events";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEventDetail(slug);
  return event ? { title: `${event.title} | 朋友加一：6人聚`, description: event.summary, openGraph: { title: event.title, description: event.summary, images: [event.coverImageUrl] } } : { title: "找不到活動 | 朋友加一：6人聚" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getPublicEventDetail(slug);
  if (!event) notFound();
  return <main className="page"><section className="section detail-layout"><article><Image className="event-cover" src={event.coverImageUrl} alt={event.title} width={960} height={720} priority /><div className="tag-list"><span className="tag">{event.categoryName}</span>{event.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><h1>{event.title}</h1><p className="lede">{event.summary}</p><p>{formatTaipeiDateTime(event.startsAt)}，{event.city}{event.district}</p><h2>活動介紹</h2><p>{event.description}</p><h2>交流方向</h2><p>{event.discussionDirection}</p><h2>話題起點</h2><ul>{event.topicPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul><h2>適合參加者</h2><p>{event.suitableFor}</p><h2>費用與低消</h2><p>{event.feeNote}</p>{event.minimumSpendNote ? <p>{event.minimumSpendNote}</p> : null}</article><aside><h2>主辦人</h2><p><strong>{event.host.displayName}</strong><br />{event.host.backgroundTitle}</p><p>{event.host.bio}</p><h2>本場六席</h2><SeatList seats={event.seats} /><Link className="button" href={`/login?next=/events/${event.slug}`}>申請或候補</Link></aside></section></main>;
}
