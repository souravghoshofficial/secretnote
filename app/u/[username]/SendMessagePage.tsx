"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/loader";

// Validation schema
const FormSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(150, { message: "Message must not be longer than 150 characters." }),
});

export default function SendMessagePage({ username }: { username: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: "" },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    try {
      const res = await axios.post("/api/messages", {
        username,
        content: data.message,
      });

      toast.success("Message sent successfully");
      form.reset();
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        // err is typed as AxiosError
        toast.error(
          err.response?.data?.error ||
            "Failed to send message. Please try again."
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Watch the message field value
  const messageValue = form.watch("message");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between py-16 px-2">
      <div className="w-[95%] max-w-3xl mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold w-full text-left">
          Send Anonymous Message
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message..."
                      className="resize-none h-24 mt-1"
                      disabled={submitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={submitting || !messageValue?.trim()}
              >
                {submitting ? (
                  <>
                    <Loader />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center">
          Want to get your own anonymous message link?
        </p>

        <Link href="/login" className="mt-4 mx-auto">
          <Button className="cursor-pointer">Create Your Profile</Button>
        </Link>
      </div>
    </div>
  );
}
