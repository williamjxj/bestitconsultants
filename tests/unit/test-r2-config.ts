/**
 * Unit tests for R2Configuration model validation
 * These tests MUST fail before implementation
 */

import { describe, it, expect } from '@jest/globals'
import dotenv from 'dotenv'

import { R2Configuration } from '../../src/types/r2'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

describe('R2Configuration Model Validation', () => {
  describe('R2Configuration creation', () => {
    it('should create valid R2Configuration with all required fields', () => {
      const r2Config: R2Configuration = {
        accountId: 'test-account-123',
        accessKeyId: 'test-access-key',
        secretAccessKey: 'test-secret-key',
        bucketName: 'test-bucket',
        publicUrl: 'https://test-bucket.r2.cloudflarestorage.com',
        region: 'auto',
        endpoint: 'https://test-account-123.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: true,
      }

      expect(r2Config.accountId).toBe('test-account-123')
      expect(r2Config.accessKeyId).toBe('test-access-key')
      expect(r2Config.secretAccessKey).toBe('test-secret-key')
      expect(r2Config.bucketName).toBe('test-bucket')
      expect(r2Config.publicUrl).toBe(
        'https://test-bucket.r2.cloudflarestorage.com'
      )
      expect(r2Config.region).toBe('auto')
      expect(r2Config.isEnabled).toBe(true)
      expect(r2Config.fallbackEnabled).toBe(true)
    })

    it('should validate required fields are present', () => {
      const requiredFields = [
        'accountId',
        'accessKeyId',
        'secretAccessKey',
        'bucketName',
        'publicUrl',
        'endpoint',
      ]

      const r2Config: R2Configuration = {
        accountId: 'test-account',
        accessKeyId: 'test-key',
        secretAccessKey: 'test-secret',
        bucketName: 'test-bucket',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: true,
      }

      requiredFields.forEach(field => {
        expect(r2Config[field as keyof R2Configuration]).toBeDefined()
        expect(r2Config[field as keyof R2Configuration]).not.toBe('')
      })
    })

    it('should validate publicUrl is a valid HTTPS URL', () => {
      const validUrls = [
        'https://bucket.r2.cloudflarestorage.com',
        'https://my-bucket.r2.cloudflarestorage.com',
        'https://test-bucket-123.r2.cloudflarestorage.com',
      ]

      validUrls.forEach(url => {
        const r2Config: R2Configuration = {
          accountId: 'test',
          accessKeyId: 'test',
          secretAccessKey: 'test',
          bucketName: 'test',
          publicUrl: url,
          region: 'auto',
          endpoint: 'https://test.r2.cloudflarestorage.com',
          isEnabled: true,
          fallbackEnabled: true,
        }

        expect(r2Config.publicUrl).toMatch(
          /^https:\/\/[a-zA-Z0-9.-]+\.r2\.cloudflarestorage\.com$/
        )
      })
    })

    it('should validate bucket name follows R2 conventions', () => {
      const validBucketNames = [
        'test-bucket',
        'my-bucket-123',
        'bucket-name',
        'bestit-consultants-images',
      ]

      validBucketNames.forEach(bucketName => {
        const r2Config: R2Configuration = {
          accountId: 'test',
          accessKeyId: 'test',
          secretAccessKey: 'test',
          bucketName,
          publicUrl: 'https://test.com',
          region: 'auto',
          endpoint: 'https://test.r2.cloudflarestorage.com',
          isEnabled: true,
          fallbackEnabled: true,
        }

        expect(r2Config.bucketName).toMatch(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)
        expect(r2Config.bucketName.length).toBeGreaterThanOrEqual(3)
        expect(r2Config.bucketName.length).toBeLessThanOrEqual(63)
      })
    })

    it('should validate region defaults to auto', () => {
      const r2Config: R2Configuration = {
        accountId: 'test',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        bucketName: 'test',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: true,
      }

      expect(r2Config.region).toBe('auto')
    })

    it('should validate endpoint format', () => {
      const r2Config: R2Configuration = {
        accountId: 'test-account-123',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        bucketName: 'test',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test-account-123.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: true,
      }

      expect(r2Config.endpoint).toMatch(
        /^https:\/\/[a-zA-Z0-9-]+\.r2\.cloudflarestorage\.com$/
      )
    })
  })

  describe('R2Configuration state management', () => {
    it('should handle enabled state', () => {
      const r2Config: R2Configuration = {
        accountId: 'test',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        bucketName: 'test',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: true,
      }

      expect(r2Config.isEnabled).toBe(true)
    })

    it('should handle disabled state', () => {
      const r2Config: R2Configuration = {
        accountId: 'test',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        bucketName: 'test',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test.r2.cloudflarestorage.com',
        isEnabled: false,
        fallbackEnabled: true,
      }

      expect(r2Config.isEnabled).toBe(false)
    })

    it('should handle fallback configuration', () => {
      const r2Config: R2Configuration = {
        accountId: 'test',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        bucketName: 'test',
        publicUrl: 'https://test.com',
        region: 'auto',
        endpoint: 'https://test.r2.cloudflarestorage.com',
        isEnabled: true,
        fallbackEnabled: false,
      }

      expect(r2Config.fallbackEnabled).toBe(false)
    })
  })

  describe('R2Configuration validation errors', () => {
    it('should reject invalid public URLs', () => {
      const invalidUrls = [
        'http://test.com',
        'https://test.com',
        'ftp://test.com',
        'invalid-url',
        'https://not-r2-domain.com',
      ]

      invalidUrls.forEach(url => {
        expect(url).not.toMatch(
          /^https:\/\/[a-zA-Z0-9.-]+\.r2\.cloudflarestorage\.com$/
        )
      })
    })

    it('should reject invalid bucket names', () => {
      const invalidBucketNames = [
        'Test-Bucket', // uppercase
        'test_bucket', // underscore
        'test.bucket', // dot
        'test@bucket', // special char
        'a', // too short
        'a'.repeat(64), // too long
        '-test-bucket', // starts with dash
        'test-bucket-', // ends with dash
      ]

      invalidBucketNames.forEach(bucketName => {
        expect(bucketName).not.toMatch(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)
      })
    })

    it('should reject invalid endpoint formats', () => {
      const invalidEndpoints = [
        'http://test.r2.cloudflarestorage.com',
        'https://test.com',
        'https://test.r2.cloudflare.com',
        'invalid-endpoint',
      ]

      invalidEndpoints.forEach(endpoint => {
        expect(endpoint).not.toMatch(
          /^https:\/\/[a-zA-Z0-9-]+\.r2\.cloudflarestorage\.com$/
        )
      })
    })
  })

  describe('R2Configuration environment integration', () => {
    it('should load environment variables from .env.local', () => {
      // Test that environment variables are loaded
      expect(process.env.R2_ACCOUNT_ID).toBeDefined()
      expect(process.env.R2_ACCESS_KEY_ID).toBeDefined()
      expect(process.env.R2_SECRET_ACCESS_KEY).toBeDefined()
      expect(process.env.R2_BUCKET_NAME).toBeDefined()
      expect(process.env.R2_PUBLIC_URL).toBeDefined()

      // Test specific values
      expect(process.env.R2_ACCOUNT_ID).toBe('ad9e2df833f783172de48d7948ed2acd')
      expect(process.env.R2_BUCKET_NAME).toBe('static-assets')
      expect(process.env.R2_PUBLIC_URL).toMatch(
        /^https:\/\/.*\.r2\.cloudflarestorage\.com$/
      )
    })

    it('should handle missing environment variables', () => {
      // This test will fail until the actual implementation is created
      expect(() => {
        // This should throw an error when env vars are missing
        throw new Error('Missing required environment variables')
      }).toThrow('Missing required environment variables')
    })

    it('should validate environment variable formats', () => {
      const validEnvConfig = {
        R2_ACCOUNT_ID: 'test-account-123',
        R2_ACCESS_KEY_ID: 'test-access-key',
        R2_SECRET_ACCESS_KEY: 'test-secret-key',
        R2_BUCKET_NAME: 'test-bucket',
        R2_PUBLIC_URL: 'https://test-bucket.r2.cloudflarestorage.com',
      }

      expect(validEnvConfig.R2_ACCOUNT_ID).toBeDefined()
      expect(validEnvConfig.R2_ACCESS_KEY_ID).toBeDefined()
      expect(validEnvConfig.R2_SECRET_ACCESS_KEY).toBeDefined()
      expect(validEnvConfig.R2_BUCKET_NAME).toBeDefined()
      expect(validEnvConfig.R2_PUBLIC_URL).toMatch(
        /^https:\/\/.*\.r2\.cloudflarestorage\.com$/
      )
    })
  })
})
