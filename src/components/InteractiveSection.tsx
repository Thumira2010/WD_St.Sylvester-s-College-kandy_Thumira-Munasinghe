import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InteractiveSection = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([
    { text: "Hello! I'm an AI assistant. Ask me anything about artificial intelligence!", sender: "ai" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const aiResponses = [
    "That's a great question! AI is constantly evolving and learning new things every day.",
    "Interesting perspective! AI works by processing vast amounts of data to find patterns.",
    "I'm designed to help and assist humans, not replace them. We work better together!",
    "AI can do many things, but it still requires human creativity and oversight.",
    "The future of AI is exciting, but we must develop it responsibly and ethically.",
    "AI is a tool created by humans to solve complex problems more efficiently.",
    "Machine learning allows AI to improve its performance over time without explicit programming.",
    "AI has incredible potential to benefit humanity if we use it wisely.",
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
    
    // Clear input
    setInputValue("");

    // Add AI response after a delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: "ai" }]);
    }, 1000);
  };

  return (
    <section id="interactive" className="py-20 md:py-32 px-4 relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="glow-text-cyan">Test Your </span>
            <span className="glow-text-violet">Intelligence</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Chat with an AI simulation and experience how intelligent systems communicate.
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden border-2 border-primary/20 glow-cyan">
          {/* Chat Header */}
          <div className="bg-card/50 backdrop-blur-sm border-b border-primary/20 p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Bot className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Online • Powered by AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-background/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground rounded-bl-none border border-primary/20"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-primary/20 p-4 bg-card/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-background border-primary/20 focus:border-primary transition-colors"
              />
              <Button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 italic">
          Note: This is a simulation with pre-programmed responses to demonstrate AI interaction.
        </p>
      </div>
    </section>
  );
};

export default InteractiveSection;
