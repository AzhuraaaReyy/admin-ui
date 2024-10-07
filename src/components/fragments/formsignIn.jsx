import Button from "../elements/button";
import Checkbox from "../elements/checkbox";
import LabeledInput from "../elements/labeledinput";

const FormSignIn = () => {
  return (
    <form action="">
      <LabeledInput
        label="Email address"
        type="email"
        placeholder="hello@example.com"
        name="email"
      />
      <LabeledInput
        label="Password"
        type="password"
        placeholder="*************"
        name="password"
      />
      <Checkbox label="Keep me signed in" name="status" />
      <Button variant="bg-primary w-full text-white">Login</Button>
    </form>
  );
};

export default FormSignIn;