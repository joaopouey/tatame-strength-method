// Serviço de integração com Asaas (sandbox)
const ASAAS_API_URL = 'https://sandbox.asaas.com/api/v3';
const ASAAS_API_KEY = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjNjMTA4YWE4LTIzNjctNGNkYy04YzdkLTQ3NzQwZTA2OTY1Yzo6JGFhY2hfZGZlYWQ0ZjgtMzFjNy00NTMzLWJiNDAtZDg1OGE2ZGNiMjBi';

interface CustomerData {
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
}

interface PaymentData {
  customer: string;
  billingType: 'CREDIT_CARD' | 'PIX';
  value: number;
  description: string;
  dueDate: string;
  creditCard?: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode?: string;
    addressNumber?: string;
    phone: string;
  };
}

export async function createCustomer(data: CustomerData) {
  const res = await fetch(`${ASAAS_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar cliente no Asaas');
  return res.json();
}

export async function createPayment(data: PaymentData) {
  const res = await fetch(`${ASAAS_API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': ASAAS_API_KEY,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar pagamento no Asaas');
  return res.json();
} 