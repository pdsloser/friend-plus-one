import type { EventSeat } from "@/types/events";

function describeSeat(seat: EventSeat) {
  if (seat.seatStatus === "invitation_pending") return "邀請席";
  if (!seat.participant) return seat.displayLabel;
  if (seat.participant.visibility === "hidden") return "已確認來賓";
  if (seat.participant.visibility === "background_only") return seat.participant.backgroundTitle ?? "已確認來賓";
  return seat.participant.displayName ?? seat.participant.backgroundTitle ?? "已確認來賓";
}

export function SeatList({ seats }: { seats: EventSeat[] }) {
  return <div className="seat-list">{seats.map((seat) => <article className="seat" key={seat.seatNumber}><strong>{seat.seatNumber} 號席：{describeSeat(seat)}</strong><div className="seat-meta"><span>{seat.displayLabel}</span><span>{seat.seatStatus === "confirmed" ? "已確認" : "尚未確認"}</span></div>{seat.participant?.visibility === "profile" && seat.participant.bio ? <p>{seat.participant.bio}</p> : null}</article>)}</div>;
}
