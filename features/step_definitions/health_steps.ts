import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from '../support/hooks';

let responseStatus: number;
let responseBody: any;

Given('the Astro application server is running', async function (this: CustomWorld) {
  // Use explicit IPv4 loopback (127.0.0.1) instead of localhost
  const response = await this.page.goto('http://127.0.0.1:4321/');
  expect(response?.status()).toBeLessThan(400);
});

When('a health monitoring system requests {string}', async function (this: CustomWorld, endpoint: string) {
  const response = await this.page.request.get(`http://127.0.0.1:4321${endpoint}`);
  responseStatus = response.status();
  responseBody = await response.json();
});

Then('the response HTTP status code should be {int}', function (statusCode: number) {
  expect(responseStatus).toBe(statusCode);
});

Then('the response body should contain status {string}', function (expectedStatus: string) {
  expect(responseBody.status).toBe(expectedStatus);
});