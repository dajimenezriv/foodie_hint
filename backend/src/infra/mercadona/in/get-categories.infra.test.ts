import { getCategories } from "./get-categories";

describe("get-categories", () => {
  it("Should return categories", async () => {
    await getCategories();
  });
});
