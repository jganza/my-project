export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
        <h1 className="text-3xl font-semibold">Welcome to ADONAI.AI</h1>
        <p className="mt-3 text-slate-300">
          A Biblical wisdom guide rooted in Protestant–Evangelical Christianity. Scripture is the authority,
          and Christ is the center. Begin by signing in, then open a chat to seek counsel.
        </p>
        <div className="mt-6 flex gap-4">
          <a className="rounded bg-slate-100 px-4 py-2 text-slate-900" href="/login">
            Sign in
          </a>
          <a className="rounded border border-slate-700 px-4 py-2" href="/chat">
            Go to chat
          </a>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Scripture-first counsel",
            description: "Every response is anchored in the Word, with references and verified quotations."
          },
          {
            title: "Private journal & prayer",
            description: "Keep personal reflections and prayers secure in your account."
          },
          {
            title: "Saved scriptures",
            description: "Bookmark verses for meditation and quick access later."
          }
        ].map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
