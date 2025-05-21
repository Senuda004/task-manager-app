import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form>
        <input type="text" placeholder="Username" className="w-full mb-2 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
        <Button className="w-full">Login</Button>
      </form>
    </div>
  );
}

export default Login;
