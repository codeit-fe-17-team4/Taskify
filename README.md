# 🗓️ Taskify — 일정 관리 서비스

당신을 위한 새로운 일정관리, Taskify 웹과 모바일에서 팀과 함께 편리하게
사용해보세요!

🔗 배포 주소: https://taskify-liard-three.vercel.app/

<img width="800" alt="랜딩 페이지 PC" src="https://github.com/user-attachments/assets/007e689d-7a47-47ce-98af-2e349d23d6fa" />

<img width="400" alt="랜딩 페이지 Mobile" src="https://github.com/user-attachments/assets/007e689d-7a47-47ce-98af-2e349d23d6fa" />

## 📌 프로젝트 개요

Taskify는 팀 협업을 위한 칸반 보드 기반 프로젝트/일정 관리 도구입니다. 대시보드
단위 협업, 컬럼/카드(태스크) 관리, 팀원 초대, 댓글 소통을 지원하며 반응형 UI를 제공합니다.

### 주요 특징

- 대시보드 생성/수정/삭제 + 색상 테마 선택
- 칼럼/카드(태스크) CRUD, 태그/담당자/마감일/이미지 첨부
- 초대 수락/거절, 구성원/초대 내역 관리
- 댓글 작성/수정/삭제, (요구사항 기준) 무한 스크롤 지원 영역

## 👥 팀원 소개 (R&R)

| 이름   | 역할          | 주요 담당                                                                                   |
| ------ | ------------- | ------------------------------------------------------------------------------------------- |
| 이재준 | 유저 파트     | 로그인·회원가입, 계정관리, 메인 페이지/헤더, Auth API, 로그인 유지 로직                     |
| 심예진 | 대시보드 관리 | 나의 대시보드, 대시보드 수정 페이지                                                         |
| 박서현 | 대시보드      | 대시보드 상세, 할 일 모달, DnD, 할 일 카드 CRUD                                             |
| 권수형 | 공통 코드     | CSS·fetch 세팅, 공용 컴포넌트(Button/Chip/Input/Header/Sidebar), 공통 hooks, 칼럼/초대 모달 |


## ✅ 조건사항 충족 내역 (요약)

- **공통**: 지정 폰트/컬러, 반응형, 공용 컴포넌트, 이미지 영문 파일명
- **네비/사이드바**: 드롭다운(로그아웃/내 정보/내 대시보드), 사이드바
  페이지네이션, '+' 시 생성 모달
- **인증**: 로그인/회원가입 유효성 및 에러 핸들링, 로그인 성공 시 액세스 토큰
  발급
- **랜딩**: 로고/로그인/회원가입 라우팅, 로그인 상태면 첫 대시보드로 이동
- **나의 대시보드**: 내가 만든 대시보드에 👑, 내 대시보드 페이지네이션, 초대받은
  대시보드 무한 스크롤/검색/수락·거절
- **대시보드 상세**: 상단 멤버 표시, 각 컬럼 카드 개수, 관리 버튼(edit),
  초대하기/컬럼 추가/수정 모달, 카드 생성 모달 및 상세 모달
- **대시보드 생성·수정·관리**: 생성/수정/삭제, 구성원/초대내역 페이지네이션,
  초대/취소
- **카드 상세/댓글**: 댓글 CRUD, 무한 스크롤, 카드 수정/삭제
- **계정 관리**: 프로필 이미지 업로드, 닉네임 수정, 비밀번호 변경 유효성 및 에러
  처리

## 🧭 프로젝트 진행 (ToDo)

### 1주차

- 프로젝트 일정/계획 수립, 초기 역할 배분
- 협업 규칙 및 컨벤션 확정
- 프로젝트 세팅 (Next.js, Tailwind, ESLint, Prettier)
- VSCode/ESLint/Prettier 설정 공유
- 폴더 구조 확정, Tailwind 글로벌 토큰 적용
- 페이지 UI 구현: Dashboard, MyDashboard, Dashboard/Edit, MyPage, Login, Signup,
  Home
- 공용 컴포넌트 기본셋 구현 (Button/Chip/Input/Modal 등)
- 1차 기능 연결: 로그인/회원가입, 대시보드 생성/수정 등

### 2주차

