type EventDefinition = any;

declare global {
  interface Window {
    __ENTER_ANALYTICS_DEFINITIONS__?: EventDefinition[];
  }
}

function loadEventDefinitions(): EventDefinition[] {
  if (typeof window !== "undefined" && Array.isArray(window.__ENTER_ANALYTICS_DEFINITIONS__)) {
    return window.__ENTER_ANALYTICS_DEFINITIONS__;
  }

  return [];
}

export function bootstrapGeneratedSiteAnalytics(): void {
  const definitions = loadEventDefinitions();

  if (definitions.length > 0) {
    console.log("Analytics initialized:", definitions);
  }
}