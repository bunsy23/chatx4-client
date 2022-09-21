type MessageAvatarTypes = {
  color: string;
};

export const MessageAvatar = ({ color }: MessageAvatarTypes) => {
  return <span className={`h-10 w-10 self-start rounded-full ${color}`} />;
};
