function getSugangSeasonFromMonth() {
  const month = new Date().getMonth() + 1;
  switch (month) {
    case 1:
    case 2:
    case 3:
      return '1학기';
    case 4:
    case 5:
    case 6:
      return '여름계절';
    case 7:
    case 8:
    case 9:
      return '2학기';
    case 10:
    case 11:
    case 12:
      return '계절학기';
  }
}

function getSeasonForMonth() {
  const month = new Date().getMonth() + 1;
  if (month > 0 && month < 7) return '1학기';
  else if (month > 6 && month < 13) return '2학기';
}

const chatTemplate = [
  {
    tag: '#수강신청',
    template: `${getSugangSeasonFromMonth()} 수강신청에 대해서 알려주세요`,
  },
  {
    tag: '#휴학/복학',
    template: `${getSeasonForMonth()} 휴학 및 복학에 대한 공지사항 찾아주세요`,
  },
  {
    tag: '#장학금',
    template: `${getSeasonForMonth()} 장학금에 대한 공지사항 찾아주세요`,
  },
  {
    tag: '#비교과',
    template: `${new Date().getMonth() + 1}월 비교과에 대한 공지사항 찾아주세요`,
  },
];

export default chatTemplate;
