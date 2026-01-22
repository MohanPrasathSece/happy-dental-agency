import PageHeader from "@/components/PageHeader";

const Privacy = () => (
    <div className="flex flex-col min-h-screen">
        <PageHeader
            title="Privacy Policy"
            subtitle="How we handle your data with care."
        />
        <div className="container-custom section-padding bg-white min-h-[50vh]">
            <div className="max-w-3xl mx-auto prose prose-navy">
                <h2>1. Information We Collect</h2>
                <p>We collect information that you provide directly to us when you register as a nurse or contact us as a dental practice.</p>
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, and to process your dental nursing placements.</p>
                {/* Simplified for placeholder */}
            </div>
        </div>
    </div>
);

export default Privacy;
