'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './dashboard.module.css';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const STAND_CRIES = ['ORA ORA ORA!', 'MUDA MUDA!', 'URYYYYY!', 'DORA DORA!', 'ARRIVEDERCI!'];
const AVATARS = ['#f5c518', '#ff2d95', '#19e6c8', '#ff7a18', '#c084fc', '#f5c518'];

interface Session {
  id: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Ayer';
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function groupSessions(sessions: Session[]) {
  const now = new Date();
  const groups: Record<string, Session[]> = {};
  sessions.forEach(s => {
    const d = new Date(s.updated_at);
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
    const label = diff === 0 ? 'Hoy' : diff === 1 ? 'Ayer' : diff < 7 ? 'Esta semana' : 'Anterior';
    (groups[label] = groups[label] || []).push(s);
  });
  return groups;
}

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API}/sessions`)
      .then(r => r.json())
      .then(data => {
        setSessions(data);
        if (data.length > 0) setActiveId(data[0].id);
      })
      .catch(console.error)
      .finally(() => setLoadingSessions(false));
  }, []);

  useEffect(() => {
    if (!activeId) return;
    setLoadingMessages(true);
    fetch(`${API}/history/${activeId}`)
      .then(r => r.json())
      .then(setMessages)
      .catch(console.error)
      .finally(() => setLoadingMessages(false));
  }, [activeId]);

  const filtered = useMemo(() =>
    sessions.filter(s => s.id.toLowerCase().includes(search.toLowerCase())),
    [sessions, search]
  );

  const grouped = useMemo(() => groupSessions(filtered), [filtered]);

  const activeSession = sessions.find(s => s.id === activeId);
  const sessionIndex = sessions.findIndex(s => s.id === activeId);
  const avatarColor = AVATARS[sessionIndex % AVATARS.length];

  return (
    <div className={styles.page}>
      {/* Drifting menacing background */}
      <div className={styles.menacing} aria-hidden>
        {[0,1,2,3,4].map(i => (
          <span
            key={i}
            className={styles.menacingSpan}
            style={{
              left: `${10 + i * 19}%`,
              fontSize: `${24 + (i * 7) % 14}px`,
              opacity: 0.08 + ((i * 13) % 7) / 100,
              animationDuration: `${24 + i * 3}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            ゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴゴ
          </span>
        ))}
      </div>

      <div className={styles.app}>
        {/* ===== Sidebar ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.brand}>
              <div className={styles.brandMark}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div className={styles.brandName}>BIZARRE&nbsp;CHAT</div>
                <div className={styles.brandOrg}>Passione · Stand Support</div>
              </div>
            </div>
          </div>

          <div className={styles.search}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Buscar sesión..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.sessionList}>
            {loadingSessions ? (
              <div className={styles.loading}>
                <span>CARGANDO STANDS...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '24px 8px', color: 'var(--text-3)', fontSize: 13, textAlign: 'center' }}>
                Sin sesiones
              </div>
            ) : (
              Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <div className={styles.groupTitle}>{group}</div>
                  {items.map((s, i) => {
                    const color = AVATARS[sessions.indexOf(s) % AVATARS.length];
                    const initials = s.id.slice(0, 2).toUpperCase();
                    return (
                      <div
                        key={s.id}
                        className={`${styles.session} ${s.id === activeId ? styles.sessionActive : ''}`}
                        onClick={() => setActiveId(s.id)}
                      >
                        <div className={styles.avatar} style={{ background: color, color: color === '#f5c518' || color === '#19e6c8' ? '#0a0410' : '#fff7df' }}>
                          {initials}
                        </div>
                        <div className={styles.sMeta}>
                          <div className={styles.sTop}>
                            <div className={styles.sTitle}>
                              Sesión #{s.id.slice(0, 8)}
                            </div>
                            <div className={styles.sTime}>{formatTime(s.updated_at)}</div>
                          </div>
                          <div className={styles.sPreview}>
                            {new Date(s.created_at).toLocaleDateString('es-MX', { dateStyle: 'medium' })}
                          </div>
                        </div>
                        <div className={styles.badgeEmpty} />
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.me}>BC</div>
            <div className={styles.meMeta}>
              <div className={styles.meName}>Bizarre Chat</div>
              <div className={styles.meStatus}>
                <span className={styles.dot}/>
                Stand Online
              </div>
            </div>
          </div>
        </aside>

        {/* ===== Main ===== */}
        <main className={styles.main}>
          {/* Header */}
          <div className={styles.chatHeader}>
            {activeSession ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className={styles.avatar} style={{ width: 44, height: 44, fontSize: 16, background: avatarColor, color: avatarColor === '#f5c518' || avatarColor === '#19e6c8' ? '#0a0410' : '#fff7df' }}>
                    {activeSession.id.slice(0,2).toUpperCase()}
                  </div>
                  <div className={styles.chatIdMeta}>
                    <h2>Sesión #{activeSession.id.slice(0, 8)}</h2>
                    <div className={styles.chatSub}>
                      <span>ID: {activeSession.id}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--jojo-display)', fontSize: 12, letterSpacing: '0.14em', color: 'var(--gold)', border: '1px solid var(--gold-line)', padding: '4px 10px' }}>
                    {messages.length} MENSAJES
                  </span>
                </div>
              </>
            ) : (
              <div style={{ fontFamily: 'var(--jojo-display)', fontSize: 18, letterSpacing: '0.12em', color: 'var(--text-3)' }}>
                Selecciona una sesión
              </div>
            )}
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {!activeId ? (
              <div className={styles.empty}>
                <span>ゴゴゴ</span>
                <span>SELECCIONA UNA SESIÓN</span>
                <span className={styles.emptyMono}>← elige del panel izquierdo</span>
              </div>
            ) : loadingMessages ? (
              <div className={styles.loading}>Stand activándose...</div>
            ) : messages.length === 0 ? (
              <div className={styles.empty}>
                <span>Sin mensajes</span>
                <span className={styles.emptyMono}>Esta sesión está vacía</span>
              </div>
            ) : (
              <>
                <div className={styles.dayDivider}>
                  {new Date(messages[0].created_at).toLocaleDateString('es-MX', { dateStyle: 'long' })}
                </div>
                {messages.map((m, i) => {
                  const isUser = m.role === 'user';
                  const cry = !isUser && i % 3 === 0 ? STAND_CRIES[i % STAND_CRIES.length] : undefined;
                  return (
                    <div key={m.id} className={`${styles.msg} ${isUser ? styles.msgUser : ''}`}>
                      <div
                        className={`${styles.msgAv} ${!isUser ? styles.msgAvAssistant : ''}`}
                        style={{ background: isUser ? avatarColor : '#ff2d95', color: isUser && (avatarColor === '#f5c518' || avatarColor === '#19e6c8') ? '#0a0410' : '#fff7df' }}
                      >
                        {isUser ? 'TÚ' : 'AI'}
                      </div>
                      <div className={`${styles.msgCol} ${isUser ? styles.msgColUser : ''}`}>
                        {cry && <div className={`${styles.cry} ${isUser ? styles.cryUser : ''}`}>{cry}</div>}
                        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : ''}`}>
                          {m.content}
                        </div>
                        <div className={`${styles.msgMeta} ${isUser ? styles.msgMetaUser : ''}`}>
                          <span style={{ color: 'var(--text-0)' }}>{isUser ? 'TÚ' : 'ASISTENTE'}</span>
                          <span>·</span>
                          <span>{new Date(m.created_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}