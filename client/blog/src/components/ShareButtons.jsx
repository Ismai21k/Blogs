import React, { useState } from 'react'

const IconShare = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconTwitter = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 5.924a8.19 8.19 0 0 1-2.357.646 4.11 4.11 0 0 0 1.804-2.27 8.22 8.22 0 0 1-2.605.996A4.103 4.103 0 0 0 11.07 8.29a11.635 11.635 0 0 1-8.447-4.28 4.103 4.103 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.7v.05a4.103 4.103 0 0 0 3.29 4.02 4.093 4.093 0 0 1-1.852.07 4.106 4.106 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 19.54 11.616 11.616 0 0 0 8.29 21c7.547 0 11.675-6.253 11.675-11.675 0-.178-.004-.355-.012-.532A8.344 8.344 0 0 0 22 5.924z" />
  </svg>
)

const IconFacebook = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.1 1.2-3.3 3-3.3.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12z" />
  </svg>
)

const ShareButtons = ({ url, title, image }) => {
  const [copied, setCopied] = useState(false)

  // Prefer server preview URL for reliable social previews when available
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
  const previewUrl = (() => {
    try {
      // If url is a client readmore path like /readmore/:id or full client path, extract id
      const m = String(url).match(/\/readmore\/([^/?#]+)/i)
      if (m && m[1] && API_BASE) {
        return `${API_BASE.replace(/\/$/, '')}/posts/${m[1]}/preview`
      }
    } catch (e) {
      // ignore
    }
    return url
  })()

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: previewUrl })
      } else {
        await navigator.clipboard.writeText(previewUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Share failed', err)
      // no alert to avoid blocking UX
    }
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(previewUrl)}`
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}`

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onShare}
        aria-label="Share this article"
        title="Share"
        className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <IconShare />
        <span>Share</span>
      </button>

      <a
        href={twitterHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Twitter"
        title="Share on Twitter"
        className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
      >
        <IconTwitter />
        <span className="sr-only">Twitter</span>
      </a>

      <a
        href={fbHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
        title="Share on Facebook"
        className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
      >
        <IconFacebook />
        <span className="sr-only">Facebook</span>
      </a>

      <button
        onClick={onCopy}
        aria-label="Copy link"
        title="Copy link"
        className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
      >
        {copied ? (
          <span className="text-green-600">Copied!</span>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="8" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default ShareButtons
