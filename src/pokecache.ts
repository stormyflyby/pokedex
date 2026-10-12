export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(reapInterval: number) {
    this.#interval = reapInterval;
    this.#startReapLoop();
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  #reap(): void {
    const timeThreshold = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache) {
      if (entry.createdAt < timeThreshold) {
        this.#cache.delete(key);
      }
    }
  }

  add<T>(key: string, val: T): void {
    const cacheEntry = { createdAt: Date.now(), val };
    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string): T | undefined {
    const retrieved = this.#cache.get(key);
    if (retrieved === undefined) {
      return undefined;
    }
    return retrieved.val;
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}

type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
