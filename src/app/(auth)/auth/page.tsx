import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

export default function () {
  return (
    <main className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography variant="h2">Slack</Typography>
        </div>

        <Typography variant="h2" className="mb-3">
          Sign in to your Slack
        </Typography>

        <Typography variant="p" className="opacity-90 mb-7">
          We suggest using the email address that you use at work
        </Typography>

        <div className="flex flex-col space-y-4">
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <FcGoogle size={30} />
            <Typography className="text-xl" variant="p">
              Sign in with Google
            </Typography>
          </Button>
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <RxGithubLogo size={30} />
            <Typography className="text-xl" variant="p">
              Sign in with Github
            </Typography>
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography variant="p">OR</Typography>
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>
        </div>
      </div>
    </main>
  );
}
