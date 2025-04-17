// src/pages/api/social-media-user/index.ts
import { createSocialMediaUser } from '@/api/socia-media-user/s-m.user.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return createSocialMediaUser(req, res);
    
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}