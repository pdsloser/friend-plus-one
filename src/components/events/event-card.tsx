import Image from "next/image";
import Link from "next/link";

import { formatTaipeiMonthDay } from "@/lib/dates/format";
import type { PublicEventSummary } from "@/types/events";

export function EventCard({ event }: { event: PublicEventSummary }) {
  return (
    <article className="event-card">
      <Image className="event-cover" src={event.coverImageUrl} alt={event.title} width={640} height={480} />
      <div className="tag-list"><span className="tag">{event.categoryName}</span>{event.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <h3>{event.title}</h3>
      <div className="meta"><span>{formatTaipeiMonthDay(event.startsAt)}</span><span>{event.city} {event.district}</span><span>{event.confirmedSeatCount}/{event.seatCount} 席</span></div>
      <p>{event.summary}</p>
      <Link className="button secondary" href={`/events/${event.slug}`}>查看活動</Link>
    </article>
  );
}
