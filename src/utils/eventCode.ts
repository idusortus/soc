/**
 * Event code system for sharing game sessions across devices
 * Uses URL params + localStorage for static deployment (no backend)
 */

export interface EventData {
  eventCode: string;
  createdAt: number;
  gameType: 'bingo' | 'truths' | 'poll';
  hostName?: string;
}

const EVENT_STORAGE_PREFIX = 'event-';
const EVENT_CODE_LENGTH = 6;

/**
 * Generate a random event code
 */
export function generateEventCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Remove ambiguous chars
  let code = '';
  for (let i = 0; i < EVENT_CODE_LENGTH; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Create a new event and store it
 */
export function createEvent(gameType: EventData['gameType'], hostName?: string): EventData {
  const eventCode = generateEventCode();
  const eventData: EventData = {
    eventCode,
    createdAt: Date.now(),
    gameType,
    hostName,
  };
  
  localStorage.setItem(
    `${EVENT_STORAGE_PREFIX}${eventCode}`,
    JSON.stringify(eventData)
  );
  
  return eventData;
}

/**
 * Load an event from localStorage
 */
export function loadEvent(eventCode: string): EventData | null {
  try {
    const data = localStorage.getItem(`${EVENT_STORAGE_PREFIX}${eventCode.toUpperCase()}`);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    return parsed as EventData;
  } catch {
    return null;
  }
}

/**
 * Get event code from URL params
 */
export function getEventCodeFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('event');
}

/**
 * Create a shareable URL for an event
 */
export function createEventURL(eventCode: string, gameType: string): string {
  const baseURL = window.location.origin + window.location.pathname;
  return `${baseURL}#/${gameType}?event=${eventCode}`;
}

/**
 * Clear old events (older than 24 hours)
 */
export function cleanupOldEvents(): void {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(EVENT_STORAGE_PREFIX)) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.createdAt && now - data.createdAt > maxAge) {
          localStorage.removeItem(key);
        }
      } catch {
        // Invalid data, remove it
        localStorage.removeItem(key);
      }
    }
  });
}
