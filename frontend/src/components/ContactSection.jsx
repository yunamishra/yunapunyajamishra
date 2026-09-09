import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Send, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const COFFEE_OPTIONS = [
  { id: "dark_roast", label: "Dark Roast", price: 1 },
  { id: "espresso", label: "Espresso", price: 3 },
  { id: "matcha", label: "Matcha", price: 5 },
];

const inputClasses =
  "w-full rounded-xl border border-[#E5E1DA] bg-white px-4 py-3 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#F5DCD7] focus:ring-4 focus:ring-[#FBEBE8] hover:border-[#D9CFDD]";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [coffee, setCoffee] = useState("dark_roast");
  const [coffeeMsg, setCoffeeMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selected = COFFEE_OPTIONS.find((c) => c.id === coffee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      toast.success(`Thanks ${form.name || "friend"} — your message was emailed!`);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send email. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoffee = () => {
    const username = "yunapunyajamishra";
    const amount = selected.price;
    const note = encodeURIComponent(coffeeMsg);
    
    const paymentUrl = `https://buymeacoffee.com/${username}?amount=${amount}&note=${note}`;
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
    
    toast.success(`Redirecting to Buy Me a Coffee for a ${selected.label} ($${selected.price}) — thank you!`, {
      icon: <Heart className="h-4 w-4 text-pink-500" />,
    });
    setCoffeeMsg("");
  };

  return (
    <div data-testid="contact-section">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#6B7280]">03 · Contact</span>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1F2937]" data-testid="contact-heading">
        Let's Connect
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4B5563]">
        Whether it’s exploring AI risk and governance frameworks, strategizing complex client integrations, or simply discussing where technology is heading next — my inbox is always open.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              Name
            </label>
            <input
              id="contact-name"
              data-testid="contact-name-input"
              className={inputClasses}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              data-testid="contact-email-input"
              className={inputClasses}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              data-testid="contact-message-input"
              className={`${inputClasses} resize-none`}
              placeholder="Tell me about your project or ideas..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            data-testid="contact-submit-btn"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-6 py-3.5 text-sm font-medium text-[#FDFBF7] shadow-[0_12px_30px_rgba(31,41,55,0.25)] transition-colors duration-300 hover:bg-[#374151] disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>

        <motion.div
          whileHover={{ y: -4 }}
          className="flex flex-col rounded-2xl border border-[#F5DCD7] bg-[#FBEBE8] p-8 shadow-[0_16px_40px_rgba(245,220,215,0.5)]"
          data-testid="coffee-card"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Coffee className="h-5 w-5 text-[#1F2937]" />
          </span>
          <h3 className="mt-5 font-serif text-2xl font-medium text-[#1F2937]">Buy Me a Coffee</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
            Enjoying my work? Fuel the next late-night model training session &amp; my coffee obsession ☕
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {COFFEE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCoffee(opt.id)}
                data-testid={`coffee-option-${opt.id}`}
                className={`rounded-xl border px-2 py-3 text-center transition-all duration-200 ${
                  coffee === opt.id
                    ? "border-[#1F2937] bg-white shadow-md"
                    : "border-[#E5E1DA] bg-white/50 hover:bg-white"
                }`}
              >
                <span className="block text-sm font-medium text-[#1F2937]">{opt.label}</span>
                <span className="block text-xs text-[#6B7280]">${opt.price}</span>
              </button>
            ))}
          </div>

          <input
            className={`${inputClasses} mt-4`}
            placeholder="Add a note (optional)"
            value={coffeeMsg}
            onChange={(e) => setCoffeeMsg(e.target.value)}
            data-testid="coffee-message-input"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCoffee}
            type="button"
            data-testid="coffee-send-btn"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-6 py-3.5 text-sm font-medium text-[#FDFBF7] transition-colors duration-300 hover:bg-[#374151]"
          >
            <Heart className="h-4 w-4" />
            Send a {selected.label} · ${selected.price}
          </motion.button>
        </motion.div>
      </div>

      <footer className="mt-14 border-t border-[#E5E1DA] pt-6 text-center" data-testid="footer">
        <p className="text-xs text-[#6B7280]">
          Designed &amp; built by Yuna Punyaja · Crafted with pixels &amp; pastels
        </p>
      </footer>
    </div>
  );
}