export function estimateReadTime(htmlOrText = '', { wpm = 200, secondsPerImage = 12 } = {}) {
  const input = String(htmlOrText || '');

  // Count images (simple heuristic if HTML provided)
  const imageCount = (input.match(/<img\b/gi) || []).length;

  // Strip HTML tags and collapse whitespace to get visible text
  const stripped = input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = stripped ? stripped.split(' ').length : 0;
  
  // Compute seconds from words using words-per-minute
  const secondsFromWords = (words / wpm) * 60;
  const secondsFromImages = imageCount * secondsPerImage;
  const totalSeconds = Math.max(1, Math.round(secondsFromWords + secondsFromImages));
  const minutes = Math.max(1, Math.ceil(totalSeconds / 60));

  return {
    minutes,
    totalSeconds,
    words,
    imageCount,
    display: `${minutes} min read`,
  };
}
