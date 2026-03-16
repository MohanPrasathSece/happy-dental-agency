import React from 'react';

interface MapSectionProps {
    variant?: 'home' | 'office';
}

const MapSection = ({ variant = 'home' }: MapSectionProps) => {
    // London Overview for Home page
    const londonMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4734000261!2d-0.241681476176346!3d51.52855824176122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2s!4v1652876365421!5m2!1sen!2s";

    // Specific Office Pin for Contact page
    const officeMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.2287515537!2d-0.08896492346!3d51.52742197181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca5c4c3b28f%3A0x4b1c4c9c4c3b28f!2s124%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2s!4v1652876365421!5m2!1sen!2s";

    const currentMapUrl = variant === 'office' ? officeMapUrl : londonMapUrl;
    const currentTitle = variant === 'office' ? "Happy Dental Agency Office - London" : "Happy Dental Agency Service Area - London";

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block bg-white text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft border border-border">
                        Coverage Area
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                        {variant === 'office' ? 'Our Location' : 'Service Areas'}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {variant === 'office'
                            ? 'Our primary office is located in the heart of London, perfectly positioned to coordinate dental staffing across the city.'
                            : 'Located at Capital Office, 124 City Road, London, EC1V 2NX, we provide comprehensive dental staffing solutions to practices across London.'
                        }
                    </p>
                </div>

                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-large border border-border relative z-10 bg-white">
                    <iframe
                        src={currentMapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={currentTitle}
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
