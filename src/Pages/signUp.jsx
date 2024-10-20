import FormSignUp from "../Components/Fragments/FormSignUp";
import AuthLayout from "../Components/Layouts/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout type = "sign up">
      <FormSignUp />
    </AuthLayout>
  );
};

export default SignUpPage;