import { getAll } from "./photo";

describe("Services Photo", () => {
  test("Get 10 Photos server", async () => {
    const photos = await getAll();
    expect(photos).toHaveLength(10);
  });

  test("Error Photos server page not number", () => {
    return expect(async () => {
      await getAll("ABCD");
    }).rejects.toThrow("You must provide a number");
  });
});
