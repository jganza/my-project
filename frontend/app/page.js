"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [counselMode, setCounselMode] = useState(true);

  const loadConversations = async () => {
    const res = await fetch(`${API_BASE}/api/conversations`);
    const data = await res.json();
    setConversations(data);
    if (data.length && !activeId) {
      setActiveId(data[0].id);
    }
  };

  const loadMessages = async (conversationId) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    const res = await fetch(`${API_BASE}/api/conversations/${conversationId}/messages`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeId) {
      loadMessages(activeId);
    }
  }, [activeId]);

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId: activeId,
        counselMode
      })
    });

    const data = await res.json();
    setInput("");
    await loadConversations();
    setActiveId(data.conversationId);
    await loadMessages(data.conversationId);
    setLoading(false);
  };

  return (
    <div className="layout">
      <section className="panel">
        <h2 className="section-title">Conversations</h2>
        {conversations.length === 0 && <p>No conversations yet.</p>}
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`conversation-item ${activeId === conversation.id ? "active" : ""}`}
            onClick={() => setActiveId(conversation.id)}
            role="button"
            tabIndex={0}
          >
            <strong>{conversation.title || "Untitled"}</strong>
            <div className="subtitle">
              {new Date(conversation.updatedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="toggle">
          <input
            id="counsel-mode"
            type="checkbox"
            checked={counselMode}
            onChange={(event) => setCounselMode(event.target.checked)}
          />
          <label htmlFor="counsel-mode">Counsel Mode</label>
        </div>

        <div className="chat-window">
          {messages.map((item) => (
            <div key={item.id} className={`message ${item.role}`}>
              {item.content}
            </div>
          ))}
          {loading && <div className="message assistant">Gathering wisdom...</div>}
        </div>

        <div className="chat-input">
          <textarea
            placeholder="Share what is on your heart..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </section>
    </div>
  );
}
