// supabase/functions/asaas-payment/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ASAAS_API_URL = "https://sandbox.asaas.com/api/v3";
const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY") || "SUA_API_KEY_AQUI";

function corsHeaders(extra: Record<string, string> = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...extra,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    // Responde ao preflight CORS
    return new Response("ok", {
      headers: corsHeaders(),
      status: 200,
    });
  }

  console.log("FUNÇÃO EDGE INICIADA");

  if (req.method !== "POST") {
    console.log("Método não permitido:", req.method);
    return new Response("Método não permitido", {
      status: 405,
      headers: corsHeaders(),
    });
  }

  try {
    const body = await req.json();
    console.log("BODY RECEBIDO:", body);

    const { customer, payment } = body;

    // 1. Criar ou buscar cliente no Asaas
    const searchRes = await fetch(
      `${ASAAS_API_URL}/customers?cpfCnpj=${customer.cpfCnpj}`,
      {
        headers: { "access_token": ASAAS_API_KEY },
      }
    );
    const searchData = await searchRes.json();
    let customerId: string;

    if (searchData?.data?.length > 0) {
      customerId = searchData.data[0].id;
      console.log("Cliente já existe no Asaas:", customerId);
    } else {
      // Criar cliente
      const createRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": ASAAS_API_KEY,
        },
        body: JSON.stringify(customer),
      });
      if (!createRes.ok) {
        const err = await createRes.text();
        console.error("Erro ao criar cliente:", err);
        return new Response(
          JSON.stringify({ error: `Erro ao criar cliente: ${err}` }),
          { status: 400, headers: corsHeaders() }
        );
      }
      const createData = await createRes.json();
      customerId = createData.id;
      console.log("Cliente criado no Asaas:", customerId);
    }

    // 2. Criar pagamento
    const paymentPayload: any = {
      ...payment,
      customer: customerId,
    };

    console.log("Enviando pagamento para o Asaas:", paymentPayload);

    const paymentRes = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY,
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentRes.json();

    if (!paymentRes.ok) {
      console.error("Erro ao criar pagamento:", paymentData);
      return new Response(JSON.stringify({ error: paymentData }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    console.log("Pagamento criado com sucesso:", paymentData);

    // Retornar dados do pagamento (inclui pixQrCode, pixUrl, status, etc)
    return new Response(JSON.stringify(paymentData), {
      headers: corsHeaders({ "Content-Type": "application/json" }),
      status: 200,
    });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : err }),
      { status: 500, headers: corsHeaders() }
    );
  }
});