export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1
        style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        UoScholar
      </h1>
      <p
        style={{
          fontSize: '1.125rem',
          color: '#4b5563',
          marginBottom: '1.5rem',
        }}
      >
        서울시립대 학생을 위한 학습 커뮤니티
      </p>
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
        }}
      >
        <p style={{ color: '#6b7280' }}>
          ✅ Next.js 15 App Router 설정 완료
          <br />
          ✅ Emotion 설치 완료
          <br />
          ✅ TypeScript 설정 완료
          <br />✅ Turbopack 활성화
        </p>
        <p
          style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}
        >
          Emotion을 사용하려면 컴포넌트에 'use client' 디렉티브를 추가하세요.
        </p>
      </div>
    </div>
  );
}
