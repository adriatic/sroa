'use client';

import { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const emails = [
  {
    id: 0, priority: 'stat', badge: 'STAT',
    sender: 'Dr. James Okafor', org: 'SeaWorld San Diego',
    subject: 'URGENT — Pacific white-sided dolphin, acute respiratory distress',
    time: '7:12 AM',
    body: `Dr. Ivančić,

We have a 14-year-old female Pacific white-sided dolphin presenting with acute respiratory distress since approximately 0400. She is febrile (38.9°C), showing increased respiratory effort and is off-feed. We've already pulled bloods and started empirical ABx.

Can you read chest rads STAT? I'm uploading DICOMs now to the portal. We may be looking at aspiration pneumonia vs fungal vs mass lesion — need your eyes on this before we proceed with bronchoscopy.

Calling you in 15 minutes if no reply.

— James Okafor, DVM
Chief Veterinarian, SeaWorld San Diego`,
    draft: `Dr. Okafor,

I have the DICOMs — reviewing now. Will have preliminary findings to you within 20 minutes. Please proceed with bronchoscopy prep in parallel; I'll call you directly before you go in.

Standing by.

Dr. Marina Ivančić
ZooRadOne`
  },
  {
    id: 1, priority: 'p1', badge: 'P1 — same day',
    sender: 'Dr. Yuki Tanaka', org: 'Monterey Bay Aquarium',
    subject: 'Report amendment request — sea otter case #2026-0441',
    time: '8:31 AM',
    body: `Dr. Ivančić,

Following up on case #2026-0441 (southern sea otter, 6F). Your report dated May 14 references the right forelimb but the clinical team believes this should read left forelimb based on positioning notes in the record.

Could you review and issue an amended report if appropriate? Patient is scheduled for surgery Thursday and we want the record corrected beforehand.

Thank you,
Yuki Tanaka, DVM
Monterey Bay Aquarium Research Institute`,
    draft: `Dr. Tanaka,

Thank you for flagging this. I've pulled the original series and positioning documentation. You are correct — the finding involves the left forelimb. An amended report will be issued today with the correction noted per standard protocol.

I'll have it to you by end of business.

Dr. Marina Ivančić
ZooRadOne`
  },
  {
    id: 2, priority: 'p1', badge: 'P1 — same day',
    sender: 'Dr. Priya Mehta', org: 'Shedd Aquarium',
    subject: 'New referral — beluga whale, suspected pulmonary lesion',
    time: '9:01 AM',
    body: `Hello Dr. Ivančić,

We have a 22-year-old male beluga presenting with a subtle opacity on recent thoracic ultrasound that the attending would like formally characterized. Patient is otherwise BAR, eating well, no fever.

We'd like to submit for teleradiology review. Can you confirm current turnaround and preferred DICOM submission method?

Best,
Priya Mehta, DVM
Staff Veterinarian, Shedd Aquarium`,
    draft: `Dr. Mehta,

Happy to help with this case. Current turnaround for non-urgent referrals is 24–48 hours. Please submit DICOMs through the portal at sroa.site — I'll receive notification automatically on upload.

For belugas I typically want: bilateral thoracic views, both in inspiration and expiration if possible, plus any US images you have. Looking forward to the case.

Dr. Marina Ivančić
ZooRadOne`
  },
  {
    id: 3, priority: 'p2', badge: 'P2 — routine',
    sender: 'Dr. Carlos Reyes', org: 'Dallas Zoo',
    subject: 'Status check — giraffe case submitted May 13',
    time: '8:15 AM',
    body: `Hi Dr. Ivančić,

Just checking in on the giraffe case (Giraffa camelopardalis, 9M) we submitted last Tuesday. We haven't received a report yet and the team is asking for an update.

Thank you,
Carlos`,
    draft: `Dr. Reyes,

Apologies for the delay — the giraffe case is in queue and will be completed by end of day tomorrow. I'll send the report directly to your team email on file.

Thank you for your patience.

Dr. Marina Ivančić
ZooRadOne`
  },
  {
    id: 4, priority: 'p2', badge: 'P2 — routine',
    sender: 'Dr. Amelia Foster', org: 'San Diego Zoo Wildlife Alliance',
    subject: 'Imaging protocol question — black rhino CT positioning',
    time: '10:22 AM',
    body: `Dr. Ivančić,

We're planning a CT for our 8-year-old black rhino next month and wanted your input on optimal positioning for thoracic assessment. We have a 64-slice unit available and the animal is comfortable with voluntary behaviors including lateral recumbency for short periods.

Any guidance on sequence selection and positioning would be appreciated.

Amelia Foster, DVM, DACVIM`,
    draft: `Dr. Foster,

For thoracic CT in a cooperative black rhino, lateral recumbency gives you the best lung field evaluation — I'd prioritize right lateral if you can only do one position. For your 64-slice unit, a helical acquisition at 1mm collimation with soft tissue and lung kernels will give you what you need.

Happy to review a test protocol before your scan date. Send it over when ready.

Dr. Marina Ivančić
ZooRadOne`
  },
  {
    id: 5, priority: 'p2', badge: 'P2 — routine',
    sender: 'Rachel Kim', org: 'Zoo New England',
    subject: 'Scheduling — on-site imaging visit, Q3 2026',
    time: '11:05 AM',
    body: `Hello,

We are interested in booking Dr. Ivančić for an on-site imaging day at Franklin Park Zoo in August or September. We have several cases queued that would benefit from in-person evaluation, including a geriatric harbor seal and a juvenile snow leopard.

Could you let me know availability and rates?

Rachel Kim
Veterinary Programs Coordinator
Zoo New England`,
    draft: null
  },
  {
    id: 6, priority: 'p3', badge: 'P3 — low',
    sender: 'newsletter@vetsymposium2026.org', org: '',
    subject: 'Early bird registration — International Zoo Veterinary Symposium 2026',
    time: '6:44 AM',
    body: `Early bird pricing ends May 31. Register now for the International Zoo Veterinary Symposium, Vienna, September 14–18, 2026.`,
    draft: null
  },
  {
    id: 7, priority: 'spam', badge: 'Filtered',
    sender: 'sales@medequip-solutions.net', org: '',
    subject: 'Exclusive offer: refurbished MRI units — limited stock!!',
    time: '5:30 AM',
    body: `Dear Healthcare Professional,\n\nWe have an exclusive offer on refurbished MRI units this month only...`,
    draft: null
  }
];

const voicemails = [
  {
    id: 0, priority: 'stat', badge: 'STAT',
    caller: 'Dr. James Okafor', org: 'SeaWorld San Diego',
    time: '6:58 AM', duration: '1:12',
    transcript: `Dr. Ivančić, this is James Okafor calling from SeaWorld San Diego. I have a dolphin in acute respiratory distress — 14-year-old female Pacific white-sided, been declining since about 4 AM. I'm going to send you an email with the full details and upload DICOMs but I wanted to call first. Please call me back as soon as you get this. My direct line is 619-555-0147. This is urgent. Thank you.`,
    note: `STAT callback — Dr. Okafor, SeaWorld SD. Dolphin in respiratory distress. DICOMs being uploaded. Call 619-555-0147 immediately.`,
    keywords: ['urgent', 'acute', 'distress']
  },
  {
    id: 1, priority: 'p1', badge: 'P1 — callback today',
    caller: 'Dr. Sandra Voss', org: 'Chicago Zoological Society',
    time: '8:03 AM', duration: '0:48',
    transcript: `Hi Marina, it's Sandra at Brookfield Zoo. We have a great ape case I'd like to discuss before submitting formally — it's a 19-year-old male western lowland gorilla with some subtle pulmonary findings on recent chest films. Not urgent but I want your read before we present to the team Thursday. Can you give me a call when you have a moment? Thanks so much.`,
    note: `Callback — Dr. Voss, Brookfield Zoo. Gorilla pulmonary case, needs discussion before Thursday team meeting. Not urgent.`,
    keywords: ['gorilla', 'pulmonary', 'thursday']
  },
  {
    id: 2, priority: 'p2', badge: 'P2 — routine',
    caller: 'Unknown', org: 'Georgia Aquarium',
    time: '9:44 AM', duration: '0:31',
    transcript: `Hello, this message is for Dr. Ivančić. I'm calling from the Georgia Aquarium veterinary team. We submitted a case about two weeks ago for a whale shark and we haven't received a report. Could someone please call us back to give us a status update? Our number is 404-555-0233. Thank you.`,
    note: `Status inquiry — Georgia Aquarium, whale shark case, ~2 weeks pending. Call 404-555-0233. Check case queue.`,
    keywords: ['status', 'whale shark', 'two weeks']
  },
  {
    id: 3, priority: 'p3', badge: 'P3 — no action',
    caller: 'Unknown', org: '',
    time: '7:15 AM', duration: '0:22',
    transcript: `Hi this message is for the office manager. I'm calling about scheduling a lunch meeting to discuss our new PACS software solution. Please call us back at your convenience at 1-800-555-9100.`,
    note: `Vendor call — PACS software sales. No action required.`,
    keywords: []
  }
];

const briefing = {
  date: 'Saturday, May 17, 2026',
  time: '7:00 AM',
  pending: [
    { case: 'Whale shark — Georgia Aquarium', submitted: 'May 3', age: '14 days', status: 'overdue' },
    { case: 'Giraffe — Dallas Zoo', submitted: 'May 13', age: '4 days', status: 'due today' },
    { case: 'Snow leopard — Omaha Zoo', submitted: 'May 15', age: '2 days', status: 'in progress' },
    { case: 'Manatee — Tampa Aquarium', submitted: 'May 16', age: '1 day', status: 'in progress' },
  ],
  newToday: [
    'Beluga whale referral — Shedd Aquarium (Dr. Mehta)',
    'STAT dolphin case — SeaWorld San Diego (Dr. Okafor)',
  ],
  calls: [
    'Dr. Okafor — SeaWorld San Diego (STAT)',
    'Dr. Voss — Brookfield Zoo (gorilla case, before Thursday)',
    'Georgia Aquarium — status inquiry',
  ],
  insight: 'You have 2 overdue or same-day reports. Clearing the whale shark case first will resolve the oldest outstanding inquiry and the voicemail from Georgia Aquarium.'
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function badgeStyle(priority: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    stat:  { background: 'rgba(239,68,68,0.15)',   color: '#f87171' },
    p1:    { background: 'rgba(245,158,11,0.15)',  color: '#fbbf24' },
    p2:    { background: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
    p3:    { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' },
    spam:  { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' },
  };
  return { fontSize: '10px', fontWeight: 600 as const, letterSpacing: '0.06em', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' as const, ...map[priority] };
}

function statColor(key: string) {
  if (key === 'stat') return '#ef4444';
  if (key === 'p1')   return '#f59e0b';
  if (key === 'p2')   return '#3b82f6';
  return 'rgba(255,255,255,0.3)';
}

function statCard(active: boolean): React.CSSProperties {
  return {
    background: active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '8px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s',
  };
}

function row(isExpanded: boolean): React.CSSProperties {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${isExpanded ? 'rgba(46,184,194,0.3)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s',
  };
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '0.75rem 1.5rem', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
      background: 'transparent', border: 'none',
      borderBottom: active ? '2px solid #2eb8c2' : '2px solid transparent',
      color: active ? '#2eb8c2' : 'rgba(255,255,255,0.4)',
      transition: 'all 0.2s', marginBottom: '-1px',
    }}>{label}</button>
  );
}

function ApproveBtn({ id, label, actionLabel, sent, onApprove }: { id: number; label: string; actionLabel: string; sent: Set<number>; onApprove: (e: React.MouseEvent, id: number) => void }) {
  if (sent.has(id)) {
    return <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}>✓ {label}</span>;
  }
  return (
    <button onClick={e => onApprove(e, id)} style={{ fontSize: '12px', fontWeight: 500, cursor: 'pointer', padding: '6px 16px', borderRadius: '6px', background: 'rgba(46,184,194,0.15)', color: '#2eb8c2', border: '1px solid rgba(46,184,194,0.3)' }}>
      ✓ {actionLabel}
    </button>
  );
}

// ─── EMAIL TAB ───────────────────────────────────────────────────────────────

function EmailTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sent, setSent] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string | null>(null);

  const counts = { stat: emails.filter(e => e.priority === 'stat').length, p1: emails.filter(e => e.priority === 'p1').length, p2: emails.filter(e => e.priority === 'p2').length, other: emails.filter(e => e.priority === 'p3' || e.priority === 'spam').length };

  const visible = emails.filter(e => {
    if (!filter) return true;
    if (filter === 'other') return e.priority === 'p3' || e.priority === 'spam';
    return e.priority === filter;
  });

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.25rem' }}>Inbox triage — today</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>AI-prioritized · {emails.length} messages · May 17, 2026 · 9:04 AM · Click a card to filter</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '2rem' }}>
        {([['STAT', counts.stat, 'stat'], ['Same day', counts.p1, 'p1'], ['Routine', counts.p2, 'p2'], ['Filtered', counts.other, 'other']] as [string, number, string][]).map(([label, value, key]) => (
          <div key={key} onClick={() => setFilter(filter === key ? null : key)} style={statCard(filter === key)}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 500, color: statColor(key) }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
        {visible.map(email => {
          const isExpanded = expanded === email.id;
          return (
            <div key={email.id} onClick={() => setExpanded(isExpanded ? null : email.id)} style={row(isExpanded)}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '12px', alignItems: 'center', padding: '12px 16px' }}>
                <span style={badgeStyle(email.priority)}>{email.badge}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                    {email.sender}{email.org ? <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}> · {email.org}</span> : null}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{email.subject}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' as const }}>{email.time}</span>
                  <span style={{ display: 'inline-block', fontSize: '16px', color: 'rgba(255,255,255,0.3)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                </div>
              </div>
              {isExpanded && (
                <div onClick={e => e.stopPropagation()} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}>
                  <pre style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, fontFamily: 'inherit', marginBottom: '16px' }}>{email.body}</pre>
                  {email.draft ? (
                    <>
                      <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#2eb8c2', marginBottom: '8px' }}>✦ AI draft reply — awaiting approval</div>
                      <pre style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, fontFamily: 'inherit', background: 'rgba(46,184,194,0.06)', border: '1px solid rgba(46,184,194,0.15)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>{email.draft}</pre>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <ApproveBtn id={email.id} label="Sent" actionLabel="Approve &amp; send" sent={sent} onApprove={(e, id) => { e.stopPropagation(); setSent(prev => new Set(prev).add(id)); }} />
                        <button style={{ fontSize: '12px', cursor: 'pointer', padding: '6px 14px', borderRadius: '6px', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>Edit before sending</button>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                      {email.priority === 'p3' || email.priority === 'spam' ? 'No reply needed — low priority or filtered.' : 'No draft available — manual reply required.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── VOICEMAIL TAB ───────────────────────────────────────────────────────────

function VoicemailTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [called, setCalled] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string | null>(null);

  const counts = { stat: voicemails.filter(v => v.priority === 'stat').length, p1: voicemails.filter(v => v.priority === 'p1').length, p2: voicemails.filter(v => v.priority === 'p2').length, other: voicemails.filter(v => v.priority === 'p3').length };

  const visible = voicemails.filter(v => {
    if (!filter) return true;
    if (filter === 'other') return v.priority === 'p3';
    return v.priority === filter;
  });

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.25rem' }}>Voicemail triage — today</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>AI-transcribed &amp; prioritized · {voicemails.length} messages · May 17, 2026 · 9:04 AM · Click a card to filter</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '2rem' }}>
        {([['STAT callback', counts.stat, 'stat'], ['Call today', counts.p1, 'p1'], ['Routine', counts.p2, 'p2'], ['No action', counts.other, 'other']] as [string, number, string][]).map(([label, value, key]) => (
          <div key={key} onClick={() => setFilter(filter === key ? null : key)} style={statCard(filter === key)}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 500, color: statColor(key) }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
        {visible.map(vm => {
          const isExpanded = expanded === vm.id;
          return (
            <div key={vm.id} onClick={() => setExpanded(isExpanded ? null : vm.id)} style={row(isExpanded)}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '12px', alignItems: 'center', padding: '12px 16px' }}>
                <span style={badgeStyle(vm.priority)}>{vm.badge}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                    {vm.caller}{vm.org ? <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}> · {vm.org}</span> : null}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                    {vm.keywords.length > 0
                      ? <>{vm.keywords.map((k, i) => <span key={i} style={{ background: 'rgba(46,184,194,0.12)', color: '#2eb8c2', fontSize: '11px', padding: '1px 6px', borderRadius: '3px', marginRight: '4px' }}>{k}</span>)}</>
                      : 'No clinical keywords'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' as const }}>{vm.time} · {vm.duration}</span>
                  <span style={{ display: 'inline-block', fontSize: '16px', color: 'rgba(255,255,255,0.3)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                </div>
              </div>
              {isExpanded && (
                <div onClick={e => e.stopPropagation()} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>Transcript</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>"{vm.transcript}"</p>
                  <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#2eb8c2', marginBottom: '8px' }}>✦ AI callback note</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', background: 'rgba(46,184,194,0.06)', border: '1px solid rgba(46,184,194,0.15)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>{vm.note}</div>
                  {vm.priority !== 'p3' && (
                    <ApproveBtn id={vm.id} label="Marked called" actionLabel="Mark as called" sent={called} onApprove={(e, id) => { e.stopPropagation(); setCalled(prev => new Set(prev).add(id)); }} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── BRIEFING TAB ────────────────────────────────────────────────────────────

function BriefingTab() {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.25rem' }}>Morning briefing</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{briefing.date} · Generated at {briefing.time}</p>
      </div>
      <div style={{ background: 'rgba(46,184,194,0.08)', border: '1px solid rgba(46,184,194,0.2)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '18px', marginTop: '2px' }}>✦</span>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>{briefing.insight}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Pending cases</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
            {briefing.pending.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{c.case}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Submitted {c.submitted} · {c.age}</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600 as const, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' as const, background: c.status === 'overdue' ? 'rgba(239,68,68,0.15)' : c.status === 'due today' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.1)', color: c.status === 'overdue' ? '#f87171' : c.status === 'due today' ? '#fbbf24' : '#60a5fa' }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>New today</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {briefing.newToday.map((n, i) => (
                <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#2eb8c2', marginTop: '2px' }}>+</span>{n}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Calls to make</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {briefing.calls.map((c, i) => (
                <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#fbbf24', marginTop: '2px' }}>→</span>{c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' as const, marginTop: '2rem' }}>
        Briefing generated automatically from email, voicemail, and case queue · Powered by Claude
      </p>
    </>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export function DashboardClient() {
  const [tab, setTab] = useState<'email' | 'voicemail' | 'briefing'>('briefing');

  return (
    <main style={{ minHeight: '100vh', background: '#0a1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2eb8c2', letterSpacing: '0.1em', textDecoration: 'none' }}>ZooRadOne</a>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>Office Automation · Demo</div>
        <a href="/" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Back to site</a>
      </div>
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem' }}>
          <TabButton label="☀ Morning briefing" active={tab === 'briefing'} onClick={() => setTab('briefing')} />
          <TabButton label="✉ Email triage"     active={tab === 'email'}    onClick={() => setTab('email')} />
          <TabButton label="✆ Voicemail"        active={tab === 'voicemail'} onClick={() => setTab('voicemail')} />
        </div>
        {tab === 'briefing'  && <BriefingTab />}
        {tab === 'email'     && <EmailTab />}
        {tab === 'voicemail' && <VoicemailTab />}
      </div>
    </main>
  );
}
