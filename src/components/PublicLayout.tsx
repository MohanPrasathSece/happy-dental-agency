
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import PageTracker from "./PageTracker";

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <PageTracker />
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default PublicLayout;
