import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// interface FormData {
//   username: string;
//   email: string;
//   password: string;
// }

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z
    .string()
    .min(1, "Email is  required")
    .email("Email format is invalid"),
});

type FormData = z.infer<typeof schema>;

const ZodForm = () => {
  const { register, handleSubmit, formState, control } = useForm<FormData>({
    defaultValues: {
      username: "Mohit",
    },
    resolver: zodResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: FormData) => {
    await new Promise((r) => setTimeout(r, 3000));
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" {...register("username")} />
        {<p className="error">{errors.username?.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {<p className="error">{errors.email?.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        {<p className="error">{errors.password?.message}</p>}
      </div>
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
      <DevTool control={control} /> {/* set up the dev tool */}
    </form>
  );
};

export default ZodForm;
