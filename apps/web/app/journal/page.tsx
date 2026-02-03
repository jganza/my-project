const entries = [
  {
    title: "Morning prayer",
    date: "Today",
    excerpt: "Lord, give me wisdom for the decisions ahead..."
  }
];

export default function JournalPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Prayer & Journal</h1>
        <p className="text-sm text-slate-300">Your private reflections and prayers are stored securely.</p>
      </header>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        {entries.map((entry) => (
          <div key={entry.title} className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-semibold">{entry.title}</h3>
            <p className="text-xs text-slate-400">{entry.date}</p>
            <p className="mt-2 text-sm text-slate-300">{entry.excerpt}</p>
          </div>
        ))}
        <button className="rounded bg-slate-100 px-4 py-2 text-slate-900">New entry</button>
      </div>
    </section>
  );
}
