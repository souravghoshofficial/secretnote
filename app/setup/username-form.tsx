"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(15, "Username must not exceed 15 characters")
  .regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers allowed");

export default function UsernameForm({ email }: { email: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      setAvailable(null);
      setError("");
      return;
    }

    const result = usernameSchema.safeParse(username);
    if (!result.success) {
      setAvailable(false);
      setError(result.error.issues[0].message);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/check-username`, {
          params: { username },
        });
        setAvailable(res.data.available);
        setError(res.data.available ? "" : "Username already taken");
      } catch {
        setError("Error checking username");
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = usernameSchema.safeParse(username);
    if (!result.success || !available) {
      setError(result.success ? "Username unavailable" : result.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("/api/setup", { email, username });
      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[90%] max-w-sm">
        <CardHeader>
          <CardTitle>Set your username</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            This will be your unique identity on SecretNote.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Enter a username"
              value={username}
              aria-invalid={!!error}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              required
            />

            {/* Status */}
            {available && !error && (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <CircleCheck size={16} />
                Username is available
              </p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={!available || submitting}
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {submitting && <Loader />}
            {submitting ? "Saving..." : "Save & Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
