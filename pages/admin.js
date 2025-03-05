// pages/admin.js
import { verifyToken } from "../lib/auth";
import cookie from "cookie";

export default function Admin({ user }) {
    if (!user || !user.isAdmin) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome, {user.username}. Here you can manage the system.</p>
            {/* Additional admin functionalities can be added here */}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token || null;

    if (!token) {
        return {
            props: { user: null },
        };
    }

    const userData = verifyToken(token);
    if (!userData) {
        return {
            props: { user: null },
        };
    }
    // Returning token data which includes username and isAdmin flag
    return {
        props: { user: userData },
    };
}
