/**
 * In-memory fixed-window rate limiter for server actions.
 * ponytail: per-instance memory only — resets on redeploy and does not
 * share state across instances. Upgrade to Upstash/Redis when scaling
 * beyond a single server or needing durable throttle logs.
 */

const buckets = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfterSec: 0 }
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  return { ok: true, retryAfterSec: 0 }
}

/** Periodically drop expired buckets to keep memory bounded. */
export function sweepRateLimits(): void {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}
