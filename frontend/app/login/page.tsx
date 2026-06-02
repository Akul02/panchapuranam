import Login from "../../components/features/auth/Login";
import Navbar from "../../components/layout/Navbar";

const login = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <Login />
        </div>
    );
};

export default login;
