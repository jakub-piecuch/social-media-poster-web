// src/api/socia-media-user/controller/socialMediaUserController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { SocialMediaUserService } from './s-m-user.service';
import { SocialMediaUserException } from './s-m-user.exception';
import { ErrorDetails } from '@/errors/error';
import { SocialMediaUser } from './types/SocialMediaUser';

const socialMediaUserService = new SocialMediaUserService();

export async function createSocialMediaUser(
  req: NextApiRequest,
  res: NextApiResponse<SocialMediaUser | ErrorDetails>
) {
  try {
    const userData = req.body;

    if (!userData.username || !userData.platform) {
      throw SocialMediaUserException.badRequest("Username and platform must not be null!")
    }

    const createdUser = await socialMediaUserService.createSocialMediaUser(userData);

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error creating social media user:', error);
    if (error instanceof SocialMediaUserException) {
      return res.status(error.status).json(error.toErrorDetails())
    }
    return res.status(500);
  }
}

export async function updateSocialMediaUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const userData = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    const updatedUser = await socialMediaUserService.updateSocialMediaUser(id, userData);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Social media user not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating social media user:', error);
    return res.status(500).json({ error: 'Failed to update social media user' });
  }
}

/**
 * Handler for finding a social media user by ID
 */
export async function findSocialMediaUserById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Valid user ID is required' });
    }

    const user = await socialMediaUserService.findSocialMediaUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'Social media user not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error finding social media user:', error);
    return res.status(500).json({ error: 'Failed to find social media user' });
  }
}
  