export interface DetectedTech {
  name: string;
  category: string;
  icon: string;
  confidence: number; // 0 - 100
  evidence: string[];
  version?: string;
  description: string;
  website?: string;
}

export interface CategoryResult {
  category: string;
  label: string;
  techs: DetectedTech[];
}

export interface SecurityHeaderReport {
  header: string;
  status: 'PRESENT' | 'MISSING' | 'WEAK';
  value?: string;
  recommendation: string;
}

export interface SecurityReport {
  score: string; // A+, A, B, C, F
  cookiesCount: number;
  headers: SecurityHeaderReport[];
}

export interface PerformanceReport {
  score: number; // 0 - 100
  ttfbMs: number;
  htmlSizeBytes: number;
  totalScriptCount: number;
  totalStyleCount: number;
  totalImageCount: number;
}

export interface AIAnalysis {
  stackSummary: string;
  archetype: string;
  architecturalPros: string[];
  architecturalCons: string[];
  recommendedAlternatives: {
    useCase: string;
    stack: string;
    rationale: string;
  }[];
  developerTip: string;
}

export interface FullScanResult {
  url: string;
  normalizedUrl: string;
  domain: string;
  scannedAt: string;
  statusCode: number;
  serverHeader: string;
  categories: Record<string, CategoryResult>;
  security: SecurityReport;
  performance: PerformanceReport;
  aiAnalysis: AIAnalysis;
  rawStats: {
    htmlLength: number;
    metaTagsCount: number;
    scriptsCount: number;
    headersCount: number;
  };
}
