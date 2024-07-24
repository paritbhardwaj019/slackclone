import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWorkSpaceValue } from '@/hooks/use-workspace-value';

export const Step1 = () => {
  const { name, updateValues, setCurrStep } = useWorkSpaceValue();

  return (
    <>
      <Typography className="my-4">
        What is the name of your company or team ?
      </Typography>

      <Typography variant="p" className="text-neutral-300 font-light">
        This will be the name of you Slack workspace - choose something that
        your team will recognize.
      </Typography>

      <form className="mt-6">
        <fieldset>
          <Input
            placeholder="Enter your company name"
            value={name}
            onChange={(e) => updateValues({ name: e.target.value })}
          />

          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
          >
            <Typography variant="p">Next</Typography>
          </Button>
        </fieldset>
      </form>
    </>
  );
};
