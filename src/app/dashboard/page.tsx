'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

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

const badgeStyles: Record<string, string> = {
  stat: 'bg-red-100 text-red-800',
  p1:   'bg-amber-100 text-amber-800',
  p2:   'bg-blue-100 text-blue-800',
  p2r:  'bg-blue-100 text-blue-800',
  p3:   'bg-gray-100 text-gray-600',
  spam: 'bg-gray-100 text-gray-400',
};

function getBadgeClass(priority: string) {
  return badgeStyles[priority] ?? badgeStyles['p3'];
}

export default function DashboardPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sent, setSent] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string | null>(null);

  function toggle(id: number) {
    setExpanded(prev => prev === id ? null : id);
  }

  function approve(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setSent(prev => new Set(prev).add(id));
  }

  const stat  = emails.filter(e => e.priority === 'stat').length;
  const p1    = emails.filter(e => e.priority === 'p1').length;
  const p2    = emails.filter(e => e.priority === 'p2').length;
  const other = emails.filter(e => e.priority === 'p3' || e.priority === 'spam').length;

  return (
    <main style={{ minHeight: '100vh', background: '#0a1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2eb8c2', letterSpacing: '0.1em' }}>ZooRadOne</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Office Automation · Demo</div>
        <a href="/" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back to site</a>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.25rem' }}>Inbox triage — today</h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            AI-prioritized · {emails.length} messages · May 17, 2026 · 9:04 AM
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '2rem' }}>
          {[
            { label: 'STAT', value: stat, color: '#ef4444', key: 'stat' },
            { label: 'Same day', value: p1, color: '#f59e0b', key: 'p1' },
            { label: 'Routine', value: p2, color: '#3b82f6', key: 'p2' },
            { label: 'Filtered', value: other, color: 'rgba(255,255,255,0.3)', key: 'other' },
          ].map(s => (
            <div key={s.label} onClick={() => setFilter(filter === s.key ? null : s.key)} style={{ background: filter === s.key ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${filter === s.key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '8px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 500, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Email list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {emails.filter(e => {
            if (!filter) return true;
            if (filter === 'other') return e.priority === 'p3' || e.priority === 'spam';
            return e.priority === filter;
          }).map(email => {
            const isExpanded = expanded === email.id;
            const isSent = sent.has(email.id);
            return (
              <div
                key={email.id}
                onClick={() => toggle(email.id)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isExpanded ? 'rgba(46,184,194,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Summary row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '12px', alignItems: 'center', padding: '12px 16px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                    padding: '3px 8px', borderRadius: '4px',
                    background: email.priority === 'stat' ? 'rgba(239,68,68,0.15)' :
                                email.priority === 'p1'   ? 'rgba(245,158,11,0.15)' :
                                email.priority === 'p2'   ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.06)',
                    color:      email.priority === 'stat' ? '#f87171' :
                                email.priority === 'p1'   ? '#fbbf24' :
                                email.priority === 'p2'   ? '#60a5fa' : 'rgba(255,255,255,0.3)',
                    whiteSpace: 'nowrap',
                  }}>{email.badge}</span>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                      {email.sender}{email.org ? <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}> · {email.org}</span> : null}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {email.subject}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{email.time}</span>
                    <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>⌄</span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div
                    onClick={e => e.stopPropagation()}
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px' }}
                  >
                    <pre style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', marginBottom: '16px' }}>
                      {email.body}
                    </pre>

                    {email.draft ? (
                      <>
                        <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2eb8c2', marginBottom: '8px' }}>
                          ✦ AI draft reply — awaiting approval
                        </div>
                        <pre style={{
                          fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7,
                          whiteSpace: 'pre-wrap', fontFamily: 'inherit',
                          background: 'rgba(46,184,194,0.06)', border: '1px solid rgba(46,184,194,0.15)',
                          borderRadius: '8px', padding: '12px', marginBottom: '12px'
                        }}>
                          {email.draft}
                        </pre>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {isSent ? (
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px' }}>
                              ✓ Sent
                            </span>
                          ) : (
                            <button
                              onClick={e => approve(e, email.id)}
                              style={{
                                fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                                padding: '6px 16px', borderRadius: '6px',
                                background: 'rgba(46,184,194,0.15)', color: '#2eb8c2',
                                border: '1px solid rgba(46,184,194,0.3)',
                              }}
                            >
                              ✓ Approve &amp; send
                            </button>
                          )}
                          <button style={{
                            fontSize: '12px', cursor: 'pointer', padding: '6px 14px', borderRadius: '6px',
                            background: 'transparent', color: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}>
                            Edit before sending
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                        {email.priority === 'p3' || email.priority === 'spam'
                          ? 'No reply needed — low priority or filtered.'
                          : 'No draft available — manual reply required.'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '3rem' }}>
          This is a simulation of office automation powered by Claude · ZooRadOne SROA Demo
        </p>
      </div>
    </main>
  );
}
