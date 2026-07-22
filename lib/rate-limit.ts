const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 3 per hour
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  if (record.count >= config.maxRequests) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: config.maxRequests - record.count };
}
