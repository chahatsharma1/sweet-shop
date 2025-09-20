import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Candy, Leaf, Sprout, Heart } from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const handleExploreClick = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="bg-background text-foreground font-sans">
            <main>
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <div className="absolute top-0 -left-1/4 w-full h-full rounded-full bg-primary/20 blur-[150px] animate-pulse-slow"></div>
                        <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 rounded-full bg-secondary/20 blur-[120px] animate-pulse-slow animation-delay-2000"></div>
                    </div>
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

                    <Motion.div
                        className="container relative z-10 px-4 py-20"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}>
                        <div className="max-w-4xl mx-auto text-center">
                            <Motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight font-serif">
                                Handcrafted Sweets,
                                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Made with Love</span>
                            </Motion.h1>
                            <Motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                                Welcome to Sweet Shop, where traditional recipes meet the finest ingredients. Discover a taste of happiness in every bite.
                            </Motion.p>
                            <Motion.div variants={fadeInUp}>
                                <Button size="lg" className="group" onClick={handleExploreClick}>
                                    Explore Our Sweets
                                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Motion.div>
                        </div>
                    </Motion.div>
                </section>

                <section className="py-24 bg-muted/40">
                    <div className="container mx-auto px-4">
                        <Motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif">Our Promise to You</h2>
                        </Motion.div>
                        <Motion.div
                            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Motion.div variants={fadeInUp} className="bg-card p-8 rounded-xl shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                                <div className="bg-primary/10 p-4 rounded-full mb-6">
                                    <Leaf className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2 font-serif">Pure Ingredients</h3>
                                <p className="text-muted-foreground leading-relaxed">We use only the finest, all-natural ingredients, with no artificial preservatives.</p>
                            </Motion.div>
                            <Motion.div variants={fadeInUp} className="bg-card p-8 rounded-xl shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                                <div className="bg-primary/10 p-4 rounded-full mb-6">
                                    <Sprout className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2 font-serif">Always Fresh</h3>
                                <p className="text-muted-foreground leading-relaxed">Our sweets are made fresh in small batches every single day to ensure perfect taste.</p>
                            </Motion.div>
                            <Motion.div variants={fadeInUp} className="bg-card p-8 rounded-xl shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                                <div className="bg-primary/10 p-4 rounded-full mb-6">
                                    <Heart className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2 font-serif">Authentic Recipes</h3>
                                <p className="text-muted-foreground leading-relaxed">We follow timeless, traditional recipes passed down through generations.</p>
                            </Motion.div>
                        </Motion.div>
                    </div>
                </section>
            </main>

            <footer className="bg-card border-t border-border py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
                        <div>
                            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                                <div className="bg-primary p-2 rounded-lg">
                                    <Candy className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <span className="text-2xl font-bold text-foreground">Sweet Shop</span>
                            </div>
                            <p className="text-muted-foreground">123 Market Road, Pune, Maharashtra, 411001</p>
                            <p className="text-muted-foreground">Phone: +91 98765 43210</p>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-6">
                            <div className="text-center md:text-right">
                                <h3 className="font-semibold text-foreground mb-2">Hours</h3>
                                <p className="text-muted-foreground">Monday - Sunday: 9:00 AM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>


                </div>
            </footer>
            <div className="bg-muted/40 border-t border-border p-4 text-center text-muted-foreground text-s">
                <p>&copy; {new Date().getFullYear()} Sweet Shop. Crafted with ❤️ in Pune, India.</p>
            </div>
        </div>
    );
};

export default HomePage;