import { z } from "zod";

const schema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      categories: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
});

export const getCategories = async () => {
  const res = await fetch("https://tienda.mercadona.es/api/categories/");
  const data = await res.json();
  const parsedData = await schema.parseAsync(data);
  return parsedData;
};
