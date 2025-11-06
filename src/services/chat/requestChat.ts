import { RequestChatParams } from './chat.types';

/**
 * 스트리밍 방식 채팅 요청
 * Server-Sent Events (SSE)를 사용하여 실시간으로 AI 응답을 받음
 */
export const requestChatStream = async (
  params: RequestChatParams,
  onToken: (token: string) => void,
  onStatus: (status: string) => void,
  onDone: (turn: number, notice: any) => void,
  onError: (error: string) => void,
) => {
  try {
    const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_BASE_URL;
    if (!AI_BASE_URL) {
      throw new Error('AI_BASE_URL is not configured');
    }

    const response = await fetch(`${AI_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // 마지막 줄은 불완전할 수 있으므로 버퍼에 보관
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();

          if (!data) continue;

          try {
            const parsed = JSON.parse(data);

            switch (parsed.type) {
              case 'status':
                onStatus(parsed.content);
                break;
              case 'token':
                onToken(parsed.content);
                break;
              case 'content':
                onToken(parsed.content);
                break;
              case 'done':
                onDone(parsed.turn, parsed.notice);
                break;
              case 'error':
                onError(parsed.content);
                break;
            }
          } catch (parseError) {
            console.error('Failed to parse SSE data:', parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Chat stream error:', error);
    onError('스트리밍 연결 중 오류가 발생했습니다.');
  }
};
