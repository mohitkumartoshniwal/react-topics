import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RHFForm = () => {
  const { register, handleSubmit, formState, control } = useForm<FormData>();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: FormData) => {
    await new Promise((r) => setTimeout(r, 3000));
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        {<p className="error">{errors.username?.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />
        {<p className="error">{errors.email?.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {<p className="error">{errors.password?.message}</p>}
      </div>
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
      <DevTool control={control} /> {/* set up the dev tool */}
    </form>
  );
};

export default RHFForm;
