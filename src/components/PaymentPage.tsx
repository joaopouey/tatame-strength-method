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
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'trimestral'>('mensal');
  const [customerName, setCustomerName] = useState("");
  const [customerCpf, setCustomerCpf] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'CREDIT_CARD' | 'PIX'>('CREDIT_CARD');
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixUrl, setPixUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const planOptions = [
    {
      key: 'mensal',
      title: 'Plano Mensal',
      price: 49.9,
      description: 'Acesso por 1 mês',
      priceText: 'R$ 49,90/mês',
    },
    {
      key: 'trimestral',
      title: 'Plano Trimestral',
      price: 119.9,
      description: 'Acesso por 3 meses',
      priceText: 'R$ 119,90/trimestre',
    },
  ];

  const selectedPlanObj = planOptions.find(p => p.key === selectedPlan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setPixQrCode(null);
    setPixUrl(null);
    setPaymentStatus(null);
    setPaymentError(null);

    try {
      const payload: any = {
        customer: {
          name: customerName,
          cpfCnpj: customerCpf.replace(/\D/g, ''),
          email: customerEmail,
          phone: customerPhone.replace(/\D/g, ''),
        },
        payment: {
          billingType: selectedPaymentMethod,
          value: selectedPlanObj.price,
          description: selectedPlanObj.title,
          dueDate: new Date().toISOString().slice(0, 10),
        },
      };
      if (selectedPaymentMethod === 'CREDIT_CARD') {
        payload.payment.creditCard = {
          holderName: cardName,
          number: cardNumber.replace(/\s/g, ''),
          expiryMonth: expiryDate.split('/')[0],
          expiryYear: '20' + expiryDate.split('/')[1],
          ccv: cvv,
        };
      }

      const res = await fetch("https://aaqrxikqkbfctbekgjiy.functions.supabase.co/asaas-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setPaymentError(data.error || 'Erro ao processar pagamento');
        setProcessing(false);
        return;
      }

      if (selectedPaymentMethod === 'PIX') {
        setPixQrCode(data.pixQrCode || null);
        setPixUrl(data.pixUrl || null);
        setPaymentStatus(data.status || null);
      } else {
        setPaymentStatus(data.status || null);
      }
      setProcessing(false);
      if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
        onPaymentComplete();
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Erro inesperado ao processar pagamento');
      setProcessing(false);
    }
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
          {/* Plan Selection */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Escolha seu Plano</h2>
              <div className="flex flex-col gap-4">
                {planOptions.map((plan) => (
                  <button
                    key={plan.key}
                    type="button"
                    className={`border rounded-lg p-4 text-left transition-all ${selectedPlan === plan.key ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}
                    onClick={() => setSelectedPlan(plan.key as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{plan.title}</div>
                        <div className="text-muted-foreground text-sm">{plan.description}</div>
                      </div>
                      <div className="text-xl font-bold text-primary">{plan.priceText}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 text-xs text-muted-foreground text-center">
                A renovação é automática. Cancele a qualquer momento até 3 dias antes do vencimento para não ser cobrado novamente.
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-primary" size={24} />
                <h3 className="text-lg font-semibold">Dados de Pagamento</h3>
                <Shield className="text-green-600 ml-auto" size={20} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Método de pagamento */}
                <div>
                  <Label>Método de Pagamento</Label>
                  <div className="flex gap-4 mt-2">
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CREDIT_CARD"
                        checked={selectedPaymentMethod === 'CREDIT_CARD'}
                        onChange={() => setSelectedPaymentMethod('CREDIT_CARD')}
                      />{' '}
                      Cartão de Crédito
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="PIX"
                        checked={selectedPaymentMethod === 'PIX'}
                        onChange={() => setSelectedPaymentMethod('PIX')}
                      />{' '}
                      Pix
                    </label>
                  </div>
                </div>
                {/* Campos do cliente */}
                <div>
                  <Label htmlFor="customerName">Nome Completo</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Nome completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerCpf">CPF</Label>
                  <Input
                    id="customerCpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={customerCpf}
                    onChange={(e) => setCustomerCpf(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Telefone</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="(99) 99999-9999"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">E-mail</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Campos do cartão só se for cartão de crédito */}
                {selectedPaymentMethod === 'CREDIT_CARD' && (
                  <>
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
                  </>
                )}

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
                      `Finalizar Pagamento - ${selectedPlanObj.priceText}`
                    )}
                  </Button>
                </div>
                {paymentError && (
                  <div className="mt-4 text-red-600 text-center text-sm">{paymentError}</div>
                )}
                {selectedPaymentMethod === 'PIX' && pixQrCode && (
                  <div className="mt-6 text-center">
                    <div className="mb-2 font-semibold">Escaneie o QR Code para pagar com Pix:</div>
                    <img src={`data:image/png;base64,${pixQrCode}`} alt="QR Code Pix" className="mx-auto w-48 h-48" />
                    {pixUrl && (
                      <div className="mt-2">
                        <a href={pixUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Pagar via Pix (link)</a>
                      </div>
                    )}
                    {paymentStatus && (
                      <div className="mt-2 text-xs text-muted-foreground">Status: {paymentStatus}</div>
                    )}
                  </div>
                )}
                {selectedPaymentMethod === 'CREDIT_CARD' && paymentStatus && (
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Status do pagamento: {paymentStatus}
                  </div>
                )}
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
