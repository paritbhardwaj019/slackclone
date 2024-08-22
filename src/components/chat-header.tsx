import { IoMdHeadset } from 'react-icons/io';
import { Typography } from './typography';

interface Props {
  title: string;
}

export const ChatHeader = ({ title }: Props) => {
  return (
    <div className="absolute h-10 top-0 left-0 w-full">
      <div className="h-14 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography variant="h4"># {title}</Typography>
        <IoMdHeadset size={24} />
      </div>
    </div>
  );
};
