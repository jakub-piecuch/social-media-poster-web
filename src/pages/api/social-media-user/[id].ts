// src/pages/api/social-media-user/[id].ts
import { findSocialMediaUserById, updateSocialMediaUser } from '@/api/socia-media-user/s-m.user.controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return findSocialMediaUserById(req, res);

    case 'PUT':
      return updateSocialMediaUser(req, res);
    
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}