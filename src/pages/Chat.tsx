import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ShieldAlert, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

export default function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Vi tu publicación sobre Nala. ¿Sigue perdida?',
      sender: 'other',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '2',
      text: 'Sí, todavía la estamos buscando. ¿La viste?',
      sender: 'me',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showScamWarning, setShowScamWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scamKeywords = ['depósito', 'deposito', 'dinero', 'código', 'codigo', 'transferencia', 'cuenta', 'oxxo'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const lowerText = inputText.toLowerCase();
    const hasScamKeyword = scamKeywords.some((keyword) => lowerText.includes(keyword));
    setShowScamWarning(hasScamKeyword);
  }, [inputText]);

  const handleSend = () => {
    if (!inputText.trim() || showScamWarning) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entiendo. Mantendré los ojos abiertos y te aviso si la veo.',
        sender: 'other',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="container px-4 py-4 max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-card-foreground">Chat Seguro - Usuario #{id}</h3>
            <p className="text-xs text-muted-foreground">🔒 Conversación protegida</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-2 ${
                message.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-card-foreground border border-border'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Scam Warning Banner */}
      {showScamWarning && (
        <div className="mb-4 bg-destructive/10 border-2 border-destructive rounded-xl p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-destructive mb-1">⚠️ SISTEMA ANTI-ESTAFA ACTIVADO</h4>
              <p className="text-sm text-destructive">
                <strong>No envíes dinero ni códigos.</strong> Las estafas más comunes incluyen
                solicitudes de depósitos o transferencias antes de devolver mascotas. N.A.L.A. nunca
                te pedirá hacer pagos anticipados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Escribe un mensaje..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className={showScamWarning ? 'border-destructive' : ''}
          disabled={showScamWarning}
        />
        <Button
          onClick={handleSend}
          disabled={!inputText.trim() || showScamWarning}
          size="icon"
          className="flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-3">
        🛡️ Reporta comportamiento sospechoso • Nunca compartas datos bancarios
      </p>
    </div>
  );
}
