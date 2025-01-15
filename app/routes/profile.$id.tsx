import { Form, redirect, useLoaderData } from "@remix-run/react";
import { deleteUser, findUser, User } from "users"

export const loader = ({ params }: { params: { id: string } }) => {
    const user = findUser(params.id);

    if (!user) {
        return redirect("/");
    }
    return new Response(JSON.stringify(user), { headers: { "Content-Type": "application/json" } });
}

export const action = async ({ params, request }: { params: { id: string }, request: Request }) => {
    const formData = await request.formData();
    const actionType = formData.get("action")
    if (actionType === "logout") {
        return redirect("/")
    }
    if (actionType === "delete") {
        deleteUser(params.id)
        return redirect("/")
    }
}

const Profile = () => {
    const user = useLoaderData<User>()
    const handleClientSideActionLogout = (action: string) => {
        if (action === "logout" || action === "delete") {
            localStorage.removeItem("loggedUser");
        }
    }


    return (
        <div>
            <div>
                <h1>User Profile</h1>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
            </div>
            <Form method="POST" onSubmit={() => handleClientSideActionLogout("logout")}>
                <input type="hidden" name="action" value="logout" />
                <button type="submit">Logout</button>
            </Form>
            <Form method="POST" onSubmit={() => handleClientSideActionLogout("delete")}>
                <input type="hidden" name="action" value="delete" />
                <button type="submit">Delete Account</button>
            </Form>
        </div>
    )
}

export default Profile;