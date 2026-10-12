import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
  {
    key: "https://lorem.com/ipsum",
    val: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tristique augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Vestibulum facilisis purus condimentum urna pulvinar, eget vehicula elit congue. Praesent mattis sagittis ligula id vestibulum. Cras eros mauris, elementum sit amet eleifend sed, tristique quis nunc. Pellentesque porttitor porttitor nunc et consectetur. Proin pretium nunc tortor, eu venenatis nunc auctor a. Duis sed auctor diam. Nullam mollis sed diam dignissim finibus. Donec elit enim, vulputate non gravida id, condimentum at massa. Donec pharetra turpis fringilla porttitor posuere.",
    interval: 300,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 0.5));
  const retained = cache.get(key);
  expect(retained).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
