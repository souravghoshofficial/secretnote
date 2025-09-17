"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Link2,
  MessageCircle,
  Lock,
  Smartphone,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 md:py-36 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold max-w-3xl"
        >
          Send & Receive{" "}
          <span className="text-purple-600 dark:text-purple-400">Anonymous</span>{" "}
          Messages
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-gray-600 dark:text-zinc-300"
        >
          Honest feedback, secret wishes, or fun surprises — all safe, private,
          and anonymous.
        </motion.p>

        <div className="flex gap-4 mt-10">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Login
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            >
              Learn More
            </Button>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="py-20 px-6 md:px-12 bg-gray-50 text-center dark:bg-zinc-950"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How SecretNote Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Step
            icon={<UserPlus className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
            title="Create Profile"
            text="Sign up in seconds and get your unique SecretNote link."
          />
          <Step
            icon={<Link2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
            title="Share Link"
            text="Post your link anywhere — WhatsApp, Instagram, or Twitter."
          />
          <Step
            icon={<MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />}
            title="Receive Messages"
            text="Get anonymous messages instantly, safe and secure."
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-12 bg-white text-center dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Use SecretNote?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature
            icon={<Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
            title="100% Anonymous"
            text="Your identity stays hidden. Always."
          />
          <Feature
            icon={<Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
            title="Mobile Friendly"
            text="Works perfectly on all devices."
          />
          <Feature
            icon={<Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
            title="Fast & Secure"
            text="Messages delivered instantly with encryption."
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-zinc-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Secret Journey?
        </h2>
        <Link href="/login">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Create Your Profile Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 text-center text-sm text-gray-600 border-t border-gray-200 dark:bg-black dark:text-zinc-500 dark:border-zinc-800">
        <p>© {new Date().getFullYear()} SecretNote. All rights reserved.</p>
        {/* <div className="mt-3 flex justify-center gap-6">
          <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400">
            About
          </Link>
          <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400">
            Contact
          </Link>
        </div> */}
      </footer>
    </div>
  );
}

function Step({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center text-center bg-white border border-gray-200 p-6 rounded-2xl shadow-md dark:bg-zinc-900 dark:border-zinc-800"
    >
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-zinc-400">{text}</p>
    </motion.div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center text-center bg-white border border-gray-200 p-6 rounded-2xl shadow-md dark:bg-zinc-900 dark:border-zinc-800"
    >
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-zinc-400">{text}</p>
    </motion.div>
  );
}
