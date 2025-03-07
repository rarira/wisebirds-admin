import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userEditFormSchema } from "@/lib/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RequiredDot from "@/components/custom/required-dot";
import FormActionButtons from "../action-buttons";

type UserEditFormProps = {
  onClose: () => void;
  username: string;
};

function UserEditForm({ onClose, username }: UserEditFormProps) {
  const form = useForm<z.infer<typeof userEditFormSchema>>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: {
      username: username,
    },
  });

  const onSubmit = (values: z.infer<typeof userEditFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md relative w-fit">
                이름
                <RequiredDot />
              </FormLabel>
              <FormControl>
                <Input {...field} className="w-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full h-[1px] bg-gray-200" />
        <FormActionButtons onCancel={onClose} submitText="저장" />
      </form>
    </Form>
  );
}

export default UserEditForm;
