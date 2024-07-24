'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/image-upload';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { useWorkSpaceValue } from '@/hooks/use-workspace-value';
import { createWorkspace } from '@/lib/actions/workspace';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';

export const Step2 = () => {
  const { name, updateValues, setCurrStep, updateImageUrl, imageUrl } =
    useWorkSpaceValue();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const slug = slugify(name, {
      lower: true,
    });
    const invite_code = uuid();
    await createWorkspace({
      imageUrl,
      name,
      invite_code,
      slug,
    });

    setIsSubmitting(false);
  };

  return (
    <>
      <form>
        <Typography className="my-4">Add workspace avatar</Typography>
        <Typography className="text-white font-light" variant="p">
          This image can be changed later in your workspace settings.
        </Typography>

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />

          <div className="space-x-5">
            <Button
              onClick={() => updateImageUrl('')}
              variant="link"
              className="text-white"
              type="button"
            >
              <Typography variant="p" className="font-light">
                Skip for now
              </Typography>
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              size="sm"
              disabled={!imageUrl}
            >
              <Typography variant="p">Submit</Typography>
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
};
