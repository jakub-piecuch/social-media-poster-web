// src/app/api/facebook/facebook-account.controller.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorDetails } from '@/errors/error';
import { SocialMediaUser } from '../../social-media-user/types/SocialMediaUser';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { FacebookAccountService } from './facebook-accounts.service';
import { FacebookApiException } from '../api/facebook-api.exception';

const facebookAccountService = new FacebookAccountService();

/**
 * Handler for creating a new Facebook account from OAuth token
 */
export async function createFacebookAccount(
  req: NextApiRequest,
  res: NextApiResponse<SocialMediaUser | ErrorDetails>
) {
  try {
    // Get session to verify admin user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        timestamp: new Date(),
        status: 401,
        reason: 'Unauthorized',
        message: 'You must be signed in to perform this action'
      });
    }

    const { accessToken } = req.body;
    
    if (!accessToken) {
      return res.status(400).json({
        timestamp: new Date(),
        status: 400,
        reason: 'BadRequest',
        message: 'Access token is required'
      });
    }

    // Create Facebook account
    const facebookAccount = await facebookAccountService.createFacebookAccount(
      accessToken,
      session.user.id || 'admin'
    );

    return res.status(201).json(facebookAccount);
  } catch (error) {
    console.error('Error creating Facebook account:', error);
    
    if (error instanceof FacebookApiException) {
      return res.status(error.status).json(error.toErrorDetails());
    }
    
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      reason: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to create Facebook account'
    });
  }
}

/**
 * Handler for getting all Facebook accounts
 */
export async function getAllFacebookAccounts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get session to verify admin user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        timestamp: new Date(),
        status: 401,
        reason: 'Unauthorized',
        message: 'You must be signed in to perform this action'
      });
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const skip = req.query.skip ? parseInt(req.query.skip as string) : undefined;
    
    const accounts = await facebookAccountService.findAllFacebookAccounts(limit, skip);
    
    return res.status(200).json(accounts);
  } catch (error) {
    console.error('Error getting Facebook accounts:', error);
    
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      reason: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to get Facebook accounts'
    });
  }
}

/**
 * Handler for finding a Facebook account by ID
 */
export async function getFacebookAccountById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get session to verify admin user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        timestamp: new Date(),
        status: 401,
        reason: 'Unauthorized',
        message: 'You must be signed in to perform this action'
      });
    }

    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        timestamp: new Date(),
        status: 400,
        reason: 'BadRequest',
        message: 'Valid Facebook account ID is required'
      });
    }
    
    const account = await facebookAccountService.findByFacebookUserId(id);
    
    if (!account || account.platform !== 'facebook') {
      return res.status(404).json({
        timestamp: new Date(),
        status: 404,
        reason: 'NotFound',
        message: 'Facebook account not found'
      });
    }
    
    return res.status(200).json(account);
  } catch (error) {
    console.error('Error finding Facebook account:', error);
    
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      reason: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to find Facebook account'
    });
  }
}

/**
 * Handler for updating Facebook account status
 */
export async function updateFacebookAccountStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get session to verify admin user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        timestamp: new Date(),
        status: 401,
        reason: 'Unauthorized',
        message: 'You must be signed in to perform this action'
      });
    }

    const { id } = req.query;
    const { isActive } = req.body;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        timestamp: new Date(),
        status: 400,
        reason: 'BadRequest',
        message: 'Valid Facebook account ID is required'
      });
    }
    
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        timestamp: new Date(),
        status: 400,
        reason: 'BadRequest',
        message: 'isActive must be a boolean'
      });
    }
    
    const updatedAccount = await facebookAccountService.toggleAccountStatus(id, isActive);
    
    if (!updatedAccount) {
      return res.status(404).json({
        timestamp: new Date(),
        status: 404,
        reason: 'NotFound',
        message: 'Facebook account not found'
      });
    }
    
    return res.status(200).json(updatedAccount);
  } catch (error) {
    console.error('Error updating Facebook account status:', error);
    
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      reason: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to update Facebook account status'
    });
  }
}

/**
 * Handler for deleting a Facebook account
 */
export async function deleteFacebookAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get session to verify admin user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        timestamp: new Date(),
        status: 401,
        reason: 'Unauthorized',
        message: 'You must be signed in to perform this action'
      });
    }

    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        timestamp: new Date(),
        status: 400,
        reason: 'BadRequest',
        message: 'Valid Facebook account ID is required'
      });
    }
    
    const success = await facebookAccountService.deleteFacebookAccount(id);
    
    if (!success) {
      return res.status(404).json({
        timestamp: new Date(),
        status: 404,
        reason: 'NotFound',
        message: 'Facebook account not found or could not be deleted'
      });
    }
    
    return res.status(200).json({
      message: 'Facebook account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting Facebook account:', error);
    
    return res.status(500).json({
      timestamp: new Date(),
      status: 500,
      reason: 'InternalServerError',
      message: error instanceof Error ? error.message : 'Failed to delete Facebook account'
    });
  }
}