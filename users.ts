export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}


export const users: User[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "password123",
    },
    {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "securePass456",
    },
    {
        id: "3",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: "charlie789",
    },
    {
        id: "4",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        password: "wonderWoman321",
    },
    {
        id: "5",
        name: "Evan Davis",
        email: "evan.davis@example.com",
        password: "evanStrongPass",
    }
]

export const loginUser = (user: User) => {
    const existingUser = users.find(u => u.email === user.email && u.password === user.password)

    if (existingUser) {
        return "You are logged in as " + existingUser.name;
    } else {
        return users.push(user);
    }
}

export const findUser = (id: string) => {

}

export const findUserByEmailPassword = (email: string, password: string) => {

}

export const deleteUser = (id: stirng) => {

}