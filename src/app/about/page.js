"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Rocket,
  Globe,
  Award,
  Code,
  Shield,
  Sparkles,
  Building2,
  Handshake,
  Lightbulb,
  Users,
  Briefcase,
  Quote,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Fixed Counter component
const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const controls = useAnimation();
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        from: from,
        to: to,
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
        transition: { duration },
      });
    }
  }, [inView, controls, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ===== Hero Section ===== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="py-20 text-center"
      >
        <motion.div
          variants={fadeIn}
          className="container max-w-4xl px-4 mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-6">
            About Our Company
          </h1>
          <motion.p variants={fadeIn} className="text-xl text-gray-600">
            Pioneering technology solutions since 2015 with a global impact.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* ===== Our Story ===== */}
      <section
       
        className="py-16 bg-white"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-gray-600 mb-4">
              What began as a small startup in a Silicon Valley garage has
              transformed into an industry leader with offices across 3
              continents.
            </p>
            <p className="text-gray-600">
              Our growth has been fueled by relentless innovation and a
              commitment to solving real-world problems through technology.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="relative h-80 rounded-xl overflow-hidden shadow-lg"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d"
              alt="Our office"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </div>
      </section>



      {/* ===== NEW: Strategic Partnerships ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <Handshake className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold">
              Strategic <span className="text-blue-600">Partnerships</span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Collaborating with industry leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Microsoft",
              "Google",
              "AWS",
              "IBM",
              "Oracle",
              "Salesforce",
              "Intel",
              "Cisco",
            ].map((partner, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                whileHover={{ scale: 1.05 }}
                custom={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center h-24"
              >
                <div className="text-xl font-semibold text-gray-800">
                  {partner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Core Values ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            Our <span className="text-blue-600">Core Values</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Rocket className="w-8 h-8 mb-4 text-blue-600 mx-auto" />,
                title: "Innovation",
                desc: "We push boundaries to create groundbreaking solutions.",
              },
              {
                icon: <Shield className="w-8 h-8 mb-4 text-blue-600 mx-auto" />,
                title: "Integrity",
                desc: "Honesty and transparency guide everything we do.",
              },
              {
                icon: (
                  <Sparkles className="w-8 h-8 mb-4 text-blue-600 mx-auto" />
                ),
                title: "Excellence",
                desc: "We deliver the highest quality in every project.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Technology Stack ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <Code className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold">
              Our <span className="text-blue-600">Technology</span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Cutting-edge tools powering our solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "React",
              "Node.js",
              "AI/ML",
              "Blockchain",
              "Cloud",
              "IoT",
              "Python",
              "Go",
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-xl font-semibold text-blue-600">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== NEW: Client Testimonials ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <Quote className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold">
              Client <span className="text-blue-600">Testimonials</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This company transformed our digital infrastructure completely. Their team is exceptional!",
                author: "Mark Johnson",
                position: "CTO, TechCorp",
                img: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                quote:
                  "The most reliable tech partner we've worked with. Delivered beyond expectations.",
                author: "David Chen",
                position: "Director, InnovateX",
                img: "https://randomuser.me/api/portraits/men/42.jpg",
              },
              {
                quote:
                  "Their innovative approach solved challenges we thought were impossible.",
                author: "Robert Wilson",
                position: "CEO, FutureTech",
                img: "https://randomuser.me/api/portraits/men/68.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-600 italic mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.img}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== Team ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet Our <span className="text-blue-600">Leadership</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CEO",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                img: "https://randomuser.me/api/portraits/men/22.jpg",
              },
              {
                name: "James Wilson",
                role: "CFO",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              {
                name: "David Kim",
                role: "CPO",
                img: "https://randomuser.me/api/portraits/men/65.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

  

      {/* ===== CTA ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 text-center"
      >
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl">
            <div className="mb-6">
              <Lightbulb className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600">
                Join industry leaders who trust our innovative solutions.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
                Get Started Today
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
