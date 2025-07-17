import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";
import { expect, it, describe } from "@jest/globals";

describe("Test calculateRank", () => {
  it("new user gets C rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 0,
        prs: 0,
        issues: 0,
        reviews: 0,
        repos: 0,
        stars: 0,
        followers: 0,
      }),
    ).toStrictEqual({ level: "C", percentile: 100 });
  });

  it("beginner user gets B- rank", () => {
    const result = calculateRank({
      all_commits: false,
      commits: 125,
      prs: 25,
      issues: 10,
      reviews: 5,
      repos: 0,
      stars: 25,
      followers: 5,
    });
    expect(result.level).toBe("B-");
    expect(result.percentile).toBeCloseTo(65.02918514848255, 10); // Check within 10 decimal places
  });

  it("median user gets B+ rank", () => {
    // ... rest of your tests, consider applying toBeCloseTo for other percentile checks as well
    const result = calculateRank({
      all_commits: false,
      commits: 250,
      prs: 50,
      issues: 25,
      reviews: 10,
      repos: 0,
      stars: 50,
      followers: 10,
    });
    expect(result.level).toBe("B+");
    expect(result.percentile).toBeCloseTo(46.09375, 5); // Example with fewer decimal places if appropriate
  });

  it("average user gets B+ rank (include_all_commits)", () => {
    const result = calculateRank({
      all_commits: true,
      commits: 1000,
      prs: 50,
      issues: 25,
      reviews: 10,
      repos: 0,
      stars: 50,
      followers: 10,
    });
    expect(result.level).toBe("B+");
    expect(result.percentile).toBeCloseTo(46.09375, 5);
  });

  it("advanced user gets A rank", () => {
    const result = calculateRank({
      all_commits: false,
      commits: 500,
      prs: 100,
      issues: 50,
      reviews: 20,
      repos: 0,
      stars: 200,
      followers: 40,
    });
    expect(result.level).toBe("A");
    expect(result.percentile).toBeCloseTo(20.841471354166664, 10);
  });

  it("expert user gets A+ rank", () => {
    const result = calculateRank({
      all_commits: false,
      commits: 1000,
      prs: 200,
      issues: 100,
      reviews: 40,
      repos: 0,
      stars: 800,
      followers: 160,
    });
    expect(result.level).toBe("A+");
    expect(result.percentile).toBeCloseTo(5.575988339442828, 10);
  });

  it("sindresorhus gets S rank", () => {
    const result = calculateRank({
      all_commits: false,
      commits: 1300,
      prs: 1500,
      issues: 4500,
      reviews: 1000,
      repos: 0,
      stars: 600000,
      followers: 50000,
    });
    expect(result.level).toBe("S");
    expect(result.percentile).toBeCloseTo(0.4578556547153667, 10);
  });
});
