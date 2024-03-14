import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.json('kdfldslf')
  try {
    const { email, password } = req.body;
    console.log(email, password);
    
    res.status(200).json({ success: true });
  } catch (error: Error | any) {
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}
