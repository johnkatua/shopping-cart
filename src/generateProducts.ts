import { faker } from "@faker-js/faker";
import { Product } from "./types/Product";

const generateProducts = (numProducts = 20): Array<Product> => {
  const products: Product[] = [];

  for (let i = 0; i < numProducts; i++) {
    products.push({
      id: i + 1,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({
        min: 100,
        max: 2000
      })),
      image: faker.image.urlLoremFlickr({
        width: 400,
        height: 400
      }),
      description: faker.lorem.paragraph({
        min: 10,
        max: 50
      })
    })
  }

  return products
}

export default generateProducts;