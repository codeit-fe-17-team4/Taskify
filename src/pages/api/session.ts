import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });

    return;
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    res.status(400).json({ message: 'Access token is required' });

    return;
  }

  // 일반 쿠키 설정 (클라이언트에서 접근 가능)
  const cookieOptions = [
    `access_token=${String(accessToken)}`,
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${String(24 * 60 * 60)}`, // 1일
    // 배포 시 Secure 옵션 추가: 'Secure'
  ].join('; ');

  res.setHeader('Set-Cookie', cookieOptions);

  res.status(200).json({ message: 'Session created successfully' });
}
