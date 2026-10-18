Feature: System Health & Monitoring
  As an Operations Engineer
  I want to verify the system health check endpoint
  So that I can monitor uptime and server availability

  Scenario: Operational Health Endpoint returns healthy response
    Given the Astro application server is running
    When a health monitoring system requests "/api/health"
    Then the response HTTP status code should be 200
    And the response body should contain status "ok"