import { useWorkSpaceValue } from '@/hooks/use-workspace-value';
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import { ImCancelCircle } from 'react-icons/im';

export const ImageUpload = () => {
  const { imageUrl, updateImageUrl } = useWorkSpaceValue();

  return imageUrl ? (
    <>
      <div className="flex items-center justify-center h-32 w-32 relative">
        <Image
          src={imageUrl}
          className="object-cover w-full h-full rounded-md"
          width={320}
          height={320}
          alt="Workspace Image"
        />
        <ImCancelCircle
          size={30}
          className="absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110"
          onClick={() => updateImageUrl('')}
        />
      </div>
    </>
  ) : (
    <>
      <UploadDropzone
        endpoint="workSpaceImage"
        onClientUploadComplete={(res) => {
          updateImageUrl(res[0]?.url);
        }}
        onUploadError={(error) => console.log(error)}
      />
    </>
  );
};
