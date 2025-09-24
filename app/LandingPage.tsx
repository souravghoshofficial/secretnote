"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
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
    <div className="w-full h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white overflow-y-scroll hide-scrollbar ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-24 md:py-36">
        <BackgroundRippleEffect />

        <div className="relative z-10 text-center max-w-3xl">
          {/* Animated Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold">
            {"Send & Receive Anonymous Messages"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.12,
                    ease: "easeInOut",
                  }}
                  className={`mr-2 inline-block ${
                    word === "Anonymous"
                      ? "text-purple-600 dark:text-purple-400"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.2,
            }}
            className="mt-6 text-lg md:text-xl text-gray-600 dark:text-zinc-300"
          >
            Honest feedback, secret wishes, or fun surprises — all safe,
            private, and anonymous.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.6,
            }}
            className="flex gap-4 mt-10 justify-center"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              >
                Create Your Profile
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-zinc-700 cursor-pointer"
              >
                Learn More
              </Button>
            </a>
          </motion.div>
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
            icon={
              <UserPlus className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            }
            title="Create Profile"
            text="Sign up in seconds and get your unique SecretNote link."
          />
          <Step
            icon={
              <Link2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            }
            title="Share Link"
            text="Post your link anywhere — WhatsApp, Instagram, or Twitter."
          />
          <Step
            icon={
              <MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            }
            title="Receive Messages"
            text="Get anonymous messages instantly, safe and secure."
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-12 bg-white text-center dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Use SecretNote?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature
            icon={
              <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            }
            title="100% Anonymous"
            text="Your identity stays hidden. Always."
          />
          <Feature
            icon={
              <Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            }
            title="Mobile Friendly"
            text="Works perfectly on all devices."
          />
          <Feature
            icon={
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            }
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
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 cursor-pointer"
          >
            Create Your Profile Now
          </Button>
        </Link>
      </section>

      <footer className="py-8 bg-gray-50 text-center text-sm text-gray-600 border-t border-gray-200 dark:bg-black dark:text-zinc-400 dark:border-zinc-800 transition-colors">
        <p>© {new Date().getFullYear()} SecretNote. All rights reserved.</p>
        <p className="mt-2">
          Built with ❤️ by{" "}
          <a
            href="https://souravghosh.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-500"
          >
            Sourav Ghosh
          </a>
        </p>
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
