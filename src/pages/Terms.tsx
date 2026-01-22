import PageHeader from "@/components/PageHeader";

const Terms = () => (
    <div className="flex flex-col min-h-screen">
        <PageHeader
            title="Terms of Service"
            subtitle="The rules of our relationship."
        />
        <div className="container-custom section-padding bg-white min-h-[50vh]">
            <div className="max-w-3xl mx-auto prose prose-navy">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using our services, you agree to be bound by these terms.</p>
                <h2>2. Services</h2>
                <p>Happy Dental Agency provides dental nursing recruitment and placement services across the UK.</p>
                {/* Simplified for placeholder */}
            </div>
        </div>
    </div>
);

export default Terms;
