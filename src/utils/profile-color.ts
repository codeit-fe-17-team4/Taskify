/**
 * HEX 색상을 ChipProfile 컴포넌트의 color prop으로 변환하는 함수
 */
export const getProfileColor = (
  profileColor: string
): 'green' | 'blue' | 'orange' | 'yellow' | 'brown' | 'red' => {
  switch (profileColor.toLowerCase()) {
    // HEX 색상
    case '#8b5cf6': // 보라색
    case '#10b981': { // 초록색
      return 'green';
    }
    case '#f59e0b': { // 주황색
      return 'orange';
    }
    case '#ef4444': { // 빨간색
      return 'red';
    }
    case '#3b82f6': { // 파란색
      return 'blue';
    }
    case '#eab308': { // 노란색
      return 'yellow';
    }
    case '#a16207': { // 갈색
      return 'brown';
    }

    // 문자열 색상 (사용자 프로필에서 사용)
    case 'green': {
      return 'green';
    }
    case 'orange': {
      return 'orange';
    }
    case 'red': {
      return 'red';
    }
    case 'blue': {
      return 'blue';
    }
    case 'yellow': {
      return 'yellow';
    }
    case 'brown': {
      return 'brown';
    }

    default: {
      return 'green';
    }
  }
};
