import { aiClient } from '../../api/client';

interface HealthBase {
  status: string;
}

export const getHealth = async () => {
  const response = await aiClient.get('health');

  return response.data;
};
