import { getUserDetails } from '@/lib/actions/user';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const currUser = async () => {
  const user = await getUserDetails();
  return {
    userId: user?.id,
  };
};

export const ourFileRouter = {
  workSpaceImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
