import { createContext, useContext, useState, useEffect } from 'react';
import { HealthResponse, HealthyResponse } from './health.types';
import { getHealth } from './getHealth';

interface HealthContextType {
  isHealthy: boolean;
  healthData?: HealthResponse;
}

const HealthContext = createContext<HealthContextType>({
  isHealthy: true,
});

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [healthData, setHealthData] = useState<HealthResponse>();
  const [isHealthy, setIsHealthy] = useState(true);

  // 주기적으로 백그라운드 health 체크
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const fetchHealth = async () => {
      try {
        const data = await getHealth();
        setHealthData(data);
        const healthy = data.status === 'healthy';
        setIsHealthy(healthy);

        if (!healthy && !interval) {
          // status가 unhealthy인 경우 5초마다 status check
          interval = setInterval(fetchHealth, 5000);
        }

        if (healthy && interval) {
          clearInterval(interval);
          interval = null;
        }
      } catch (error) {
        setIsHealthy(false);
        if (!interval) {
          interval = setInterval(fetchHealth, 5000);
        }
      }

      fetchHealth(); // 초기 헬스 체크

      return () => {
        if (interval) clearInterval(interval);
      };
    };
  }, []);

  return (
    <HealthContext.Provider value={{ isHealthy, healthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
