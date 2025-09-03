import LoginForm from "@/app/components/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen w-full flex items-center blure-sm justify-center bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/food-bg.jpg')" }}
    >
      <LoginForm />
    </main>
  );
};

export default LoginPage;
