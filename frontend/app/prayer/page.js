"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function PrayerJournalPage() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const loadEntries = async () => {
    const res = await fetch(`${API_BASE}/api/journal`);
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const saveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
    setSaving(true);
    await fetch(`${API_BASE}/api/journal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    setTitle("");
    setContent("");
    await loadEntries();
    setSaving(false);
  };

  return (
    <div className="layout">
      <section className="panel">
        <h2 className="section-title">Prayer & Journal</h2>
        <div className="input-grid">
          <input
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            rows={6}
            placeholder="Write your prayer, reflection, or gratitude..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button onClick={saveEntry} disabled={saving}>
            Save Entry
          </button>
        </div>
      </section>

      <section className="panel">
        <h2 className="section-title">Recent Entries</h2>
        {entries.length === 0 && <p>No entries yet.</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="journal-entry">
            <strong>{entry.title}</strong>
            <div className="subtitle">
              {new Date(entry.createdAt).toLocaleString()}
            </div>
            <p>{entry.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
