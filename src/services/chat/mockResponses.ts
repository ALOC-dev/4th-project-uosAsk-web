import { UIChatResponse } from '@/types/chat';

// 정해진 답변 매핑
const mockResponses: Record<string, UIChatResponse> = {
  수강신청: {
    message:
      '수강신청을 하기 위해서는 수강 신청 홈페이지 sugang.uos.ac.kr에 접속해서 로그인을 한 후에 수강신청 버튼을 누르면 됩니다. 수강신청 기간은 보통 학기 시작 전 2주 정도에 진행되며, 포털사이트를 통해 신청하실 수 있습니다.',
    imageUrl: '/images/sugang-guide.png',
    suggestions: ['수강신청 일정', '수강신청 방법', '수강신청 오류 해결'],
  },
  휴학: {
    message:
      '휴학 신청은 학과 사무실에서 진행하시면 됩니다. 휴학 신청 절차와 복학 관련 정보를 확인해보세요. 휴학 신청 시 필요한 서류와 절차에 대해 안내해드리겠습니다.',
    imageUrl: '/images/leave-guide.png',
    suggestions: ['휴학 신청 절차', '복학 신청', '휴학 중 학점 관리'],
  },
  복학: {
    message:
      '복학 신청은 학기 시작 전에 미리 신청하시는 것을 권장합니다. 복학 신청 일정과 필요한 서류에 대해 안내해드리겠습니다. 복학 후 수강신청 방법도 함께 확인해보세요.',
    imageUrl: '/images/return-guide.png',
    suggestions: ['복학 신청 일정', '복학 서류', '복학 후 수강신청'],
  },
  장학금: {
    message:
      '성적 장학금, 근로 장학금, 국가 장학금 등 다양한 장학금이 있습니다. 현재 신청 가능한 장학금과 신청 방법을 확인해보세요. 장학금 신청 기간과 조건에 대해 안내해드리겠습니다.',
    imageUrl: '/images/scholarship-guide.png',
    suggestions: [
      '성적 장학금',
      '근로 장학금',
      '국가 장학금',
      '장학금 신청 방법',
    ],
  },
  비교과: {
    message:
      '비교과 프로그램은 학점과 별도로 운영되는 교육 프로그램입니다. 현재 진행 중인 비교과 프로그램과 신청 방법을 안내해드리겠습니다. 비교과 프로그램은 다양한 분야에서 운영됩니다.',
    imageUrl: '/images/extracurricular-guide.png',
    suggestions: [
      '비교과 프로그램 목록',
      '비교과 신청 방법',
      '비교과 학점 인정',
    ],
  },
};

// 키워드 기반 답변 생성
export function generateMockResponse(userMessage: string): UIChatResponse {
  const message = userMessage.toLowerCase();

  // 키워드 매칭
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (message.includes(keyword.toLowerCase())) {
      return response;
    }
  }

  // 기본 답변
  return {
    message:
      '죄송합니다. 아직 해당 질문에 대한 답변을 준비하지 못했습니다. 수강신청, 휴학/복학, 장학금, 비교과 관련 질문을 해보세요.',
    suggestions: ['수강신청', '휴학/복학', '장학금', '비교과'],
  };
}

// 답변 지연 시뮬레이션 (실제 API 호출 느낌)
export function simulateApiDelay(ms: number = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
