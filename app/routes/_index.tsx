import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { addUser, findUserByEmailPassword, User, } from "users";
import { v4 as uuidV4 } from "uuid";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type ActionData = {
  error?: string;
  user?: User
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return Response.json({ error: "Email and password are required" }, { status: 400 });
  }

  const newUer = {
    id: uuidV4(),
    name,
    email,
    password
  }

  const existingUser = findUserByEmailPassword(email, password);
  const user = existingUser || newUer;

  if (!existingUser) {
    return addUser(user);
  }

  return Response.json({ user }, { status: 200 });
}

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      const user = JSON.parse(storedUser)
      location.pathname = `/profile/${user?.id}`
    }
    if (actionData?.user) {
      localStorage.setItem("loggedUser", JSON.stringify(actionData.user));
      navigate(`/profile/${actionData?.user?.id}`)
    }


  }, [actionData, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="text-blue-700 dark:text-blue-700 font-bold">Remix</span>
          </h1>
        </header>
        {/* Login Form */}
        <div className="min-w-[400px] space-y-4 bg-gray-50 rounded-2xl border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700 ">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">User Login Form</h3>
          <Form method="POST" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="block w-full px-3 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="block w-full px-3 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="block w-full px-3 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out" />
            </div>
            <button type="submit" className="flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 px-3 py-2 dark:bg-gray-800 dark:border-gray-700">Login</button>
          </Form>
        </div>

      </div>
    </div>
  );
}

