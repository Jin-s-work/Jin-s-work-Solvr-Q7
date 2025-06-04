# 풀스택 서비스 보일러 플레이트

## 프로젝트 개요

이 보일러 플레이트는 풀스택 웹 애플리케이션 개발을 위한 기본 구조를 제공합니다. monorepo 구조로 클라이언트와 서버를 효율적으로 관리하며, 현대적인 웹 개발 기술 스택을 활용합니다.

## 기술 스택

### 공통

- 패키지 매니저: pnpm (workspace 기능 활용)
- 언어: TypeScript
- Node.js 버전: 22.x
- 테스트: Vitest
- 코드 품질: Prettier

### 클라이언트

- 프레임워크: React
- 빌드 도구: Vite
- 라우팅: React Router
- 스타일링: TailwindCSS

### 서버

- 프레임워크: Fastify
- 데이터베이스: SQLite with DirzzleORM

## 설치 및 실행

### 초기 설치

```bash
# 프로젝트 루트 디렉토리에서 실행
pnpm install
```

### 개발 서버 실행

```bash
# 클라이언트 및 서버 동시 실행
pnpm dev

# 클라이언트만 실행
pnpm dev:client

# 서버만 실행
pnpm dev:server
```

### 테스트 실행

```bash
# 클라이언트 테스트
pnpm test:client

# 서버 테스트
pnpm test:server

# 모든 테스트 실행
pnpm test
```

### 빌드

```bash
# 클라이언트 및 서버 빌드
pnpm build
```

## 환경 변수 설정

- 클라이언트: `client/.env` 파일에 설정 (예시는 `client/.env.example` 참조)
- 서버: `server/.env` 파일에 설정 (예시는 `server/.env.example` 참조)

## API 엔드포인트

서버는 다음과 같은 기본 API 엔드포인트를 제공합니다:

- `GET /api/health`: 서버 상태 확인
- `GET /api/users`: 유저 목록 조회
- `GET /api/users/:id`: 특정 유저 조회
- `POST /api/users`: 새 유저 추가
- `PUT /api/users/:id`: 유저 정보 수정
- `DELETE /api/users/:id`: 유저 삭제


## 📊 Dashboard: Release Stats Visualization

`/client/src/pages/Dashboard.tsx`에는 GitHub 릴리즈 데이터를 기반으로 한 대시보드가 구현되어 있습니다.

### 기능
- `release_stats.csv` 파일을 기반으로 날짜별 릴리즈 수를 시각화
- 리포지토리(repo)별 릴리즈 트렌드 분석 가능
- LineChart 기반 시각화 (Recharts 활용)
- 추후 BarChart, PieChart 등 다양한 시각화 컴포넌트로 확장 가능

### 경로
- `/dashboard` 경로로 접근하여 확인할 수 있습니다.

### 사용 기술
- TypeScript
- React
- Recharts
- Vite

### 클라이언트와 서버 코드 분리 및 대시보드 연동 완료

- 서버는 `release_stats.csv`를 메모리에 로드하여 API(`/api/stats`)를 통해 클라이언트에 제공
- 클라이언트는 API 데이터를 수신해 라인 차트로 시각화
- Vite 프록시 설정을 통해 포트 간 API 연동 처리 완료