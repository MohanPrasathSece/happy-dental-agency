import React from 'react';

const MapSection = () => {
    return (
        <section className="section-padding bg-background">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block bg-white text-navy px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-soft border border-border">
                        Our Reach
                    </span>
                    <h2 className="text-3xl font-heading font-bold text-navy mb-4">
                        Serving London & The UK
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Based in the heart of London, providing exceptional dental staff across the entire United Kingdom.
                    </p>
                </div>

                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-large border border-border relative z-10 bg-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7281066703!2d-0.24168138927943967!3d51.5287718408761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1652876365421!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Happy Dental Agency Service Area"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
