import { Selector, ClientFunction } from "testcafe";

fixture`Dashboard`.page`${process.env.TEST_CAFE_HOME_PAGE || "http://localhost:3000"}`;

test("Searching a Pokemon", async (t) => {
  await t.typeText(Selector(".ant-input"), "pikachu").pressKey("enter");
  await t.expect(Selector(".ant-page-header-heading-title").innerText).eql("Pikachu");
});

test("Searching a Pokemon not found", async (t) => {
  await t.typeText(Selector(".ant-input"), "wrongpokemon").pressKey("enter");
  await t.expect(Selector(".ant-message-custom-content").innerText).eql("Pokemon Not found!");
});

test("Clicking in a pokemon", async (t) => {
  await t.click(Selector(".ant-card-meta-title").withText("bulbasaur"));
  await t.expect(Selector(".ant-page-header-heading-title").innerText).eql("Bulbasaur");
});

test("Clicking in a form Collapse", async (t) => {
  await t.click(Selector(".ant-card-meta-title").withText("bulbasaur"));
  await t.expect(Selector(".ant-page-header-heading-title").innerText).eql("Bulbasaur");
  await t.click(Selector(".ant-collapse-item:first-child .ant-collapse-header"));
});