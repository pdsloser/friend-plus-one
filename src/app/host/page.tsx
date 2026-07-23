import Link from "next/link";
const hostCards = ["待開始審核的申請", "審核中的申請", "等待回覆邀請", "即將到期邀請", "錄取後等待確認", "已釋出的席位", "候補提醒", "被退回的活動", "即將舉辦活動"];
export default function HostDashboardPage() { return <main className="page"><section className="section"><h1>主辦人後台</h1><p className="lede">主辦人可管理自己的活動、申請、邀請、候補、場地與出席紀錄。</p><Link className="button" href="/host/events/new">建立活動</Link><div className="event-grid">{hostCards.map((card) => <article className="event-card" key={card}><h2>{card}</h2><p>目前沒有待處理項目。</p></article>)}</div></section></main>; }
