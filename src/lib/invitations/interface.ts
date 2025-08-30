export interface GetInvitationList {
  size?: number;
  cursorId?: number;
  title?: string;
}
export interface AcceptInvitation {
  invitationId: number;
  body: {
    inviteAccepted: boolean;
  };
}
