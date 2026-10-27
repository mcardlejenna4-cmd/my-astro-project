import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The CDK app has its own dependencies and test run (cd cdk && npm test).
    exclude: ['**/node_modules/**', 'cdk/**', 'dist/**'],
  },
});