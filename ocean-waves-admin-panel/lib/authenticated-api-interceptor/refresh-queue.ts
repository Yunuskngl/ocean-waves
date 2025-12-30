export type QueueItem = {
  resolve: () => void;
  reject: (err: unknown) => void;
};

export class RefreshQueue {
  private items: QueueItem[] = [];

  wait(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.items.push({ resolve, reject });
    });
  }

  resolveAll(): void {
    this.items.forEach((i) => i.resolve());
    this.items = [];
  }

  rejectAll(err: unknown): void {
    this.items.forEach((i) => i.reject(err));
    this.items = [];
  }

  get size(): number {
    return this.items.length;
  }
}
