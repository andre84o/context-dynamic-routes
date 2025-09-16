"use client";
import React, { useState } from "react";

export default function AboutPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setError(null);
        try {
            const fd = new FormData(e.currentTarget);
            await new Promise((res) => setTimeout(res, 600));
            if (!fd.get("email") || !fd.get("message")) {
                throw new Error("Please fill in all required fields");
            }
            setStatus("success");
            e.currentTarget.reset();
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
    };

    return (
        <div className="w-full max-w-screen-md mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">
            <section className="flex flex-col gap-4 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
                <p className="text-sm text-gray-700 leading-relaxed max-w-prose mx-auto md:mx-0">
                    Foodie is a lightweight recipe explorer pulling data from TheMealDB API. You can browse categories,
                    open meals, and mark your favorites – even as a guest (we store them locally and merge when you log in).
                </p>
                <p className="text-sm text-gray-700 leading-relaxed max-w-prose mx-auto md:mx-0">
                    This page will grow with more background info, roadmap notes, and contributor credits. For now – feel free
                    to drop us a quick message below.
                </p>
            </section>

            <section aria-labelledby="contact-heading" className="flex flex-col gap-6">
                <div>
                    <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-center md:text-left">Contact Us</h2>
                    <p className="text-sm text-gray-600 max-w-prose mx-auto md:mx-0 text-center md:text-left">
                        Have feedback, found a bug, or want to suggest a feature? Send us a note.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="bg-black text-white rounded-xl p-6 sm:p-8 shadow relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
                        background: "radial-gradient(circle at 30% 20%, #ff6b60 0, transparent 60%), radial-gradient(circle at 80% 70%, #ff6b60 0, transparent 70%)"
                    }} />
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs uppercase tracking-wide text-white/80">Name (optional)</label>
                            <input id="name" name="name" type="text" autoComplete="name" className="h-10 rounded px-3 text-sm bg-white/10 border border-white/20 focus:border-white focus:outline-none placeholder:text-white/40" placeholder="Your name" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs uppercase tracking-wide text-white/80">Email *</label>
                            <input required id="email" name="email" type="email" autoComplete="email" className="h-10 rounded px-3 text-sm bg-white/10 border border-white/20 focus:border-white focus:outline-none placeholder:text-white/40" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subject" className="text-xs uppercase tracking-wide text-white/80">Subject</label>
                            <input id="subject" name="subject" type="text" className="h-10 rounded px-3 text-sm bg-white/10 border border-white/20 focus:border-white focus:outline-none placeholder:text-white/40" placeholder="Feature idea, Bug report..." />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-wide text-white/80">Message *</label>
                            <textarea required id="message" name="message" rows={5} className="rounded px-3 py-2 text-sm bg-white/10 border border-white/20 focus:border-white focus:outline-none resize-y placeholder:text-white/40" placeholder="Write your message..." />
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="text-xs text-white/60 min-h-[1.25rem]">
                                {status === "success" && <span className="text-green-400">Message sent! Thank you.</span>}
                                {status === "error" && <span className="text-red-400">{error}</span>}
                            </div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="relative inline-flex items-center justify-center px-5 h-10 rounded border border-white/40 bg-white/10 backdrop-blur text-sm font-medium tracking-wide hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_1em_0.25em_#ff6b60,0_0_2em_0.75em_rgba(230,62,51,0.25),inset_0_0_0.75em_0.25em_#ff6b60]"
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}