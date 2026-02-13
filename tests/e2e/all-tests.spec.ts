import { test, expect } from "@playwright/test";

test("form trimed on save", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Add project" }).click();
  await page.getByRole("textbox", { name: "Project name" }).fill("My project");

  await page.getByRole("button", { name: "Add component" }).click();
  await expect(
    page.getByRole("textbox", { name: "Component title" }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Field name" }).nth(4),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Field name" }).nth(5),
  ).toBeHidden();

  await page.getByRole("button", { name: "Add field" }).click();
  await expect(
    page.getByRole("textbox", { name: "Field name" }).nth(5),
  ).toBeVisible();

  await page
    .getByRole("textbox", { name: "Component title" })
    .first()
    .fill("Comp 1");
  await page
    .getByRole("textbox", { name: "Field name" })
    .first()
    .fill("Field 1");
  await page
    .getByRole("textbox", { name: "Field name" })
    .nth(1)
    .fill("Field 2");

  await page.getByRole("button", { name: "Add component" }).click();
  await expect(
    page.getByRole("textbox", { name: "Component title" }).nth(1),
  ).toBeVisible();

  await page
    .getByRole("textbox", { name: "Field name" })
    .nth(6)
    .fill("Field 3");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByRole("textbox", { name: "Field name" }).nth(2),
  ).toBeHidden();
  await expect(
    page.getByRole("textbox", { name: "Component title" }).nth(1),
  ).toBeHidden();

  await page.getByRole("button", { name: "Clear this project" }).click();

  await expect(
    page.getByRole("textbox", { name: "Field name" }).first(),
  ).toBeHidden();
  await expect(
    page.getByRole("textbox", { name: "Component title" }).first(),
  ).toBeHidden();

  await page.getByRole("button", { name: "Delete project" }).click();
  await expect(page.getByRole("button", { name: "My project" })).toBeHidden();
});

test("setup fields", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Settings" }).click();

  await page.getByRole("button", { name: "Add field type" }).click();
  await page
    .getByRole("textbox", { name: "Field type name" })
    .fill("Field type 1");

  await page.getByRole("button", { name: "Add field parameter" }).click();
  await page.getByRole("textbox", { name: "Parameter name" }).fill("Param 1-1");

  await page.getByRole("button", { name: "Add field parameter" }).click();
  await page
    .getByRole("textbox", { name: "Parameter name" })
    .nth(1)
    .fill("Param 1-2");

  await page.getByRole("button", { name: "Add field type" }).click();
  await page
    .getByRole("textbox", { name: "Field type name" })
    .nth(1)
    .fill("Field type 2");

  await page
    .getByRole("button", { name: "Add field parameter" })
    .nth(1)
    .click();
  await page
    .getByRole("textbox", { name: "Parameter name" })
    .nth(2)
    .fill("Param 2-1");

  await page.getByRole("button", { name: "Save" }).click();

  await page.getByRole("button", { name: "Add field type" }).click();
  await page
    .getByRole("button", { name: "Add field parameter" })
    .nth(2)
    .click();
  await page
    .getByRole("textbox", { name: "Parameter name" })
    .nth(3)
    .fill("Param 3-1");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByRole("textbox", { name: "Parameter name" }).nth(3),
  ).toBeHidden();

  await page.getByRole("button", { name: "Import / Export" }).click();
  await expect(page.getByRole("textbox")).toHaveValue(
    '[{"name":"Field type 1","parameters":["Param 1-1","Param 1-2"]},{"name":"Field type 2","parameters":["Param 2-1"]}]',
  );

  await page
    .locator('//*[@role="dialog"]')
    .getByRole("button", { name: "Close" })
    .click();
});

test("use fields", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Settings" }).click();
  await page.getByRole("button", { name: "Import / Export" }).click();
  await page
    .getByRole("textbox")
    .fill(
      '[{"name":"Field type 1","parameters":["Param 1-1","Param 1-2"]},{"name":"Field type 2","parameters":["Param 2-1"]}]',
    );
  await page.getByRole("button", { name: "Import" }).click();
  await page.getByRole("button", { name: "Save" }).click();

  await page.getByRole("link", { name: "Configurator", exact: true }).click();

  await page.getByRole("button", { name: "Add project" }).click();
  await page
    .getByRole("textbox", { name: "Project name" })
    .fill("Nice project");

  await page.getByRole("button", { name: "Add component" }).click();
  await page.getByRole("textbox", { name: "Component title" }).fill("Comp 1");

  await page
    .getByRole("textbox", { name: "Field name" })
    .first()
    .fill("Field 1");
  await page.getByRole("combobox", { name: "Field type" }).first().click();
  await page.getByText("Field type 1").click();

  await page.getByRole("textbox", { name: "Param 1-1" }).fill("one");
  await page.getByRole("textbox", { name: "Param 1-2" }).fill("two");

  await page
    .getByRole("textbox", { name: "Field name" })
    .nth(1)
    .fill("Field 2");
  await page.getByRole("combobox", { name: "Field type" }).nth(1).click();
  await page.getByText("Field type 2").click();
  await page.getByRole("textbox", { name: "Param 2-" }).fill("three !");

  await page.getByRole("button", { name: "Save" }).click();

  await page.getByRole("button", { name: "Import / Export" }).click();
  await expect(
    page.locator('//*[@role="dialog"]/*[@data-slot="body"]'),
  ).toContainText(
    "Comp 1 Field 1: <Field type 1> // Param 1-1: one // Param 1-2: twoField 2: <Field type 2> // Param 2-1: three !",
  );
  await page.getByText("JSON").click();
  await expect(page.getByRole("textbox")).toHaveValue(
    '[{"componentTitle":"Comp 1","fields":[{"fieldName":"Field 1","fieldTypeName":"Field type 1","fieldParametersValues":{"Param 1-1":"one","Param 1-2":"two"}},{"fieldName":"Field 2","fieldTypeName":"Field type 2","fieldParametersValues":{"Param 2-1":"three !"}}]}]',
  );
});
