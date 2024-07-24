'use client';

import { Typography } from '@/components/typography';
import { useWorkSpaceValue } from '@/hooks/use-workspace-value';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Step1 } from '../_components/step-1';
import { Step2 } from '../_components/step-2';

export default function () {
  const { currStep, setCurrStep } = useWorkSpaceValue();

  let stepInView = null;

  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
  }

  return (
    <>
      <div className="w-screen h-screen grid place-content-center bg-neutral-800 text-white">
        <div className="p-4 max-w-xl">
          <Typography
            variant="p"
            className="text-neutral-400 flex items-center justify-between"
          >
            {currStep > 1 && (
              <FaArrowLeft
                size={14}
                onClick={() => setCurrStep(1)}
                className="cursor-pointer"
              />
            )}
            <span>Step {currStep} of 2</span>
            {currStep === 1 && (
              <FaArrowRight
                size={14}
                onClick={() => setCurrStep(2)}
                className="cursor-pointer"
              />
            )}
          </Typography>

          {stepInView}
        </div>
      </div>
    </>
  );
}
