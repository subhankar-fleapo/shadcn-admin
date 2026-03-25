import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const tasks = Array.from({ length: 100 }, () => {
  const statuses = ['active', 'revoked'] as const
  const labels = ['bug', 'feature', 'documentation'] as const

  return {
    id: faker.number.int({ min: 1, max: 100 }).toString(),
    name: `Fake-${faker.number.int({ min: 1, max: 100 })}`,
    status: faker.helpers.arrayElement(statuses),
    key: `api_key_${faker.string.uuid()}`,
    label: faker.helpers.arrayElement(labels),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    assignee: faker.person.fullName(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    dueDate: faker.date.future(),
  }
})
