interface HealthBase {
  status: string;
}

export interface HealthyResponse extends HealthBase {
  status: 'healthy';
  timestamp: string;
}

export interface UnhealthyResponse extends HealthBase {
  status: 'unhealthy';
  error: string;
}

// chat을 위한 서버 상태에 따라 응답이 다르게 옴.
export type HealthResponse = HealthyResponse | UnhealthyResponse;
