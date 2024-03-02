const { db } = require('@vercel/postgres');
const {
    users, todos
} = require('../app/lib/placeholder-data.ts');
const bcrypt = require('bcrypt');

async function seedUsers(client) {

  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users_todo (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users_todo (id, name, email, password)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedTodos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS todos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title varchar(500) NOT NULL,
    completed boolean DEFAULT FALSE,
    date DATE NOT NULL,
    FOREIGN KEY(id) REFERENCES users_todo(id) ON DELETE CASCADE
  );
`;
//CREATE TABLE todos (
// id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// title varchar(300) NOT NULL , 
// completed boolean DEFAULT FALSE , 
// date DATE NOT NULL,
// user_id UUID DEFAULT uuid_generate_v4() NOT NULL , 
// FOREIGN KEY(user_id) REFERENCES users_todo(id) ON DELETE CASCADE

// )

    console.log(`Created "todos" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      todos.map(
        (todo) => client.sql`
        INSERT INTO todos (id , title , completed , date)
        VALUES (${todo.user_id}, ${todo.title}, ${todo.completed}, ${todo.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

  

    return {
      createTable,

    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTodos(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
