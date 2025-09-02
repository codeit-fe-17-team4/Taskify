import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // HttpOnly 쿠키에서 access_token 확인
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  // TODO: 실제로는 accessToken을 검증하고 사용자 정보를 가져와야 함
  // 현재는 임시로 성공 응답만 반환
  res.status(200).json({
    message: 'Authenticated',
    user: {
      id: 1,
      email: 'test@example.com',
      nickname: '권수형',
    },
  });
}
