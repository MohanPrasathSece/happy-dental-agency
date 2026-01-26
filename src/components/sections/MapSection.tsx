import React from 'react';

const MapSection = () => {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block bg-white text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft border border-border">
                        Our Reach
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                        Full UK Coverage
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Located at Capital Office, 124 City Road, London, EC1V 2NX - providing exceptional dental staff across the entire United Kingdom.
                    </p>
                </div>

                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-large border border-border relative z-10 bg-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.2287515537!2d-0.08896492346!3d51.52742197181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca5c4c3b28f%3A0x4b1c4c9c4c3b28f!2s124%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2s!4v1652876365421!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Happy Dental Agency Office - Capital Office, 124 City Road, London"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
