import { describe, it, expect } from 'vitest'
import { estimateReadTime } from './readTime'

describe('estimateReadTime', () => {
  it('returns 1 min for empty text', () => {
    const r = estimateReadTime('')
    expect(r.minutes).toBe(1)
    expect(r.totalSeconds).toBeGreaterThanOrEqual(1)
  })

  it('counts words and returns expected minutes', () => {
    const text = 'word '.repeat(400) // 400 words => ~2 minutes at 200 wpm
    const r = estimateReadTime(text)
    expect(r.words).toBe(400)
    expect(r.minutes).toBe(2)
  })

  it('accounts for images in html', () => {
    const html = '<p>Hello world</p><img src="a.png"/><img src="b.png" />'
    const r = estimateReadTime(html, { wpm: 200, secondsPerImage: 10 })
    // words are 2 => small, plus images add seconds
    expect(r.imageCount).toBe(2)
    expect(r.totalSeconds).toBeGreaterThanOrEqual(1)
    expect(r.minutes).toBeGreaterThanOrEqual(1)
  })
})
