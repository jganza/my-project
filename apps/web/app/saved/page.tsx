const saved = [
  {
    reference: "Psalm 23:1-6",
    translation: "WEB",
    note: "Strength for anxious days"
  }
];

export default function SavedPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Saved Scriptures</h1>
        <p className="text-sm text-slate-300">Bookmarks you can return to anytime.</p>
      </header>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        {saved.map((item) => (
          <div key={item.reference} className="rounded border border-slate-800 bg-slate-950/60 p-4">
            <div className="text-sm font-semibold">{item.reference}</div>
            <div className="text-xs text-slate-400">{item.translation}</div>
            <div className="mt-2 text-sm text-slate-300">{item.note}</div>
          </div>
        ))}
        <button className="rounded border border-slate-700 px-4 py-2">Add scripture</button>
      </div>
    </section>
  );
}
