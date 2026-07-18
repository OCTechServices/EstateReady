'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What should I actually do first this week?',
  'What does my top priority action mean in plain English?',
  'How do I find a good estate planning attorney?',
]

export default function ReportChat({ token }: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setError('')

    const next: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/report-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, messages: next }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-cream-dark overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-cream-dark flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid">
          Ask about your report
        </p>
        <span className="text-[10px] text-slate-mid uppercase tracking-widest">Report Q&amp;A</span>
      </div>

      {/* Messages or suggested questions */}
      <div className="px-6 py-5 min-h-[140px]">
        {messages.length === 0 ? (
          <div>
            <p className="text-sm text-slate-mid mb-4">Common questions to get started:</p>
            <div className="space-y-2">
              {SUGGESTED.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="w-full text-left text-sm text-navy border border-cream-dark px-4 py-3 hover:border-navy/40 hover:bg-cream transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div key={i}>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: m.role === 'user' ? '#1A4A2E' : '#B5935A' }}
                >
                  {m.role === 'user' ? 'You' : 'Assistant'}
                </p>
                <p className="text-sm text-navy leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </p>
              </div>
            ))}

            {loading && (
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#B5935A' }}
                >
                  Assistant
                </p>
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full bg-slate-mid/40 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-[#7A2840]">{error}</p>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-3 border-t border-cream-dark">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Ask a question about your report…"
            disabled={loading}
            className="flex-1 border border-cream-dark px-4 py-2.5 text-sm text-navy placeholder-slate-mid/50 focus:outline-none focus:border-navy bg-white transition-colors"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="bg-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-navy-light transition-colors disabled:bg-cream-dark disabled:text-slate-mid disabled:cursor-not-allowed"
            style={input.trim() && !loading ? { borderBottom: '3px solid #B5935A' } : undefined}
          >
            Ask
          </button>
        </div>
        <p className="text-[10px] text-slate-mid mt-2">
          Not legal advice. Consult a licensed attorney for legal questions specific to your situation.
        </p>
      </div>

    </div>
  )
}