- 메타태그/파비콘, 404, 로딩 상태(스켈레톤/로딩 UI), framer-motion
- Header/SideMenu 데이터 연동, 페이지네이션
- 테스트 계정으로 초대/협업 기능 테스트 (수형)
- 기능 확장
  - Dashboard: 데이터 연동, 칼럼 추가, 무한 스크롤, DnD, 댓글 수정/삭제, 카드
    CRUD, 칼럼 추가/수정 모달
  - MyDashboard: API 연동, 페이지네이션, 무한 스크롤, 대시보드 추가 모달, 초대
    수락/거절
  - Dashboard/Edit: API 연동, 구성원/초대내역 페이지네이션,
    수정/삭제/초대수락/거절
  - MyPage: 데이터 연동, 프로필/비밀번호 변경
  - Login/Signup: 입력 유효성, 로직 리팩토링

## 🧱 기술 스택

팀 규칙에 맞춘 실제 적용 스택

- **Framework**: Next.js (Page Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (디자인 토큰/유틸리티)
- **State**: 로컬 state & URL 기반 (전역 상태 라이브러리 미사용, Context 지양)
- **Data**: 공용 fetch 래퍼 사용 (credentials: 'include')
- **Code Quality**: ESLint, Prettier
- **Deploy**: Vercel

선택/확장 요소(옵션): Storybook(컴포넌트 문서화), Vitest(테스트) 

## 🔗 API & 인증

- **API**: RESTful
- **인증**: 액세스 토큰 발급 (요구사항 기반), 쿠키/로컬 전략은 팀 규칙에 맞춰
  fetch 래퍼로 일원화
- **이미지 업로드**: 프로필/카드 이미지 업로드 엔드포인트 분리 준수

### 엔드포인트 개요

- **Auth**: POST /auth/signin, POST /auth/signup, PUT /auth/password
- **Users**: GET /users/me, PUT /users/me, POST /users/me/image
- **Dashboards**: GET/POST /dashboards, PUT/DELETE /dashboards/:id
- **Columns**: POST /columns, PUT/DELETE /columns/:id
- **Cards**: POST /cards, PUT/DELETE /cards/:id
- **Comments**: POST /comments, PUT/DELETE /comments/:id



## 🗂️ 폴더 구조

```
src/
├─ components/            # 재사용 컴포넌트
│  ├─ auth/               # 인증
│  ├─ dashboard/          # 대시보드
│  ├─ home/               # 홈(랜딩)
│  ├─ layout/             # 레이아웃
│  ├─ mydashboard/        # 나의 대시보드
│  └─ ui/                 # UI 파운데이션
├─ hooks/                 # 커스텀 훅
├─ lib/                   # 유틸 & API
├─ pages/                 # Next.js Page Router
├─ styles/                # 전역/모듈 스타일
├─ stories/               #  Storybook
└─ utils/                 # 헬퍼
```

## 🧩 주요 컴포넌트

### 인증

AuthButton, EmailInput, PasswordInput, UnifiedModal

### 대시보드

DashboardColumn, ColumnTaskCard, AddColumnButton, AddTaskButton

### 모달/폼

TaskDetailModal, CreateTaskForm, EditTaskForm, CreateColumnForm,
ManageColumnForm

## 🖼️ 주요 화면 (샘플)

### 메인 페이지

서비스 소개, 로그인/회원가입 라우팅

<img width="800" alt="메인 페이지" src="https://github.com/user-attachments/assets/007e689d-7a47-47ce-98af-2e349d23d6fa" />

### 로그인 / 회원가입

유효성/에러 처리, 성공 시 리다이렉트

<img width="800" alt="로그인 페이지" src="https://github.com/user-attachments/assets/e35ec0b5-b5ea-474e-a68c-845e4921ebb0" />

<img width="800" alt="회원가입 페이지" src="https://github.com/user-attachments/assets/52214f06-8b79-4a75-9a00-0c36d0503378" />

### 나의 대시보드

내가 만든 대시보드(👑), 초대받은 대시보드(무한 스크롤/검색/수락·거절)

<img width="800" alt="나의대시보드 페이지" src="https://github.com/user-attachments/assets/f100b36f-8e53-40ce-b4c4-bb8f1cdd65a0" />

<img width="400" alt="할 일 카드 상세 모달" src="https://github.com/user-attachments/assets/cfeabd78-1a36-4e69-9242-753cdd8f13ba" />

### 대시보드 상세 / 수정

컬럼/카드, 멤버, 관리/초대, 카드 상세/댓글

<img width="800" alt="대시보드 상세 페이지" src="https://github.com/user-attachments/assets/67582632-b43e-4635-8085-053c8fea3de4" />

<img width="800" alt="대시보드 생성" src="https://github.com/user-attachments/assets/35cdbc86-ec0a-4515-83ec-9c1080766fe9" />

<img width="800" alt="대시보드 수정" src="https://github.com/user-attachments/assets/8cfca0ce-ccb9-4f5d-b675-80270e91cd5e" />

### 할 일 카드 상세 모달

<img width="400" alt="할 일 카드 상세 모달 1" src="https://github.com/user-attachments/assets/367af6ab-eb90-416e-98bd-ff05e03e77c3" />

<img width="400" alt="할 일 카드 상세 모달 2" src="https://github.com/user-attachments/assets/6e37cf4c-e2cf-412d-ad21-2298bd4f6327" />

<img width="400" alt="할 일 카드 상세 모달 3" src="https://github.com/user-attachments/assets/e8c2f1bb-af87-4128-9454-77e682b59cf7" />

### 컬럼 추가, 관리 모달

<img width="600" alt="컬럼 추가 모달" src="https://github.com/user-attachments/assets/a42bdd27-1c98-44b4-9741-6dc629253228" />

<img width="600" alt="컬럼 관리 모달" src="https://github.com/user-attachments/assets/0c39432d-87df-4dbe-a2c7-6e2ac5249222" />

### 초대하기 모달

<img width="600" alt="초대하기 모달" src="https://github.com/user-attachments/assets/f0c8ab69-66aa-440b-adc1-4b212f6634ef" />

### 마이 페이지

프로필 편집, 비밀번호 변경

<img width="800" alt="계정 관리 페이지" src="https://github.com/user-attachments/assets/b76596b9-a2ff-4c47-8f0d-944db24fa696" />

## 🚀 시작하기

```bash
# 레포지토리 클론
git clone https://github.com/codeit-team-project/taskify.git

# 패키지 설치
yarn install   # 또는 npm install

# 개발 서버
yarn dev       # 또는 npm run dev
```

### 빌드/테스트/스토리북(선택)

```bash
yarn build
yarn test
yarn storybook
```

### 환경 변수

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧭 협업 규칙 (요약)

- **브랜치**: main(배포), develop(통합), feature/<scope>-<desc>, hotfix/\*
- **머지 전략**: feature→develop = Squash & Merge / develop→main = Merge /
  hotfix→main = Merge
- **커밋 컨벤션**: type(scope): subject - #이슈번호
  - type: feat fix refactor style docs chore perf build revert
- **네이밍**: 컴포넌트(PascalCase) / 파일·폴더(kebab-case) /
  변수·함수(camelCase) / 상수(SNAKE_CASE)
- **상태관리**: 전역 라이브러리 미사용 (Context 지양) — 로컬 state/URL 활용
- **코드 원칙**: SRP, 매직넘버 상수화, 임포트 순서(외부→내부→스타일), 축약형
  금지
- **포맷팅**: 저장 시 Prettier/ESLint 자동수정, Tailwind IntelliSense

## 🧪 입력 유효성 & UX(발췌)

### 로그인/회원가입

- 이메일·비밀번호 형식 검증, 포커스 아웃 시 에러 메시지
- 비밀번호 토글(눈 아이콘), 중복 이메일 모달
- 성공 시 리다이렉트(/mydashboard) 및 토큰 발급(요구사항)

### 마이페이지

- 프로필 이미지 업로드, 닉네임 수정
- 비밀번호 변경: 일치/불일치 검증, 에러 문구, 성공 처리

### 대시보드/카드/댓글

- 모달 기반 CRUD, 무한 스크롤(요구 영역), 페이지네이션(요구 영역)

## 📚 주요 기술

- next / react / typescript / tailwindcss
- eslint / prettier
- @storybook/react, vitest
