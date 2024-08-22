import { cn } from '@/lib/utils';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { BsEmojiSmile } from 'react-icons/bs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export const Menubar = ({ editor }: { editor: Editor }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center flex-wrap gap-1 absolute z-10 top-0 left-0 h-10 px-1 w-full rounded-md bg-neutral-100 dark:bg-neutral-900">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('bold') ? 'bg-gray-300/10' : '',
        )}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('italic') ? 'bg-gray-300/10' : '',
        )}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('strike') ? 'bg-gray-300/10' : '',
        )}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('bulletList') ? 'bg-gray-300/10' : '',
        )}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('orderedList') ? 'bg-gray-300/10' : '',
        )}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('code') ? 'bg-gray-300/10' : '',
        )}
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          'cursor-pointer p-2 rounded-lg',
          editor.isActive('codeBlock') ? 'bg-gray-300/10' : '',
        )}
      >
        <SquareCode className="w-4 h-4" />
      </button>
      <Popover>
        <PopoverTrigger className="m-0 p-0">
          <button>
            <BsEmojiSmile size={16} className="-mb-0.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 rounded-xl">
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) =>
              editor.chain().focus().insertContent(emoji.native).run()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
