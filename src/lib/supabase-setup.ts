/**
 * Supabase setup and initialization utilities
 * Handles database connection, setup, and configuration
 */

import { supabase, supabaseAdmin } from './supabase';
import { supabaseMigrationsService } from './supabase-migrations';
import { supabaseRealtimeService } from './supabase-realtime';

export interface SetupResult {
  success: boolean;
  message: string;
  details?: any;
  errors?: string[];
}

export class SupabaseSetupService {
  private static instance: SupabaseSetupService;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): SupabaseSetupService {
    if (!SupabaseSetupService.instance) {
      SupabaseSetupService.instance = new SupabaseSetupService();
    }
    return SupabaseSetupService.instance;
  }

  /**
   * Initialize Supabase connection and setup
   */
  public async initialize(): Promise<SetupResult> {
    try {
      console.log('Initializing Supabase setup...');

      // Test basic connection
      const connectionTest = await this.testConnection();
      if (!connectionTest.success) {
        return connectionTest;
      }

      // Run migrations
      const migrationResult = await supabaseMigrationsService.runMigrations();
      if (!migrationResult.success) {
        return migrationResult;
      }

      // Validate schema
      const validationResult = await supabaseMigrationsService.validateSchema();
      if (!validationResult.success) {
        return validationResult;
      }

      // Setup real-time monitoring
      supabaseRealtimeService.setupMonitoring();

      this.isInitialized = true;
      console.log('Supabase setup completed successfully');

      return {
        success: true,
        message: 'Supabase setup completed successfully',
        details: {
          initialized: true,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Supabase setup error:', error);
      return {
        success: false,
        message: 'Supabase setup failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Test Supabase connection
   */
  public async testConnection(): Promise<SetupResult> {
    try {
      console.log('Testing Supabase connection...');

      // Test client connection
      const { data: clientData, error: clientError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .limit(1);

      if (clientError) {
        throw new Error(`Client connection failed: ${clientError.message}`);
      }

      // Test admin connection
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('information_schema.tables')
        .select('table_name')
        .limit(1);

      if (adminError) {
        throw new Error(`Admin connection failed: ${adminError.message}`);
      }

      console.log('Supabase connection test successful');
      return {
        success: true,
        message: 'Supabase connection test successful',
        details: {
          clientConnected: true,
          adminConnected: true,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Connection test error:', error);
      return {
        success: false,
        message: 'Supabase connection test failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Get setup status
   */
  public async getSetupStatus(): Promise<{
    initialized: boolean;
    connection: boolean;
    database: any;
    realtime: any;
  }> {
    try {
      const connectionTest = await this.testConnection();
      const databaseStatus = await supabaseMigrationsService.getDatabaseStatus();
      const realtimeStatus = supabaseRealtimeService.getSubscriptionStatus();

      return {
        initialized: this.isInitialized,
        connection: connectionTest.success,
        database: databaseStatus,
        realtime: realtimeStatus
      };
    } catch (error) {
      console.error('Setup status check error:', error);
      return {
        initialized: false,
        connection: false,
        database: null,
        realtime: null
      };
    }
  }

  /**
   * Setup environment variables validation
   */
  public validateEnvironmentVariables(): SetupResult {
    try {
      console.log('Validating environment variables...');

      const requiredVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY'
      ];

      const missingVars: string[] = [];
      const invalidVars: string[] = [];

      for (const varName of requiredVars) {
        const value = process.env[varName];
        if (!value) {
          missingVars.push(varName);
        } else if (value === 'your_supabase_url' || value === 'your_supabase_anon_key' || value === 'your_service_role_key') {
          invalidVars.push(varName);
        }
      }

      if (missingVars.length > 0) {
        return {
          success: false,
          message: 'Missing required environment variables',
          errors: missingVars.map(varName => `${varName} is required`)
        };
      }

      if (invalidVars.length > 0) {
        return {
          success: false,
          message: 'Invalid environment variables detected',
          errors: invalidVars.map(varName => `${varName} contains placeholder value`)
        };
      }

      console.log('Environment variables validation successful');
      return {
        success: true,
        message: 'Environment variables validation successful'
      };
    } catch (error) {
      console.error('Environment variables validation error:', error);
      return {
        success: false,
        message: 'Environment variables validation failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Setup database tables and data
   */
  public async setupDatabase(): Promise<SetupResult> {
    try {
      console.log('Setting up database...');

      // Run migrations
      const migrationResult = await supabaseMigrationsService.runMigrations();
      if (!migrationResult.success) {
        return migrationResult;
      }

      // Validate schema
      const validationResult = await supabaseMigrationsService.validateSchema();
      if (!validationResult.success) {
        return validationResult;
      }

      console.log('Database setup completed');
      return {
        success: true,
        message: 'Database setup completed'
      };
    } catch (error) {
      console.error('Database setup error:', error);
      return {
        success: false,
        message: 'Database setup failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Setup real-time subscriptions
   */
  public async setupRealtime(): Promise<SetupResult> {
    try {
      console.log('Setting up real-time subscriptions...');

      // Test real-time connection
      const connectionTest = await supabaseRealtimeService.testConnection();
      if (!connectionTest) {
        return {
          success: false,
          message: 'Real-time connection test failed'
        };
      }

      // Setup monitoring
      supabaseRealtimeService.setupMonitoring();

      console.log('Real-time setup completed');
      return {
        success: true,
        message: 'Real-time setup completed'
      };
    } catch (error) {
      console.error('Real-time setup error:', error);
      return {
        success: false,
        message: 'Real-time setup failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Complete setup process
   */
  public async completeSetup(): Promise<SetupResult> {
    try {
      console.log('Starting complete Supabase setup...');

      // Validate environment variables
      const envValidation = this.validateEnvironmentVariables();
      if (!envValidation.success) {
        return envValidation;
      }

      // Test connection
      const connectionTest = await this.testConnection();
      if (!connectionTest.success) {
        return connectionTest;
      }

      // Setup database
      const databaseSetup = await this.setupDatabase();
      if (!databaseSetup.success) {
        return databaseSetup;
      }

      // Setup real-time
      const realtimeSetup = await this.setupRealtime();
      if (!realtimeSetup.success) {
        return realtimeSetup;
      }

      this.isInitialized = true;
      console.log('Complete Supabase setup finished successfully');

      return {
        success: true,
        message: 'Complete Supabase setup finished successfully',
        details: {
          environment: envValidation.success,
          connection: connectionTest.success,
          database: databaseSetup.success,
          realtime: realtimeSetup.success,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Complete setup error:', error);
      return {
        success: false,
        message: 'Complete setup failed',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  /**
   * Get initialization status
   */
  public isSetupComplete(): boolean {
    return this.isInitialized;
  }

  /**
   * Reset setup status
   */
  public resetSetup(): void {
    this.isInitialized = false;
    console.log('Setup status reset');
  }
}

// Export singleton instance
export const supabaseSetupService = SupabaseSetupService.getInstance();
