export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-300">Customize translation and quote preferences.</p>
      </header>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Translation</label>
          <select className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2">
            <option>WEB</option>
          </select>
          <p className="text-xs text-slate-400">
            Additional translations can be enabled once licensed. WEB is the default public-domain option.
          </p>
        </div>
        <div className="flex items-center justify-between rounded border border-slate-800 bg-slate-950/50 px-4 py-3">
          <div>
            <div className="text-sm font-semibold">Quote verses verbatim</div>
            <div className="text-xs text-slate-400">Only from stored Bible data.</div>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
