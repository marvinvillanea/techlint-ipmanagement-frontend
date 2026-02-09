import { useEffect } from "react";

const Sidebar = ({ active = false }) => {
    useEffect(() => {
        if (active) {
        document.body.classList.add("aside-active");
        } else {
        document.body.classList.remove("aside-active");
        }

        // cleanup kapag unmount
        return () => document.body.classList.remove("aside-active");
    }, []);

    return null;
};

export default Sidebar;