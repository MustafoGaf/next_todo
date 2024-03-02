
const users = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Mustafo Gaforov',
    email: 'mustafo@nextmail.com',
    password: 'Salom+2003',
  },
];



const todos = [
  {
    user_id: users[0].user_id,
    title: 'Стать прораммистом',
    completed: true,
    date: '2024-02-26',
  },
  {
    user_id: users[0].user_id,
    title: 'Читать книга 10 страниц каждый день',
    completed: false,
    date:  '2024-02-26',
  },
];

module.exports = {
  users,
  todos, 

};