export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h1 className="text-2xl font-semibold">Sign in to ADONAI.AI</h1>
        <p className="mt-2 text-sm text-slate-300">
          Authentication is required before chat. Use email/password or an OAuth provider configured in Supabase.
        </p>
        <form className="mt-6 space-y-4">
          <label className="block text-sm">
            Email
            <input
              className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
              type="password"
              placeholder="••••••••"
            />
          </label>
          <button className="w-full rounded bg-slate-100 px-4 py-2 text-slate-900" type="submit">
            Sign in
          </button>
        </form>
        <div className="mt-6 space-y-3">
          <button className="w-full rounded border border-slate-700 px-4 py-2">Continue with Google</button>
          <button className="w-full rounded border border-slate-700 px-4 py-2">Continue with Apple</button>
        </div>
      </div>
    </section>
  );
}
