import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Obrigado! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Nos vemos em breve
          </p>
        </div>

        {/* Botão WhatsApp */}
        <Link
          href="https://chat.whatsapp.com/FaSn3EatHJyGXndgeLWK0s?mode=wwt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base h-14"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            ENTRAR NO GRUPO DO WHATSAPP
          </Button>
        </Link>
      </div>
    </div>
  );
}
