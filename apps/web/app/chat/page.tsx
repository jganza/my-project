const sampleMessages = [
  {
    role: "assistant",
    content:
      "Scripture calls us to trust the Lord in both joy and sorrow. Hold fast to the promise of His presence, and let wisdom guide each step.",
    citations: ["John 3:16 (WEB)", "Psalm 23:1-4 (WEB)"]
  },
  {
    role: "user",
    content: "I feel overwhelmed. What should I do?"
  }
];

export default function ChatPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Chat with ADONAI</h1>
        <p className="text-sm text-slate-300">
          Scripture-rooted counsel. Verbatim quotes are only included when retrieved from the stored Bible dataset.
        </p>
      </header>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        {sampleMessages.map((message, index) => (
          <div key={index} className="space-y-2">
            <div className="text-xs uppercase tracking-wide text-slate-500">{message.role}</div>
            <div className="rounded border border-slate-800 bg-slate-950/60 p-4 text-sm">
              {message.content}
            </div>
            {message.citations ? (
              <div className="text-xs text-slate-400">Citations: {message.citations.join(", ")}</div>
            ) : null}
          </div>
        ))}
      </div>
      <form className="flex gap-3">
        <input
          className="flex-1 rounded border border-slate-700 bg-slate-950 px-3 py-2"
          placeholder="Share what you're facing..."
        />
        <button className="rounded bg-slate-100 px-4 py-2 text-slate-900" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
