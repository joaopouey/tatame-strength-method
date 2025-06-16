
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, ArrowLeft, Shield, CheckCircle } from "lucide-react";

interface PaymentPageProps {
  onPaymentComplete: () => void;
  onBack: () => void;
}

export const PaymentPage = ({ onPaymentComplete, onBack }: PaymentPageProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simular processamento do pagamento
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Plan Summary */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Plano ForçaJJ</h2>
                  <p className="text-primary text-sm">Acesso Completo</p>
                </div>
              </div>
              <div className="text-center py-4 border-t border-primary/20">
                <span className="text-3xl font-bold">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-primary" size={24} />
                <h3 className="text-lg font-semibold">Dados do Cartão</h3>
                <Shield className="text-green-600 ml-auto" size={20} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="João Silva"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Validade</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full primary-button" 
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      'Finalizar Pagamento - R$ 97/mês'
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield size={16} />
                  <span>Pagamento 100% seguro</span>
                </div>
                <p>Seus dados estão protegidos com criptografia SSL</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Cancele a qualquer momento • Sem taxas de cancelamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};
