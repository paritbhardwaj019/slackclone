'use client';

import { cn } from '@/lib/utils';
import { Channel } from '@/types/app';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTheme } from 'next-themes';
import { FiPlus } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Menubar } from './menu-bar';

export const TextEditor = ({
  currentChannelData,
}: {
  currentChannelData: Channel;
}) => {
  const { resolvedTheme } = useTheme();

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: `Message #${currentChannelData.name ?? 'userName'}`,
      }),

      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'prose px-2',
          resolvedTheme === 'dark' ? 'text-white' : 'text-black',
        ),
      },
    },
  });

  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md overflow-hidden relative  w-full">
      <div className="sticky top-0 z-10">
        {editor && <Menubar editor={editor} />}
      </div>
      <div className="mt-12 flex w-full flex-1 h-[100px] leading-[1.15px]">
        <EditorContent
          editor={editor}
          className="prose h-full overflow-y-auto"
        />
      </div>
      <div className="absolute top-2.5 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full size-7">
        <FiPlus size={22} className="dark:text-black" />
      </div>

      <div className="absolute bottom-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white flex items-center justify-center rounded-full size-7">
        <RiSendPlaneFill size={22} className="dark:text-black " />
      </div>
    </div>
  );
};
