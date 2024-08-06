import { prisma } from "../client";
import { faker } from '@faker-js/faker';

const main = async () => {
    await prisma.product.createMany({
        data: new Array(30).fill(0).map(() => {
            return {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price({min: 0, max: 100, }))
            }
        }),
        skipDuplicates: true
    })
}
main()